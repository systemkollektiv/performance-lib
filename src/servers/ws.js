import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

export const ws = (config = {}) => {
  const {
    localAddress = '127.0.0.1',
    localPort = 2324,
  } = config

  const server = createServer(/*{
    // cert: readFileSync('/path/to/cert.pem'),
    // key: readFileSync('/path/to/key.pem')
  }*/)

  const wss = new WebSocketServer({ server })

  server.listen(localPort, localAddress)

  return wss
}
