import path from 'node:path'

import is from '@magic/types'
import log from '@magic/log'

import { osc } from './osc.js'
import { ws } from './ws.js'
import { obs } from './obs.js'

import { getLocalNetworkAddress, urlToObject } from '../lib/index.js'

export class PerformanceServer {
  constructor(args) {
    this.verbose = args.hasOwnProperty('verbose')

    this.localNetworkAddress = getLocalNetworkAddress()

    if (args.remoteUrls?.length) {
      this.remoteUrls = args.remoteUrls

      this.remotes = args.remoteUrls.map(urlToObject)
    }

    const osc = args.hasOwnProperty('osc') && args.osc !== false
    const obs = args.hasOwnProperty('obs') && args.obs !== false
    const ws = args.hasOwnProperty('ws') && args.ws !== false

    const {
      oscAddress = this.localNetworkAddress,
      oscPort = 2328,
      obsAddress = '127.0.0.1',
      obsPort = 4455,
      obsPassword,
      obsProtocol = 'ws',
      wsAddress = this.localNetworkAddress,
      wsPort = 8888,
      wsProtocol = 'ws',
      obsEventSubscriptions = 0,
    } = args

    this.certDir = args.certDir
    if (this.certDir && !path.isAbsolute(this.certDir)) {
      this.certDir = path.join(process.cwd(), this.certDir)
    }

    this.debug = args.hasOwnProperty('debug')
    this.log('PerformanceServer debug', this.debug)

    if (osc) {
      this.oscConfig = {
        localAddress: oscAddress,
        localPort: parseInt(oscPort),
      }

      this.log('set osc config', this.oscConfig)
    }

    if (ws) {
      this.wsConfig = {
        port: parseInt(wsPort),
        address: wsAddress,
        protocol: wsProtocol,
      }

      this.log('set ws config', this.wsConfig)
    }

    if (obs) {
      this.obsConfig = {
        port: parseInt(obsPort),
        address: obsAddress,
        password: obsPassword,
        protocol: obsProtocol,
      }

      this.obsEventSubscriptions = obsEventSubscriptions

      this.log('set obs config', this.obsConfig)
    }
  }

  log(...msgs) {
    if (this.debug) {
      log.info(...msgs)
    }
  }

  async init() {
    if (this.oscConfig) {
      this.osc = await osc(this)
    }

    if (this.wsConfig) {
      this.ws = await ws(this)
    }

    if (this.obsConfig) {
      this.obs = await obs(this)
    }
  }

  handler(oscMessage) {
    this.log('received', oscMessage)
  }

  addRemotes(urls, state) {
    urls.forEach(url => {
      if (!this.remoteUrls.includes(url)) {
        this.remoteUrls.push(url)
        this.remotes.push(urlToObject(url))
      }
    })

    return state
  }

  removeRemotes(urls) {
    urls.forEach(url => {
      if (!this.remoteUrls.includes(url)) {
        return
      }

      const index = this.remoteUrls.indexOf(url)
      if (index > -1) {
        this.remoteUrls.splice(index, 1)
        this.remotes.splice(index, 1)
      }
    })
  }

  sendRemotes(args) {
    const [remoteAddress, ...remotes] = args

    remotes.forEach(url => {
      const [address, port] = url.split(':')
      const msg = { address: remoteAddress, args: this.remoteUrls }
      state.udpPort.send(msg, address, parseInt(port))
    })

    return state
  }

  send({ address, args, msg }) {
    if (!is.empty(args) && !is.array(args)) {
      args = [args]
    }

    if (msg) {
      const [a, ...parts] = msg.split(' ')

      if (!address) {
        address = a
      }

      if (!args) {
        args = parts
      }
    }

    if (!msg) {
      if (address) {
        msg = address
      }

      if (args) {
        msg = `${msg} ${args.map(arg => (arg.value ? arg.value : arg)).join(' ')}`.trim()
      }
    }

    /*
     * if a websocketserver has been passed as argument, broadcast all messages onwards to all clients.
     */
    // if (this.ws) {
    //   this.log('sending to ws clients', msg)
    //   this.ws.clients.forEach(client => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(msg)
    //     }
    //   })
    // }

    this.log('sending to osc remotes', { address, args, remotes: this.remotes })
    this.remotes.forEach(url => {
      this.osc.send({ address, args }, url.address, parseInt(url.port))
    })
  }
}
