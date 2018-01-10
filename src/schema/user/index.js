import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `

  enum Role {
    ADMIN
    MAINTAINER
    USER
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    roles: [Role]!
  }

  type AuthenticationResult {
    success: Boolean!
    error: AuthenticationFailureReason
    sessionToken: String
  }

  enum AuthenticationFailureReason {
    INVALID_CREDENTIALS
  }

  input AuthenticationData {
    email: String!
    password: String!
  }

  input AddUserData {
    name: String!
    email: String!
    password: String!
    roles: [Role]!
  }

  type AddUserResult {
    success: Boolean!
    error: AddUserFailureReason
    sessionToken: String
  }

  enum AddUserFailureReason {
    DUPLICATED_EMAIL
    INVALID_ROLES
  }

  input UserFilters {
    cursor: FilterCursors!
  }

  type UsersPage {
    cursors: PageCursors!
    items: [User]
  }
`

export const queryExtension = `
  whoami: String
  users(filters: UserFilters!): UsersPage
`

export const mutationExtension = `
  authenticate(credentials: AuthenticationData!): AuthenticationResult
  addUser(user: AddUserData!): AddUserResult
`

export const resolvers = {
  Query: queries,
  Mutation: mutations
}
