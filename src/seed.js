import { ObjectId } from 'mongodb'
import { genSalt, hash } from 'bcryptjs'

export const seedDatabase = async ({ Facilities, Users, TypesOfWaste, Feedbacks }) => {
  // await Facilities.deleteMany({})
  // await Users.deleteMany({})
  // await TypesOfWaste.deleteMany({})
  // await Feedbacks.deleteMany({})

  const facilityCount = await Facilities.count()
  const userCount = await Users.count()
  const typesOfWasteCount = await TypesOfWaste.count()

  if (facilityCount === 0 && userCount === 0 && typesOfWasteCount === 0) {
    console.log('No data found - seeding database')

    const typesOfWaste = [
      {
        _id: new ObjectId(),
        name: 'Alumínio',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/aluminium/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Orgânico',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/compost/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Óleo de Cozinha',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/cookoil/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Eletrônico',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/ewaste/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Móvel',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/forniture/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Geral',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/general/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Vidro',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/glass/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Verde',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/green/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Resíduo Perigoso',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/hazardous/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Papel',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/paper/ios-large.png',
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Plástico',
        description: '',
        icons: {
          iosSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-small.png',
          iosMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-medium.png',
          iosLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-large.png',
          androidSmallURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-small.png',
          androidMediumURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-medium.png',
          androidLargeURL: 'http://descartae.com.s3-website-us-east-1.amazonaws.com/assets/typesOfWaste/plastic/ios-large.png',
        },
        enabled: true
      },
    ]

    const user = {
      _id: new ObjectId(),
      name: 'Example User',
      email: 'user@example.com',
      password: hash('example', await genSalt(12)),
      roles: ['ADMIN']
    }

    const facilities = [{
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 1',
      location: {
        address: 'Av. Exemplo 1',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.985046,
          longitude: -51.1099435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 2',
      location: {
        address: 'Av. Exemplo 2',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984746,
          longitude: -51.110243499999996
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 3',
      location: {
        address: 'Av. Exemplo 3',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984446,
          longitude: -51.1105435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
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
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 4',
      location: {
        address: 'Av. Exemplo 4',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984146,
          longitude: -51.110843499999994
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 5',
      location: {
        address: 'Av. Exemplo 5',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983846,
          longitude: -51.1111435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
        }, {
          dayOfWeek: 'FRIDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 6',
      location: {
        address: 'Av. Exemplo 6',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983546,
          longitude: -51.1114435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
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
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 7',
      location: {
        address: 'Av. Exemplo 7',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983246,
          longitude: -51.111743499999996
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id
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
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 8',
      location: {
        address: 'Av. Exemplo 8',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982946,
          longitude: -51.1120435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 9',
      location: {
        address: 'Av. Exemplo 9',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982646,
          longitude: -51.112343499999994
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
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
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 10',
      location: {
        address: 'Av. Exemplo 10',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982346,
          longitude: -51.1126435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
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
        contents: 'Feedback Exemplo 2'
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
