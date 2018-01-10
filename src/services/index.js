import createGeolocationService from './geolocation'
import createAuthService from './auth'

export const createServices =
  (context) => ({
    Geolocation: createGeolocationService(context),
    Auth: createAuthService(context)
  })
