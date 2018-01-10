export const addFacility =
  (obj, { input }, { services: { Auth }, models: { Facilities: { addFacility } }, services }, info) =>
    Auth.authorizeFor('ADMIN', 'MAINTAINER') || addFacility(input, services)

export const updateFacility =
  (obj, { input }, { services: { Auth }, models: { Facilities: { updateFacility } } }, info) =>
    Auth.authorizeFor('ADMIN', 'MAINTAINER') || updateFacility(input, services)

export const disableFacility =
  (obj, { input }, { services: { Auth },models: { Facilities: { disableFacility } } }, info) =>
    Auth.authorizeFor('ADMIN', 'MAINTAINER') || disableFacility(input)
