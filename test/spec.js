import { version } from '@magic/test'

import lib, { config, osc, PerformanceServer, ws } from '../src/index.js'

const spec = {
  osc: 'function',
  ws: 'function',
  urlToObject: 'function',
  addRemotes: 'function',
  removeRemotes: 'function',
  sendRemotes: 'function',
  send: 'function',
  addresses: {
    TRANSLATE: 'string',
    START: 'string',
    STOP: 'string',
    SCREENSHOT: 'string',
    SET_PERFORMANCE_NAME: 'string',
    SET_SERVER_CONFIG: 'string',
    START_REPLAY: 'string',
    STOP_REPLAY: 'string',
    USER_INPUT: 'string',
    USER_SELECT_SCENE: 'string',
    USER_ABORT_SCENE: 'string',
    ADD_REMOTES: 'string',
    REMOVE_REMOTES: 'string',
    GET_REMOTES: 'string',
  },
  PerformanceServer: 'function',
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
