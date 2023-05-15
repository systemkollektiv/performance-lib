import path from 'node:path'
import https from 'node:https'
import http from 'node:http'

import fs from '@magic/fs'
import log from '@magic/log'

import { WebSocketServer } from 'ws'

export const ws = async parent => {
  const { address = '127.0.0.1', port = 2324 } = parent.wsConfig
  let { certDir } = parent

  let server

  if (certDir) {
    const cert = await fs.readFile(path.join(certDir, 'cert.pem'))
    const key = await fs.readFile(path.join(certDir, 'key.pem'))

    const serverConfig = {
      cert,
      key,
    }

    server = https.createServer(serverConfig)
  } else {
    server = http.createServer()
  }

  const wss = new WebSocketServer({ server })

  // console.log('init WebSocketServer', wss)

  wss.on('connection', ws => {
    console.log('init WebSocket connection')

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
