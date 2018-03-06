export const feedbackFields = (facilityFields, fragments) => {
  const feedbacks = {
    total: false,
    unresolved: false
  }

  let feedbacksField =
      facilityFields
        .find((i) => i.name.value === 'feedbacks' || i.kind === 'FragmentSpread')

  if (feedbacksField) {
    if (feedbacksField.kind === 'FragmentSpread') {
      feedbacksField =
          fragments[feedbacksField.name.value]
            .selectionSet
            .selections
            .find((i) => i.name.value === 'feedbacks')
    }

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
  }

  return feedbacks
}
