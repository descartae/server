import { HttpQueryError } from 'apollo-server-core'

export const authenticate =
  async (obj, { credentials: { email, password } }, { models: { Users: { userByEmail } }, services: { Auth } }) => {
    const user = await userByEmail(email)

    if (!user || !user.password || !await Auth.compare(user.password, password)) {
      const avoidBruteForceTimer = () => {
        const timeout = Math.round(Math.random() * (6 - 2) + 2) * 1000
        return new Promise((resolve) => setTimeout(() => resolve(), timeout))
      }

      await avoidBruteForceTimer()

      return {
        success: false,
        error: 'INVALID_CREDENTIALS'
      }
    }

    const { _id, roles } = user
    const payload = { id: _id, email, roles }

    return {
      success: true,
      sessionToken: await Auth.sign(payload)
    }
  }

export const addUser =
  async (obj, { input: { name, email, password, roles, title, organization, municipality, coordinates } }, { models: { Users: { addUser } }, services: { Auth } }) => {
    Auth.authorizeFor('ADMIN')

    const user = await addUser({ name, email, password, title, organization, municipality, roles, coordinates }, { Auth })

    if (!user) {
      return {
        success: false
      }
    }

    return {
      success: true,
      user
    }
  }

export const addSelfUser =
  async (obj, { input: { name, email, password, title, organization, municipality } }, {
    models: { Users: { addUser } },
    services: { Auth },
    configuration: { signup: { enable, role } }
  }) => {
    if (!enable) {
      throw new HttpQueryError(400, 'Bad request', true)
    }

    const user = await addUser({ name, email, password, title, organization, municipality, roles: [ role ] }, { Auth })

    if (!user) {
      return {
        success: false
      }
    }

    return {
      success: true,
      user
    }
  }

export const updateUser =
  async (obj, { input }, { services, services: { Auth }, models: { Users: { updateUser } } }, info) => {
    const logged = Auth.logged()

    if (input._id == logged.id) {
      // Normal users cannot update its own roles
      if ('roles' in input.patch) {
        Auth.authorizeFor('ADMIN')
      }
    } else {
      // Only admin can update another user
      Auth.authorizeFor('ADMIN')
    }

    const user = await updateUser(input, { Auth })

    if (!user) {
      return {
        success: false
      }
    }

    return {
      success: true,
      user
    }
  }

export const addWaitingUser =
  async (obj, { input: { email, coordinates } }, { models: { Users: { addWaitingUser } } }) => {
    const user = await addWaitingUser({ email, coordinates })

    if (!user) {
      return {
        success: false
      }
    }

    return {
      success: true,
      user
    }
  }
