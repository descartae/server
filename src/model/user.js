import { ObjectId } from 'mongodb'
import { assertNotEmpty, assertAny } from './validation'

export default ({ Users }) => ({
  // Root queries
  async user (_id) {
    return Users.findOne({ _id })
  },
  async userByEmail (email) {
    return Users.findOne({ email })
  },
  async users ({ hasRole, cursor }) {
    const query = {}

    if (hasRole !== undefined) {
      query.roles = { $exists: hasRole, [hasRole ? '$ne' : '$eq']: [] }
    }

    const pagination = {}
    let reversed = false
    if (cursor.after) {
      pagination._id = { $gt: ObjectId(cursor.after) }
    } else if (cursor.before) {
      reversed = true
      pagination._id = { $lt: ObjectId(cursor.before) }
    }

    const quantity = Math.max(Math.min(cursor.quantity, 100), 1)

    const items =
      await Users
        .find({ ...query, ...pagination })
        .sort({ _id: reversed ? -1 : 1 })
        .limit(quantity)
        .toArray()

    const cursors = {
      before: cursor.before,
      after: cursor.after
    }

    if (items.length) {
      const first = reversed ? items[items.length - 1] : items[0]
      const last = reversed ? items[0] : items[items.length - 1]
      cursors.before = first._id.toString()
      cursors.after = last._id.toString()
    }

    return {
      cursors,
      items
    }
  },
  // Operations
  async addUser ({ name, email, password, title, organization, municipality, roles, coordinates }, { Auth }) {
    const userCheck = await Users.findOne({ email })
    if (userCheck) {
      throw Error('DUPLICATED_EMAIL')
    }

    assertNotEmpty(name, 'name')
    assertNotEmpty(email, 'email')
    assertNotEmpty(password, 'password')
    assertNotEmpty(title, 'title')
    assertNotEmpty(organization, 'organization')
    assertNotEmpty(municipality, 'municipality')

    const item = {
      name,
      email,
      password: await Auth.hashPassword(password),
      title,
      organization,
      municipality,
      roles,
      coordinates:
        coordinates ? {
          type: 'Point',
          coordinates: [coordinates.longitude, coordinates.latitude]
        } : null
    }

    const { ops: [user] } = await Users.insert(item)
    return user
  },

  async updateUser ({ _id, patch }, { Auth }) {
    if ('name' in patch) {
      assertNotEmpty(patch.name, 'name')
    }

    if ('email' in patch) {
      assertNotEmpty(patch.email, 'email')
      const userCheck = await Users.findOne({ _id: { $ne: _id }, email: patch.email })
      if (userCheck) {
        throw Error('DUPLICATED_EMAIL')
      }
    }

    if ('password' in patch && patch.password.length > 0) {
      patch.password = await Auth.hashPassword(patch.password)
    } else {
      delete patch.password
    }

    if ('title' in patch) {
      assertNotEmpty(patch.title, 'title')
    }

    if ('organization' in patch) {
      assertNotEmpty(patch.organization, 'organization')
    }

    if ('municipality' in patch) {
      assertNotEmpty(patch.municipality, 'municipality')
    }

    if ('roles' in patch) {
      assertAny(patch.roles, 'roles')
    }

    const { value } =
      await Users.findOneAndUpdate({
        _id
      }, {
        $set: patch
      }, {
        returnOriginal: false
      })

    return value
  },

  async addWaitingUser ({ email, coordinates }) {
    const item = {
      email,
      roles: [],
      coordinates: {
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude]
      }
    }

    const userCheck = await Users.findOne({ email })
    if (userCheck) {
      throw Error('DUPLICATED_EMAIL')
    }

    const { ops: [user] } = await Users.insert(item)
    return user
  }
})
