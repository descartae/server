export const typesOfWaste = async ({ typesOfWaste }, args, { models: { TypesOfWaste } }, info) => {
  return typesOfWaste && typesOfWaste.length > 0 ? typesOfWaste.map(it => TypesOfWaste.typeOfWaste(it)) : []
}

export const location = async ({ location }, args, ctx, info) => {
  const [ longitude, latitude ] = location.coordinates.coordinates
  location.coordinates = { latitude, longitude }
  return location
}

export const openHours = async ({ openHours }, args, ctx, info) => {
  if (!openHours) {
    return []
  }
  return openHours
}
