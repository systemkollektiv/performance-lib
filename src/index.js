import { osc as o } from './servers/osc.js'
import { ws as w } from './servers/ws.js'
import * as c from './config.js'
import { urlToObject as u } from './lib/index.js'

export const urlToObject = u

export const osc = o
export const ws = w
export const config = c

export {
  addresses,
  obsWebsocketConfig,
  outDir,
  performancePlayerOscConfig,
  performanceRecorderOscConfig,
  performanceUiOscConfig,
  testClientOscConfig,
} from './config.js'

export default {
  osc,
  ws,
  config,
  urlToObject,
}
