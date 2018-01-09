import googleMaps from '@google/maps'

export default ({ configuration: { secrets: { MAPS_API_KEY } } }) => {

  const client = googleMaps.createClient({
    key: MAPS_API_KEY
  })

  return {
    async geocode (address) {
      return new Promise((resolve, reject) => {
        client.geocode({ address }, (error, response) => {
          if (error) {
            reject(error)
            return
          }

          const data = response.json.results[0]

          if (data == null) {
            reject(new Error(`Could not resolve location for address: ${address}`))
            return
          }

          const { address_components, geometry } = data

          const findByType = (target) =>
            address_components.filter(it => it.types.includes(target))[0].long_name

          const location = {
            address: findByType('route') + ' ' + findByType('street_number'),
            municipality: findByType('administrative_area_level_2'),
            state: findByType('administrative_area_level_1'),
            zip: findByType('postal_code') + '000',
            coordinates: {
              latitude: geometry.location.lat,
              longitude: geometry.location.lng
            }
          }

          resolve(location)
        })
      })
    },
    async reverseGeocode ({ latitude, longitude }) {
      return new Promise((resolve, reject) => {
        client.reverseGeocode({
          latlng: [latitude, longitude]
        }, (error, response) => {
          if (error) {
            reject(error)
            return
          }

          resolve(response.json)
        })
      })
    }
  }
}