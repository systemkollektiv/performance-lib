import log from '@magic/log'

import oscPlugin from 'osc'

import { addresses } from '../config.js'
import {
  addRemotes,
  defaultHandler,
  removeRemotes,
  sendRemotes,
  urlToObject,
} from '../lib/index.js'

export const osc = async (config, options = {}) => {
  const { handler = defaultHandler, ...opts } = options
  const { state } = opts

  state.remotes = state.remoteUrls.map(urlToObject)

  state.udpPort = new oscPlugin.UDPPort(config)

  state.udpPort.on('ready', () => {
    const { localAddress, localPort } = state.udpPort.options

    log.success('Listening', 'for OSC over UDP.')
    log.info('Host:', localAddress + ', Port:', localPort)
    log.info('Remotes:', state.remoteUrls.join(' '))
  })

  const h = await handler({ ...opts, state }, config)

  state.udpPort.on('message', oscMessage => {
    const { address, args = [] } = oscMessage

    if (address === addresses.ADD_REMOTES) {
      state = addRemotes(args, state)
    } else if (address === addresses.REMOVE_REMOTES) {
      state = removeRemotes(args, state)
    } else if (address === addresses.GET_REMOTES) {
      state = sendRemotes(args, state)
    } else {
      h({ address, args })
    }
  })

  state.udpPort.on('error', err => {
    console.log(err)
  })

  state.udpPort.open()

  return state
}
