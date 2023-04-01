export const send = (msg, args) => {
  const { wss } = args
  const { remotes = [] } = args.state

  if (msg) {
    const { address, args = [] } = msg

    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`${address} ${args.join(' ')}`)
        }
      })
    }

    remotes.forEach(url => {
      udpPort.send({ address, args }, url.address, url.port)
    })
  }
}
