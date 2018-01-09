export const whoami = (obj, args, context, info) => {
  const { id, email } = context.user || {}

  return id ? `${id}: ${email}` : `anonymous`
}

export const users =
  (obj, { filters }, { services: { Auth } }, info) =>
    Auth.authorizeFor('ADMIN') || users(filters)