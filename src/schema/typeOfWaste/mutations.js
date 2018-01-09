

export const addTypeOfWaste =
  async (_, { input }, { services: { Auth }, models: { TypesOfWaste: { addTypeOfWaste } } }) =>
  Auth.authorizeFor('ADMIN') || addTypeOfWaste(input)

export const updateTypeOfWaste =
  async (_, { input }, { services: { Auth }, models: { TypesOfWaste: { updateTypeOfWaste } } }) =>
  Auth.authorizeFor('ADMIN') || updateTypeOfWaste(input)

export const disableTypeOfWaste =
  async (_, { input }, { services: { Auth }, models: { TypesOfWaste: { disableTypeOfWaste } } }) =>
    Auth.authorizeFor('ADMIN') || disableTypeOfWaste(input)
