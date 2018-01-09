export const addFacility =
  (obj, { input }, { models: { Facilities: { addFacility } }, services }, info) =>
    addFacility(input, services)

export const updateFacility =
  (obj, { input }, { models: { Facilities: { updateFacility } }, services }, info) =>
    updateFacility(input, services)

export const disableFacility =
  (obj, { input }, { models: { Facilities: { disableFacility } } }, info) =>
    disableFacility(input)
