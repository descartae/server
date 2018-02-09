import readline from 'readline-sync'
import http from 'http'

import { createApp } from './app'
import { seeder } from './seed'

// To be replaced by webpack - https://github.com/mrsteele/dotenv-webpack/issues/70
const args = process.argv
const SERVER_PORT = process.env.SERVER_PORT
const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URL = process.env.MONGODB_URL
const MAPS_API_KEY = process.env.MAPS_API_KEY

const secrets = { JWT_SECRET, MAPS_API_KEY }

if (args.indexOf('--seed') > -1) {
  console.log('This operation will wipe out the database.')
  const input = readline.question('Type YES to continue: ')

  if (input === 'YES') {
    console.log('Running seed...')
    seeder(MONGODB_URL, secrets)
      .then(() => {
        process.exit(0)
      })
  } else {
    process.exit(1)
  }
} else {
  createApp(MONGODB_URL, secrets)
    .then((createdApp) => {
      let currentApp = createdApp
      const server = http.createServer(currentApp)

      server.listen(SERVER_PORT)

      if (module.hot) {
        module.hot.accept('./app', async () => {
          const { createApp } = require('./app')
          const newApp = await createApp(MONGODB_URL, secrets)

          server.removeListener('request', currentApp)
          server.on('request', newApp)

          currentApp = newApp
        })
      }
    })
    .then(() => console.log(`Server is listening on http://localhost:${SERVER_PORT}`))
    .catch((error) => console.error(error))
}
