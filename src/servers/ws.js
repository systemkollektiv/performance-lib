import http from 'node:http'

import log from '@magic/log'

import { WebSocketServer } from 'ws'

export const ws = async parent => {
  const { address = '127.0.0.1', port = 2324 } = parent.wsConfig

  const serverConfig = {}
  const server = http.createServer(serverConfig)

  const wss = new WebSocketServer({ server })

  console.log('init wss')

  wss.on('connection', ws => {
    console.log('init ws connection')

    if (parent.onMessage) {
      ws.on('message', parent.onMessage)
    }

    if (parent.onError) {
      ws.on('error', parent.onError)
    } else {
      ws.on('error', console.error)
    }

    ws.on('open', (...args) => console.log('ws open', ...args))
  })

  return new Promise(resolve => {
    server.listen(port, () => {
      log.success('Listening for Websockets.')
      log.info('Host:', address + ', Port:', port)
      resolve(wss)
    })
  })
}
