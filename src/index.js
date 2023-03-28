import { osc as o } from './servers/osc.js'
import { ws as w } from './servers/ws.js'
import * as c from './config.js'

export const osc = o
export const ws = w
export const config = c

export {
  addresses,
  obsWebsocketConfig,
  outDir,
  performanceRecorderOscConfig,
  performanceUiOscConfig,
  shortAddresses,
  testClientOscConfig,
} from './config.js'

export default {
  osc,
  ws,
  config,
}
