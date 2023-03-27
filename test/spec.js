import { version } from '@magic/test'

import lib, { osc, ws } from '../src/index.js'

const spec = {
  osc: 'function',
  ws: 'function',
}

export default [
  ...version(lib, spec),
  ...version({ osc, ws }, spec)
]
