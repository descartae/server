export const coordinates = async ({ coordinates }, args, ctx, info) => {
  if (!coordinates) {
      return
  }
  const [ longitude, latitude ] = coordinates.coordinates
  return { latitude, longitude }
}
