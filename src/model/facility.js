import { ObjectId } from 'mongodb'
import { assertNotEmpty, assertAny } from './validation'
import { find } from 'ramda'

export default ({ Facilities, ReverseGeocodingCache }) => ({
  // Root queries
  async facility (_id) {
    return Facilities.findOne({ _id })
  },
  async facilities ({ cursor, location, hasTypesOfWaste }, { Geolocation }) {
    const query = {
      enabled: true
    }

    if (cursor.quantity < 0) {
      cursor.quantity = 1
    }

    if (cursor.quantity > 100) {
      cursor.quantity = 100
    }

    if (cursor.after != null) {
      query._id = { $gt: ObjectId(cursor.after) }
    } else if (cursor.before) {
      query._id = { $lt: ObjectId(cursor.before) }
    }

    if (hasTypesOfWaste != null && hasTypesOfWaste.length > 0) {
      query.typesOfWaste = { $in: hasTypesOfWaste }
    }

    if (location != null && location.near != null) {
      let { latitude, longitude } = location.near

      // Reduce the precision to a ~110m area
      latitude = parseFloat(latitude.toFixed(3))
      longitude = parseFloat(longitude.toFixed(3))

      let city = await ReverseGeocodingCache.findOne({
        boundaries: {
          $geoIntersects: {
            $geometry: {
              type: "Point",
              coordinates: [ longitude, latitude ]
            }
          }
        }
      })

      let bounds = null
      if (city) {
        bounds = city.boundaries.coordinates[0]
      } else {
        // TODO next versions should support more detailed shapes
        city = await Geolocation.reverseGeocode({ latitude, longitude })

        const cityBoundaries = find(
          (r) =>
            find(t => t == 'locality')(r.types) &&
            find(t => t == 'political')(r.types)
        )(city.results)

        if (cityBoundaries) {
          const { northeast, southwest } = cityBoundaries.geometry.viewport

          bounds = [
            [northeast.lng , northeast.lat],
            [southwest.lng , northeast.lat],
            [southwest.lng , southwest.lat],
            [northeast.lng , southwest.lat],
            [northeast.lng , northeast.lat]
          ]

          await ReverseGeocodingCache.insert({
            location: cityBoundaries.formatted_address,
            boundaries: {
              type: "Polygon",
              coordinates: [ bounds ]
            }
          })
        }
      }

      if (!bounds) {
        query.location = {
          coordinates: {
            $near: {
              $geometry: {
                type: "Point" ,
                coordinates: [ longitude, latitude ]
              },
              $maxDistance: 3000
            }
          }
        }
      } else {
        query.coordinates = {
          $geoWithin: { $polygon: bounds }
        }
      }
    }

    const items =
      await Facilities
        .find(query)
        .limit(cursor.quantity)
        .toArray()

    const cursors = {
      before: items.length > 0 ? items[0]._id.toString() : null,
      after: items.length > 0 ? items[items.length - 1]._id.toString() : null
    }

    return {
      cursors,
      items
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
  async updateFacility ({ _id, patch }) {
    if ('name' in patch) {
      assertNotEmpty(patch.name, 'name')
    }

    if ('location' in patch && 'address' in patch.location) {
      assertNotEmpty(patch.location.address)
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
