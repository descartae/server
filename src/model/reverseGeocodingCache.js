export default ({ ReverseGeocodingCache }) => ({
  // Root queries
  async fromCache ({ latitude, longitude }) {
    return ReverseGeocodingCache.findOne({
      boundaries: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [ longitude, latitude ]
          }
        }
      }
    })
  },
  // Operations
  async addToCache ({ location, bounds }) {
    return ReverseGeocodingCache.insert({
      location,
      boundaries: {
        type: 'Polygon',
        coordinates: [ bounds ]
      }
    })
  }
})
