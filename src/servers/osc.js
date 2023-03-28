import oscPlugin from 'osc'

const defaultHandler = oscMessage => console.log(oscMessage)

export const osc = (config, options = {}) => {
  const { handler = defaultHandler, ...opts } = options

  const udpPort = new oscPlugin.UDPPort(config)

  udpPort.on('ready', () => {
    console.log('Listening for OSC over UDP.')
    console.log(' Host:', udpPort.options.localAddress + ', Port:', udpPort.options.localPort)
  })

  opts.udpPort = udpPort

  udpPort.on('message', handler(opts, config))

  udpPort.on('error', err => {
    console.log(err)
  })

  udpPort.open()

  return udpPort
}
