import { compare, genSalt, hash } from 'bcryptjs'

const hashPassword = async (password) =>
  hash(password, await genSalt(12))

export const authenticate =
  async (obj, { credentials: { email, password } }, { models: { Users: { userByEmail } }, services: { Auth } }) => {
    const user = await userByEmail(email)

    if (!user || !await compare(password, user.password)) {
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
  async (obj, { user: { name, email, password, roles } }, { models: { Users: { addUser } }, services: { Auth } }) => {
    Auth.authorizeFor('ADMIN')

    const hash = await hashPassword(password)
    const user = await addUser({ name, email, password: hash, roles })

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