# @systemkollektiv/performance-lib

various helper functions and server boilerplate for the systemkollektiv performance toolkit.

## usage

### installation:

we install via github for now, living on the edge.

```
npm install systemkollektiv/performance-lib
```

### functionality:

#### osc and websockets

```
import { osc, ws } from '@systemkollektiv/performance-lib'

const oscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2323,
}

const wsConfig = {
  localAddress: '127.0.0.1',
  localPort: 2324,
}

const wss = ws(wsConfig)

const oscHandler = options => {
  const { state, wss } = options

  return msg => {
    console.log(msg)
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg)
        }
      })
    }
  }
}

/* start a osc server that also broadcasts all message it gets onwards via websockets.
const oscs = osc(oscConfig, { wss })

```
