import { assertNotEmpty, assertHexColor } from './validation'
import DataLoader from 'dataloader'
import { ObjectId } from 'mongodb'

export default ({ TypesOfWaste }) => {
  const batcher =
    async (ids) => {
      const mongoIds = ids.map(id => id instanceof ObjectId ? id : ObjectId(id))
      const types = await TypesOfWaste
                            .find({
                              _id: { $in: mongoIds }
                            })
                            .toArray()

      return mongoIds.map(id => types.find(t => t._id.equals(id)) || null)
    }

  const options = {
    cacheKeyFn: (key) => key.toString()
  }

  const dataloader = new DataLoader(batcher, options)

  return {
    // Root queries
    async typeOfWaste (_id) {
      return dataloader.load(_id)
    },
    async typesOfWaste () {
      const general = await dataloader.load('000000000000000000000000')

      const types =
        await TypesOfWaste
          .find({ name: { $ne: null }, enabled: true })
          .toArray()

      return types.map((type) => ({
        ...type,
        icons: {
          ...general.icons,
          ...type.icons
        }
      }))
    },
    // Operations
    async addTypeOfWaste ({ name, description, color, icons }) {
      assertNotEmpty(name, 'name')
      assertNotEmpty(description, 'description')
      assertHexColor(color, 'color')

      assertNotEmpty(icons.iosSmallURL, 'icons.iosSmallURL')
      assertNotEmpty(icons.iosMediumURL, 'icons.iosMediumURL')
      assertNotEmpty(icons.iosLargeURL, 'icons.iosLargeURL')

      assertNotEmpty(icons.androidSmallURL, 'icons.androidSmallURL')
      assertNotEmpty(icons.androidMediumURL, 'icons.androidMediumURL')
      assertNotEmpty(icons.androidLargeURL, 'icons.androidLargeURL')

      const item = {
        name,
        description,
        color: color.replace('#', '').toUpperCase(),
        icons,
        enabled: true
      }

      const { ops: [result] } = await TypesOfWaste.insert(item)

      return {
        success: true,
        typeOfWaste: result
      }
    },
    async updateTypeOfWaste ({ _id, patch: { name, description, color, icons } }) {
      const update = {}

      if (name != null) {
        update.name = name
      }

      if (description != null) {
        update.description = description
      }

      if (color != null) {
        assertHexColor(color, 'color')
        update.color = color.replace('#', '').toUpperCase()
      }

      if (icons != null) {
        for (let field in icons) {
          update[`icons.${field}`] = icons[field]
        }
      }

      const { value } =
        await TypesOfWaste.findOneAndUpdate({
          _id,
          enabled: true
        }, {
          $set: update
        }, {
          returnOriginal: false
        })

      return {
        success: true,
        typeOfWaste: value
      }
    },
    async disableTypeOfWaste ({ _id }) {
      const update = { enabled: false }

      await TypesOfWaste.updateOne({ _id }, { $set: update })

      return {
        success: true
      }
    }
  }
}
