import { feedbackFields } from './utils'

export const facilities =
  (obj, { filters }, { models: { Facilities: { facilities } }, services }, info) => {
    const itemsFields =
      info
        .fieldNodes[0]
        .selectionSet
        .selections
        .find((i) => i.name.value === 'items')
        .selectionSet
        .selections

    const feedbacks = feedbackFields(itemsFields, info.fragments)
    return facilities({ ...filters, feedbacks }, services)
  }

export const facility =
  (obj, { _id }, { models: { Facilities: { facility } } }, info) => {
    const facilityFields =
      info
        .fieldNodes[0]
        .selectionSet
        .selections

    const feedbacks = feedbackFields(facilityFields, info.fragments)
    return facility(_id, { feedbacks })
  }
