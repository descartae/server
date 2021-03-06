import { ObjectId } from 'mongodb'
import { genSalt, hash } from 'bcryptjs'
import { mongoConnector } from './mongo'

export const seedDatabase = async ({ Facilities, Users, TypesOfWaste, Feedbacks, ReverseGeocodingCache }, opts = { force: false }) => {
  const { force } = opts
  if (force) {
    await Facilities.deleteMany({})
    await Users.deleteMany({})
    await TypesOfWaste.deleteMany({})
    await Feedbacks.deleteMany({})
    await ReverseGeocodingCache.deleteMany({})
  }

  const facilityCount = await Facilities.count()
  const userCount = await Users.count()
  const typesOfWasteCount = await TypesOfWaste.count()

  if (facilityCount === 0 && userCount === 0 && typesOfWasteCount === 0) {
    !force && console.log('No data found - seeding database')

    const typesOfWaste = [

      // Default type
      {
        _id: new ObjectId('000000000000000000000000'),
        name: '',
        color: 'BEBEC6',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/android-large.png'
        },
        enabled: false
      },

      {
        _id: new ObjectId(),
        name: 'Alumínio',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: 'FFC60B',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Orgânico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '724738',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Óleo de Cozinha',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '724738',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Eletrônico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: 'BEBEC6',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Móvel',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '000000',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/furniture/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Vidro',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '49C905',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Verde',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '49C905',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Resíduo Perigoso',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: 'A438C4',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Papel',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: '00AEEF',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/android-large.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Plástico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        color: 'F2274C',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/android-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/android-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/android-large.png'
        },
        enabled: true
      }
    ]

    const user = {
      _id: new ObjectId(),
      name: 'Example User',
      email: 'user@example.com',
      title: 'Example Admin',
      organization: 'Example Organization',
      municipality: 'Example City',
      password: await hash('example', await genSalt(12)),
      roles: ['ADMIN']
    }

    const facilities = [{
      _id: new ObjectId('000000000000000000000001'),
      createdBy: user._id,
      name: 'Local Exemplo 1',
      location: {
        address: 'Av. Exemplo 1',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1099435, -29.985046]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000002'),
      createdBy: user._id,
      name: 'Local Exemplo 2',
      location: {
        address: 'Av. Exemplo 2',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.110243499999996, -29.984746]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id,
        typesOfWaste[3]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000003'),
      createdBy: user._id,
      name: 'Local Exemplo 3',
      location: {
        address: 'Av. Exemplo 3',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1105435, -29.984446]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000004'),
      createdBy: user._id,
      name: 'Local Exemplo 4',
      location: {
        address: 'Av. Exemplo 4',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.110843499999994, -29.984146]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000005'),
      createdBy: user._id,
      name: 'Local Exemplo 5',
      location: {
        address: 'Av. Exemplo 5',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1111435, -29.983846]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id,
        typesOfWaste[3]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'FRIDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000006'),
      createdBy: user._id,
      name: 'Local Exemplo 6',
      location: {
        address: 'Av. Exemplo 6',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1114435, -29.983546]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'FRIDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'SATURDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000007'),
      createdBy: user._id,
      name: 'Local Exemplo 7',
      location: {
        address: 'Av. Exemplo 7',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.111743499999996, -29.983246]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000008'),
      createdBy: user._id,
      name: 'Local Exemplo 8',
      location: {
        address: 'Av. Exemplo 8',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1120435, -29.982946]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id,
        typesOfWaste[3]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000009'),
      createdBy: user._id,
      name: 'Local Exemplo 9',
      location: {
        address: 'Av. Exemplo 9',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.112343499999994, -29.982646]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId('000000000000000000000010'),
      createdBy: user._id,
      name: 'Local Exemplo 10',
      location: {
        address: 'Av. Exemplo 10',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          type: 'Point',
          coordinates: [-51.1126435, -29.982346]
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    }]

    const feedbacks = [
      {
        _id: new ObjectId(),
        resolved: false,
        contents: 'Feedback Exemplo 1'
      },
      {
        _id: new ObjectId(),
        resolved: false,
        facility: facilities[0]._id,
        contents: `Bom dia,
Creio que esse seja um exemplo de feedback com multiplas linhas.

Por favor, verificar na interface!`
      },
      {
        _id: new ObjectId(),
        resolved: false,
        facility: facilities[0]._id,
        contents: 'Feedback Exemplo 2 2'
      },
      {
        _id: new ObjectId(),
        resolved: false,
        facility: facilities[0]._id,
        contents: 'Feedback Exemplo 2 3'
      },
      {
        _id: new ObjectId(),
        resolved: true,
        facility: facilities[0]._id,
        contents: 'Feedback Exemplo 2 4'
      },
      {
        _id: new ObjectId(),
        resolved: true,
        facility: facilities[0]._id,
        contents: 'Feedback Exemplo 2 5'
      },
      {
        _id: new ObjectId(),
        resolved: true,
        contents: 'Feedback Exemplo 3'
      }
    ]

    await Users.insert(user)
    await TypesOfWaste.insert(typesOfWaste)
    await Facilities.insert(facilities)
    await Feedbacks.insert(feedbacks)

    Facilities.createIndex({'location.coordinates': '2dsphere'})

    console.log('Seeded!')
  }
}

export const seeder = async (mongodbUrl, secrets) => {
  const collections = await mongoConnector.connect(mongodbUrl)

  await seedDatabase(collections, { force: true })
}
