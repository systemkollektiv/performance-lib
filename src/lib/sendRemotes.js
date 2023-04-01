export const sendRemotes = (args, udpPort) => {
  const [remoteAddress, ...urls] = args

  urls.forEach(url => {
    const [address, port] = url.split(':')
    const msg = { address: remoteAddress, args: opts.state.remoteUrls }
    udpPort.send(msg, address, port)
  })
}
