import createGeolocationService from './geolocation'

export const createServices =
  (context) => ({
    Geolocation: createGeolocationService(context),
  })
