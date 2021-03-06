import createFacilityModel from './facility'
import createFeedbackModel from './feedback'
import createTypeOfWasteModel from './typeOfWaste'
import createUserModel from './user'
import createReverseGeocodingCacheModel from './reverseGeocodingCache'

export const createModels =
  (collections) => ({
    Facilities: createFacilityModel(collections),
    Feedbacks: createFeedbackModel(collections),
    TypesOfWaste: createTypeOfWasteModel(collections),
    Users: createUserModel(collections),
    ReverseGeocodingCache: createReverseGeocodingCacheModel(collections)
  })
