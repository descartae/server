import jwt from 'jsonwebtoken'
import { any, equals } from 'ramda'
import { HttpQueryError } from 'apollo-server-core'
import { compare, genSalt, hash } from 'bcryptjs'

export default ({ user, configuration: { secrets: { JWT_SECRET } } }) => ({
  hasAnyRole(... roles) {
    return user && any((role) => any(equals(role))(roles))(user.roles)
  },

  authorizeFor(... roles) {
    if (!this.hasAnyRole(...roles)) {
      throw new HttpQueryError(403, 'Unauthorized', true)
    }
  },

  async sign(payload) {
    return jwt.sign(payload, Buffer.from(JWT_SECRET, 'base64'))
  },

  async hashPassword(password) {
    return hash(password, await genSalt(12))
  },

  async compare(hash, password) {
    return compare(password, hash)
  }
})