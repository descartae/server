import { feedbackFields } from './utils'

export const addFacility =
  (obj, { input }, { services, services: { Auth }, models: { Facilities: { addFacility } } }, info) => {
    Auth.authorizeFor('ADMIN', 'MAINTAINER')

    const facilityFields =
      info
        .fieldNodes[0]
        .selectionSet
        .selections

    const feedbacks = feedbackFields(facilityFields, info.fragments)
    return addFacility(input, { feedbacks }, services)
  }

export const updateFacility =
  (obj, { input }, { services, services: { Auth }, models: { Facilities: { updateFacility } } }, info) => {
    // Auth.authorizeFor('ADMIN', 'MAINTAINER')

    const facilityFields =
      info
        .fieldNodes[0]
        .selectionSet
        .selections
        .find((i) => i.name.value === 'facility')
        .selectionSet
        .selections

    const feedbacks = feedbackFields(facilityFields, info.fragments)
    return updateFacility(input, { feedbacks }, services)
  }

export const disableFacility =
  (obj, { input }, { services: { Auth }, models: { Facilities: { disableFacility } } }, info) =>
    Auth.authorizeFor('ADMIN', 'MAINTAINER') || disableFacility(input)
