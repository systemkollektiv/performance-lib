import { is } from '@magic/types'

export const mergeConfig = (options = {}, defaults = {}) => {
  if (!options) {
    return defaults
  }

  if (is.arr(options) && is.arr(defaults)) {
    if (options.length) {
      return options
    }

    return defaults
  }

  return Object.fromEntries(
    Object.entries(defaults).map(([key, val]) => {
      if (is.arr(val)) {
        if (is.arr(options[key])) {
          return [key, options[key]]
        }

        return [key, val]
      }
      if (is.obj(val) || is.obj(options[key])) {
        return [key, mergeConfig(options[key], val)]
      }

      return [key, options.hasOwnProperty(key) ? options[key] : val]
    }),
  )
}
