import express from 'express'
import jwt from 'express-jwt'
import cors from 'cors'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'

import { mongoConnector } from './mongo'
import { createModels } from './model'
import { createServices } from './services'
import schema from './schema'

import { seedDatabase } from './seed'

export const createApp = async (jwtSecret, mongodbUrl, secretKeys) => {
  const collections = await mongoConnector.connect(mongodbUrl)

  await seedDatabase(collections)

  const models = await createModels(collections)
  const services = await createServices(secretKeys)

  const server = express()

  server.use(cors())

  const authMiddleware =
    jwt({
      secret: Buffer.from(jwtSecret, 'base64'),
      credentialsRequired: false
    })

  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  server.use('/graphql', authMiddleware, bodyParser.json(), graphqlExpress((request) => {
    const context = {
      configuration: { jwtSecret },
      models,
      services
    }

    if (request.user != null) {
      context.user = request.user
    }

    return {
      schema,
      context
    }
  }))
  server.use('/', (req, res) => { res.send('') })

  return server
}
