import log from '@magic/log'

import { osc } from './osc.js'
import { urlToObject } from '../lib/urlToObject.js'

export class PerformanceServer {
  constructor(args) {
    this.verbose = args.hasOwnProperty('verbose')

    if (args.remoteUrls?.length) {
      this.remoteUrls = args.remoteUrls

      this.remotes = args.remoteUrls.map(urlToObject)
    }

    const { localAddress = '127.0.0.1', localPort } = args

    if (localPort) {
      this.oscConfig = {
        localAddress,
        localPort,
      }
    }
  }

  async init() {
    if (this.oscConfig) {
      this.udpPort = await osc(this)
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
