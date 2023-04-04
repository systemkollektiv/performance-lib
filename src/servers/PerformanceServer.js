import log from '@magic/log'

import { osc } from './osc.js'
import { urlToObject } from '../lib/urlToObject.js'
import { ws } from './ws.js'
import { obs } from './obs.js'

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
      wsAddress = '127.0.0.1',
      wsPort,
      wsProtocol,
      obsAddress,
      obsPort = 4455,
      obsPassword,
      obsProtocol = 'ws',
    } = args

    if (oscPort) {
      this.oscConfig = {
        localAddress: oscAddress,
        localPort: oscPort,
      }
    }

    if (wsPort) {
      this.wsConfig = {
        port: wsPort,
        address: wsAddress,
        protocol: wsProtocol,
      }
    }

    if (obsAddress) {
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
      this.udpPort = await osc(this)
    }

    if (this.wsConfig) {
      this.wss = await ws(this)
    }

    if (this.obsConfig) {
      this.obs = await obs(this)
    }
  }

  handler() {
    return oscMessage => log.info(oscMessage)
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
}
