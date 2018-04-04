import { ObjectId } from 'mongodb'
import { Kind } from 'graphql'

export const schema = `
  scalar Cursor

  # Represents relevant pagination data
  input FilterCursors {
    # Indicates that the results must be after a given cursor
    # Has priority over the 'before' field
    after: Cursor

    # Indicates that the results must be before a given cursor
    # The field 'after' has priority over this
    before: Cursor

    # The total quantity of items that should be retrieved
    # Must be a value between 1 and 100
    quantity: Int!
  }

  # A pair of cursors allowing navigation from this page
  type PageCursors {
    # The cursor used to get items from before this page
    after: Cursor

    # The cursor used to get items from after this page
    before: Cursor
  }
`

const btoa = (obj) => new Buffer(JSON.stringify(obj)).toString('base64')
const atob = (enc) => JSON.parse(new Buffer(enc, 'base64').toString())
// const btoa = (obj) => JSON.stringify(obj)
// const atob = (enc) => JSON.parse(enc)

export const resolvers = {
  ID: {
    __parseValue (value) {
      if (ObjectId.isValid(value)) {
        return ObjectId(value)
      }

      return null
    },
    __serialize (value) {
      return value.toString()
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING && ObjectId.isValid(ast.value)) {
        return ObjectId(ast.value)
      }

      return null
    }
  },
  Cursor: {
    __parseValue (value) {
      return atob(value)
    },
    __serialize (value) {
      return btoa(value)
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return atob(ast.value)
      }

      return null
    }
  }
}
