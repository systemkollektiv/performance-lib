import log from '@magic/log'

import { osc } from './osc.js'
import { urlToObject } from '../lib/urlToObject.js'
import { ws } from './ws.js'
import { obs } from './obs.js'

const hasArgs = (name, args) => {
  if (args[name] === false) {
    return false
  }

  const names = [name, `${name}Address`, `${name}Port`]

  const hasArg = names.some(n => args.hasOwnProperty(n) && args[n])
  return hasArg
}

export class PerformanceServer {
  constructor(args) {
    this.verbose = args.hasOwnProperty('verbose')

    if (args.remoteUrls?.length) {
      this.remoteUrls = args.remoteUrls

      this.remotes = args.remoteUrls.map(urlToObject)
    }

    const {
      oscAddress = '127.0.0.1',
      oscPort,
      obsAddress = '127.0.0.1',
      obsPort = 4455,
      obsPassword,
      obsProtocol = 'ws',
      wsAddress = '127.0.0.1',
      wsPort,
      wsProtocol = 'ws',
    } = args

    if (hasArgs('osc', args)) {
      this.oscConfig = {
        localAddress: oscAddress,
        localPort: oscPort,
      }
    }

    if (hasArgs('ws', args)) {
      this.wsConfig = {
        port: wsPort,
        address: wsAddress,
        protocol: wsProtocol,
      }
    }

    if (hasArgs('obs', args)) {
      this.obsConfig = {
        port: obsPort,
        address: obsAddress,
        password: obsPassword,
        protocol: obsProtocol,
      }
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
    log.info('received', oscMessage)
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
      state.udpPort.send(msg, address, port)
    })

    return state
  }

  send({ address, args, msg }) {
    /*
     * if a websocketserver has been passed as argument, broadcast all messages onwards to all clients.
     */
    if (this.ws && msg) {
      this.ws.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg)
        }
      })
    }

    this.remotes.forEach(url => {
      this.osc.send({ address, args }, url.address, url.port)
    })
  }
}
