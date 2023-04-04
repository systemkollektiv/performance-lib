import log from '@magic/log'

import oscPlugin from 'osc'

import addresses from '../addresses.js'

export const osc = async (server) => {
  const udpPort = new oscPlugin.UDPPort(server.oscConfig)

  udpPort.on('ready', () => {
    const { localAddress, localPort } = udpPort.options

    log.success('Listening', 'for OSC over UDP.')
    log.info('Host:', localAddress + ', Port:', localPort)
    if (server.remoteUrls?.length) {
      log.info('Remotes:', server.remoteUrls.join(' '))
    }
  })

  const h = await server.handler()

  udpPort.on('message', oscMessage => {
    const { address, args = [] } = oscMessage

    if (address === addresses.ADD_REMOTES) {
      server.addRemotes(args)
    } else if (address === addresses.REMOVE_REMOTES) {
      server.removeRemotes(args)
    } else if (address === addresses.GET_REMOTES) {
      server.sendRemotes(args)
    } else {
      h({ address, args })
    }
  })

  udpPort.on('error', err => {
    console.log(err)
  })

  udpPort.open()

  return udpPort
}
