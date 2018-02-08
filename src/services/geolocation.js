import googleMaps from '@google/maps'
import { find } from 'ramda'

export default ({ models: { ReverseGeocodingCache }, configuration: { secrets: { MAPS_API_KEY } } }) => {
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

          try {
            const { address_components, geometry } = data

            const findByType = (target) =>
              (
                address_components.filter(it => it.types.includes(target))[0] ||
                { long_name: '' }
              )
              .long_name

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
          } catch (error) {
            console.log(error)
            reject(error)
          }
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
    },
    async boundaries ({ latitude, longitude }) {
      let city = await ReverseGeocodingCache.fromCache({ latitude, longitude })
      if (city) {
        return city.boundaries.coordinates[0]
      } else {
        // TODO next versions should support more detailed shapes
        city = await this.reverseGeocode({ latitude, longitude })

        const cityBoundaries = find(
          (r) =>
            find(t => t === 'locality')(r.types) &&
            find(t => t === 'political')(r.types)
        )(city.results)

        if (cityBoundaries) {
          const { northeast, southwest } = cityBoundaries.geometry.viewport

          const bounds = [
            [southwest.lng, northeast.lat],
            [northeast.lng, northeast.lat],
            [northeast.lng, southwest.lat],
            [southwest.lng, southwest.lat],
            [southwest.lng, northeast.lat]
          ]

          await ReverseGeocodingCache.addToCache({
            location: cityBoundaries.formatted_address,
            bounds
          })

          return bounds
        }
      }
    }
  }
}
