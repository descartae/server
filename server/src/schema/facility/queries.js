export const facilities =
  (obj, { filters }, { models: { Facilities: { facilities } }, services }, info) =>
    facilities(filters, services)

export const facility =
  (obj, { _id }, { models: { Facilities: { facility } } }, info) =>
    facility(_id)
