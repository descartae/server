export const assertNotEmpty = (target, name, message = null) => {
  if (target == null) throw new Error(message || `Received empty value for required field: ${name}`)
}

export const assertAny = (target, name, message = null) => {
  if (target == null || target.length < 1) throw new Error(message || `At least one entry is required for list: ${name}`)
}

export const assertHexColor = (target, name, message = null) => {
  if (!/^#?[0-9A-Fa-f]{6}$/g.test(target)) throw new Error(message || `Received empty value for required field: ${name}`)
}
