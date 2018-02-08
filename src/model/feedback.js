import { ObjectId } from 'mongodb'
import { assertNotEmpty } from './validation'

export default ({ Feedbacks }) => ({
  // Root queries
  async feedback (_id) {
    return Feedbacks.findOne({ _id })
  },
  async feedbacks ({ cursor, resolved, facility }) {
    const query = {}

    if (resolved != null) {
      query.resolved = resolved
    }

    if (facility != null) {
      query.facility = facility
    }

    const pagination = {}
    let reversed = false
    if (cursor.after) {
      pagination._id = { $lt: ObjectId(cursor.after) }
    } else if (cursor.before) {
      reversed = true
      pagination._id = { $gt: ObjectId(cursor.before) }
    }

    const quantity = Math.max(Math.min(cursor.quantity, 100), 1)

    const items =
      await Feedbacks
        .find({ ...query, ...pagination })
        .sort({ _id: reversed ? 1 : -1 })
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
  async addFeedback ({ contents, center }) {
    assertNotEmpty(contents, 'contents')

    const item = {
      contents,
      center,
      resolved: false
    }

    const { ops: [feedback] } = await Feedbacks.insert(item)

    return {
      success: true,
      feedback
    }
  },
  async resolveFeedback ({ _id }) {
    const update = { resolved: true }

    const { value } =
      await Feedbacks.findOneAndUpdate({
        _id
      }, {
        $set: update
      }, {
        returnOriginal: false
      })

    return {
      success: true,
      feedback: value
    }
  }
})
