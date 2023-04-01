export const sendRemotes = (args, state) => {
  const [remoteAddress, ...urls] = args

  urls.forEach(url => {
    const [address, port] = url.split(':')
    const msg = { address: remoteAddress, args: opts.state.remoteUrls }
    state.udpPort.send(msg, address, port)
  })

  return state
}
