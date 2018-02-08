import { ObjectId } from 'mongodb'
import { assertNotEmpty, assertAny } from './validation'

export default ({ Facilities, Feedbacks, ReverseGeocodingCache }) => ({
  // Root queries
  async facility (_id) {
    return Facilities.findOne({ _id })
  },
  async facilities ({ cursor, location, hasTypesOfWaste, feedbacks }, { Geolocation }) {
    const query = {
      enabled: true
    }

    if (hasTypesOfWaste != null && hasTypesOfWaste.length > 0) {
      query.typesOfWaste = { $in: hasTypesOfWaste }
    }

    const pagination = {}
    let reversed = false
    if (cursor.after) {
      pagination._id = { $gt: ObjectId(cursor.after) }
    } else if (cursor.before) {
      reversed = true
      pagination._id = { $lt: ObjectId(cursor.before) }
    }

    let aggregation
    if (location != null && location.near != null) {
      const { latitude, longitude } = location.near
      aggregation = [
        {
          $geoNear : {
            query: { ...query, ...pagination },
            near: {
              type: 'Point',
              coordinates: [ longitude, latitude ]
            },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 20000
          }
        },
        { $sort: { distance: reversed ? -1 : 1 } },
      ]
    } else {
      aggregation = [
        { $match: { ...query, ...pagination } },
        { $sort: { _id: reversed ? -1 : 1 } },
      ]
    }

    const quantity = Math.max(Math.min(cursor.quantity, 100), 1)

    const items =
      await Facilities
        .aggregate([
          ...aggregation,
          { $limit: quantity }
        ])
        .toArray()

    const cursors = {
      before: items.length > 0 ? items[0]._id.toString() : null,
      after: items.length > 0 ? items[items.length - 1]._id.toString() : null
    }

    if (items.length) {
      const first = reversed ? items[items.length - 1] : items[0]
      const last = reversed ? items[0] : items[items.length - 1]
      cursors.before = first._id.toString()
      cursors.after = last._id.toString()

      if (feedbacks.total || feedbacks.unresolved) {

        // Filter only unresolved if filter is nos asking for total
        let resolvedQuery = {}
        if (!feedbacks.total) {
          resolvedQuery = { resolved: false }
        }

        const countQuery = {}
        if (feedbacks.total) {
          countQuery.total = { $sum: 1 }
        }
        if (feedbacks.unresolved) {
          countQuery.unresolved = { $sum: { $cond: { if: '$resolved', then: 0, else: 1 } } }
        }

        const ids = items.map(i => i._id)
        const aggregation =
          await Feedbacks
            .aggregate([
              { $match: { facility: { $in: ids }, ...resolvedQuery } },
              { $group: { _id: '$facility', ...countQuery } }
            ])
            .toArray()

        const defaultobject = {}
        if (feedbacks.total) {
          defaultobject.total = 0
        }
        if (feedbacks.unresolved) {
          defaultobject.unresolved = 0
        }

        for (const item of items) {
          item.feedbacks = { ...defaultobject }
        }

        for (const counts of aggregation) {
          const item = items.find(i => i._id.equals(counts._id))
          delete counts._id
          item.feedbacks = { ...item.feedbacks, ...counts }
        }
      }
    }

    return {
      cursors,
      items: reversed ? items.reverse() : items
    }
  },
  // Operations
  async addFacility (data, { Geolocation }) {
    assertNotEmpty(data.name, 'name')
    assertNotEmpty((data.location || {}).address, 'location.address')

    assertAny(data.typesOfWaste, 'typesOfWaste')

    const { coordinates } = data.location
    if (coordinates == null || coordinates.latitude == null || coordinates.longitude == null) {
      const result = await Geolocation.geocode(data.location.address)

      data.location = {
        ...result,
        ...data.location
      }
    }

    data.location.coordinates = {
      type: 'Point',
      coordinates: [
        data.location.coordinates.longitude,
        data.location.coordinates.latitude
      ]
    }

    data = {
      ...data,
      openHours: data.openHours || [],
      typesOfWaste: data.typesOfWaste || [],
      enabled: true
    }

    const { ops: [facility] } = await Facilities.insert(data)

    return {
      success: true,
      facility
    }
  },
  async updateFacility ({ _id, patch }, { Geolocation }) {
    if ('name' in patch) {
      assertNotEmpty(patch.name, 'name')
    }

    if ('location' in patch && 'address' in patch.location) {
      assertNotEmpty(patch.location.address)

      const { coordinates } = patch.location
      if (coordinates == null || coordinates.latitude == null || coordinates.longitude == null) {
        const result = await Geolocation.geocode(patch.location.address)
        patch.location = {
          ...result,
          ...patch.location
        }
      }

      patch.location.coordinates = {
        type: 'Point',
        coordinates: [
          patch.location.coordinates.longitude,
          patch.location.coordinates.latitude
        ]
      }
    }

    if ('typesOfWaste' in patch) {
      assertAny(patch.typesOfWaste, 'typesOfWaste')
    }

    if ('openHours' in patch) {
      patch.openHours = patch.openHours || []
    }

    const { value } =
      await Facilities.findOneAndUpdate({
        _id,
        enabled: true
      }, {
        $set: patch
      }, {
        returnOriginal: false
      })

    return {
      success: true,
      facility: value
    }
  },
  async disableFacility ({ _id }) {
    await Facilities.updateOne({
      _id
    }, {
      $set: { enabled: false }
    })

    return {
      success: true
    }
  }
})
