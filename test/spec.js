import { version } from '@magic/test'

import lib, { config, osc, ws } from '../src/index.js'

const spec = {
  osc: 'function',
  ws: 'function',
  config: {
    addresses: 'array',
    obsWebsocketConfig: {},
    outDir: 'string',
    performancePlayerOscConfig: {},
    performanceRecorderOscConfig: {},
    performanceUiOscConfig: {},
    testClientOscConfig: {
      localAddress: 'string',
      localPort: 'string',
    },
  },
}

export default [...version(lib, spec), ...version({ config, osc, ws }, spec)]
