export const facilities =
  (obj, { filters }, { models: { Facilities: { facilities } }, services }, info) => {
    const feedbacks = {
      total: false,
      unresolved: false
    }

    const feedbacksField =
      info
        .fieldNodes[0]
        .selectionSet
        .selections
        .find((i) => i.name.value === 'items')
        .selectionSet
        .selections
        .find((i) => i.name.value === 'feedbacks')

    if (feedbacksField) {
      feedbacksField
        .selectionSet
        .selections
        .map((i) => {
          if (i.name.value in feedbacks) {
            feedbacks[i.name.value] = true
          }
        })
    }

    return facilities({ ...filters, feedbacks }, services)
  }

export const facility =
  (obj, { _id }, { models: { Facilities: { facility } } }, info) =>
    facility(_id)
