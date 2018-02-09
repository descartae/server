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

export const createApp = async (mongodbUrl, secrets) => {
  const collections = await mongoConnector.connect(mongodbUrl)

  await seedDatabase(collections)

  const server = express()
  server.use(cors())

  const authMiddleware =
    jwt({
      secret: Buffer.from(secrets.JWT_SECRET, 'base64'),
      credentialsRequired: false,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1]
        } else if (req.query && req.query.token) {
          return req.query.token
        }
        return null
      }
    })

  server.use('/graphiql', express.static(__dirname + '/resources/graphiql.html'))

  server.use('/graphql', authMiddleware, bodyParser.json(), graphqlExpress(async (request, response) => {
    const context = {
      configuration: { secrets },
      models: await createModels(collections),
      secrets
    }

    if (request.user != null) {
      context.user = request.user
    }

    context.services = await createServices(context)

    return {
      schema,
      context
    }
  }))
  server.use('/', (req, res) => { res.send('') })

  return server
}
