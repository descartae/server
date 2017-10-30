import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
type TypeOfWaste {
  _id: ID!
  name: String!
  icon: String!
}
`

export const queryExtension = `
  typesOfWaste: [TypeOfWaste]
`

export const mutationExtension = `
  addTypeOfWaste(name: String!, icon: String!): Boolean!
  updateTypeOfWaste(name: String, icon: String): Boolean!
  disableTypeOfWaste(_id: String!): Boolean!
`

export const resolvers = {
  Query: queries,
  Mutation: mutations
}