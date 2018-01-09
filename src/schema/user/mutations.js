export const authenticate =
  async (obj, { credentials: { email, password } }, { models: { Users: { authenticate } }, services: { Auth } }) => {
    const user = await authenticate({ email, password })

    if (!user) {
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
    const user = await addUser({ name, email, password, roles })

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