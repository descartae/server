export const whoami = (_, __, context) => {
  const { id, email } = context.user || {}

  return id ? `${id}: ${email}` : `anonymous`
}

export const users =
  (_, { filters }, { models: { Users: { users } }, services: { Auth } }) =>
    Auth.authorizeFor('ADMIN') || users(filters)

export const user =
  (obj, { _id }, { models: { Users: { user } } }, info) =>
    Auth.authorizeFor('ADMIN') || user(_id)
