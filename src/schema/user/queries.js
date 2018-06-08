export const whoami = (_, __, context) => {
  const { id, email } = context.user || {}

  return id ? `${id}: ${email}` : `anonymous`
}

export const users =
  (_, { filters }, { models: { Users: { users } }, services: { Auth } }) => {
    if (!Auth.hasAnyRole('ADMIN')) {
      const logged = Auth.logged()
      filters._id = logged.id
    }
    
    return users(filters)
  }

export const user =
  (obj, { _id }, { models: { Users: { user } }, services: { Auth } }, info) => {
    if (Auth.logged().id !== _id) {
        Auth.authorizeFor('ADMIN')
    }
    return user(_id)
  }
