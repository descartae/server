import { Kind } from 'graphql'

import * as fields from './fields'
import * as mutations from './mutations'
import * as queries from './queries'

export const schema = `
  # Represents a registered recycling facility
  type Facility {
    _id: ID!

    # The name of the facility
    name: String!

    # The location data for a given facility
    location: Location!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # The types of waste the recycling facility handles
    typesOfWaste: [TypeOfWaste]!

    # The facility's operating hours
    openHours: [OpenTime]!

    # Feedback counting
    feedbacks: FeedbackCount
  }

  # Feedbacks count
  type FeedbackCount {

    # Total feedbacks for the facility
    total: Int!

    # Total unresolved feedbacks for the facility
    unresolved: Int!
  }

  # Location data for a point of interest
  type Location {
    # The readable address
    address: String!

    # The adress' municipality
    municipality: String

    # The adress' state
    state: String

    # The zip code or equivalent
    zip: String

    # Exact coordinates to the location
    coordinates: Coordinates!
  }

  # A latitude + longitude pair
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  scalar Time

  # Represents a timespan in a day of the week
  type OpenTime {
    dayOfWeek: DayOfWeek!

    # The hour representing the start of the timespan
    startTime: Time!

    # The hour representing the end of the timespan
    endTime: Time!
  }

  enum DayOfWeek {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

  # Data for the creation of a facility
  input AddFacilityInput {
    # The name of the facility
    name: String!

    # The location data of the new facility
    location: LocationInput!

    # The responsible's website, if available
    website: String

    # The responsible's contact phone number, if available
    telephone: String

    # IDs of the types of waste the recycling facility handles
    typesOfWaste: [ID]

    # The facility's operating hours
    openHours: [OpenTimeInput]
  }

  # A location for the related facility
  input LocationInput {
    # The readable, complete address
    address: String!

    # The adress' municipality
    municipality: String

    # The adress' state
    state: String

    # The zip code or equivalent
    zip: String

    # Exact coordinates to the location
    coordinates: CoordinatesInput
  }

  # A latitude + longitude pair
  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  # Represents a timespan in a day of the week
  input OpenTimeInput {
    dayOfWeek: DayOfWeek!

    # The hour representing the start of the timespan
    startTime: Time!

    # The hour representing the end of the timespan
    endTime: Time!
  }

  # The add facility operation result
  type AddFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The created entry, if any
    facility: Facility
  }

  # Required data for updating a facility
  input UpdateFacilityInput {
    # The facility identifier
    _id: ID!

    # The data to be updated
    patch: FacilityPatch!
  }

  # Represents what can be updated on a facility
  input FacilityPatch {
    # The name of the facility
    name: String

    # The location data of the facility
    location: LocationInput

    # The responsible's website
    website: String

    # The responsible's contact phone number
    telephone: String

    # IDs of the types of waste the recycling facility handles
    # Changes to this field replace the entire list
    typesOfWaste: [ID]

    # The facility's operating hours
    # Changes to this field replace the entire list
    openHours: [OpenTimeInput]
  }

  # The result of a facility update operation
  type UpdateFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!

    # The updated entry, if applicable
    facility: Facility
  }

  # The required data to disable a facility
  input DisableFacilityInput {
    _id: ID!
  }

  # The disable operation result
  type DisableFacilityPayload {
    # Indicates whether the operation was successful
    success: Boolean!
  }

  # Represents the possible filters on facilities
  input FacilityFilters {
    # The pagination data
    cursor: FilterCursors!

    # Requirements related to location
    location: LocationFilter

    # The types of wast the facility has to support
    hasTypesOfWaste: [ID]
  }

  # Filters on location data
  input LocationFilter {
    # Indicates roughly where the subject must be located
    near: CoordinatesInput
  }

  # Represents the result of the facilities query
  type FacilitiesPage {
    # Cursor information for the next possible requests
    cursors: PageCursors!

    # The items found according to the query
    items: [Facility]
  }
`
export const queryExtension = `
  # The list of available facilities
  facilities(filters: FacilityFilters!): FacilitiesPage

  # The facility with the given ID
  facility(_id: ID!): Facility
`

export const mutationExtension = `
  # Creates a new facility
  addFacility(input: AddFacilityInput!): AddFacilityPayload!

  # Updates information related to an existing facility
  updateFacility(input: UpdateFacilityInput!): UpdateFacilityPayload!

  # Disables a facility, removing it from search results
  disableFacility(input: DisableFacilityInput!): DisableFacilityPayload!
`

const pad = (n, size) => {
  let s = n.toString(10)
  while (s.length < (size || 2)) { s = '0' + s }
  return s
}

export const resolvers = {
  Time: {
    __parseValue (value) {
      const [hours, minutes] = value.split(':').map((n) => parseInt(n, 10))

      if ((!hours && hours !== 0) || hours < 0 || hours >= 24) {
        return null
      }
      if ((!minutes && minutes !== 0) || minutes < 0 || minutes >= 60) {
        return null
      }
      const total = hours + (minutes / 60)
      return total
    },
    __serialize (value) {
      const hours = Math.trunc(value)
      const minutes = Math.trunc((value - hours) * 60)
      return `${pad(hours)}:${pad(minutes)}`
    },
    __parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return this.__parseValue(ast.value)
      }

      return null
    }
  },
  Facility: fields,
  Query: queries,
  Mutation: mutations
}
