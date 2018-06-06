import * as fields from './fields'
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
    title: String!
    organization: String!
    municipality: String!
    roles: [Role]!
    coordinates: Coordinates
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
    title: String!
    organization: String!
    municipality: String!
    roles: [Role]!
    coordinates: CoordinatesInput
  }

  type AddUserResult {
    success: Boolean!
    error: AddUserFailureReason
    user: User
  }

  enum AddUserFailureReason {
    DUPLICATED_EMAIL
    INVALID_ROLES
  }

  input AddSelfUserData {
    name: String!
    email: String!
    password: String!
    title: String!
    organization: String!
    municipality: String!
  }

  type AddSelfUserResult {
    success: Boolean!
    error: AddSelfUserFailureReason
    user: User
  }

  enum AddSelfUserFailureReason {
    DUPLICATED_EMAIL
  }

  input AddWaitingUserData {
    email: String!
    coordinates: CoordinatesInput!
  }

  type AddWaitingUserResult {
    success: Boolean!
    error: AddWaitingUserFailureReason
  }

  enum AddWaitingUserFailureReason {
    DUPLICATED_EMAIL
  }

  input UpdateUserInput {
    _id: ID!
    patch: UserPatch!
  }

  input UserPatch {
    name: String
    email: String
    password: String
    title: String
    organization: String
    municipality: String
    roles: [Role]
    coordinates: CoordinatesInput
  }

  type UpdateUserPayload {
    success: Boolean!
    user: User
  }

  input UserFilters {
    hasRole: Boolean
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
  user(_id: ID!): User
`

export const mutationExtension = `
  authenticate(credentials: AuthenticationData!): AuthenticationResult!
  addUser(input: AddUserData!): AddUserResult!
  addSelfUser(input: AddSelfUserData!): AddSelfUserResult!
  addWaitingUser(input: AddWaitingUserData!): AddWaitingUserResult!
  updateUser(input: UpdateUserInput!): UpdateUserPayload!
`

export const resolvers = {
  User: fields,
  Query: queries,
  Mutation: mutations
}
