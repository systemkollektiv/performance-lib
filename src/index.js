import { osc as o } from './servers/osc.js'
import { ws as w } from './servers/ws.js'
import * as c from './config.js'

export const osc = o
export const ws = w
export const config = c

export {
  performanceRecorderOscConfig,
  performanceUiOscConfig,
  testClientOscConfig,
  outDir,
  addresses,
  shortAddresses,
} from './config.js'

export default {
  osc,
  ws,
  config,
}
