import { ObjectId } from 'mongodb'
import { assertNotEmpty } from './validation'
import { any, all } from 'ramda'

export default ({ Users }) => ({
  // Root queries
  async user (_id) {
    return Users.findOne({ _id })
  },
  async userByEmail (email) {
    return Users.findOne({ email })
  },
  async users ({ cursor }) {
    const query = {}

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

    const items =
      await Users
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
  async addUser ({ name, email, password, roles }) {
    const item = {
      name,
      email,
      password,
      roles
    }

    const userCheck = Users.findOne({ email })
    if (userCheck) {
      throw Error('DUPLICATED_EMAIL')
    }

    if (!all((r) => any(['ADMIN', 'MAINTAINER', 'USER'])(r))(roles)) {
      throw Error('INVALID_ROLES')
    }

    const { ops: [user] } = await Users.insert(item)

    return {
      success: true,
      user
    }
  }
})
