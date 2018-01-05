import createGeolocationService from './geolocation'

export const createServices =
  (keys) => ({
    Geolocation: createGeolocationService(keys)
  })
