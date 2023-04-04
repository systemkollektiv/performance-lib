import http from 'node:http'

import { WebSocketServer } from 'ws'

export const ws = parent => {
  const { address = '127.0.0.1', port = 2324 } = parent.wsConfig

  const serverConfig = {}
  const server = http.createServer(serverConfig)

  const wss = new WebSocketServer({ server })

  server.listen(port, address)

  return wss
}
