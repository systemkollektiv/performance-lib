export const performanceRecorderOscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2324,
}

export const performancePlayerOscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2327,
}

export const performanceUiOscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2325,
  remoteAddress: performanceRecorderOscConfig.localAddress,
  remotePort: performanceRecorderOscConfig.localPort,
}

export const testClientOscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2326,
  remoteAddress: performanceRecorderOscConfig.localAddress,
  remotePort: performanceRecorderOscConfig.localPort,
}

export const obsWebsocketConfig = {
  localAddress: '127.0.0.1',
  localPort: '4455',
  protocol: 'ws',
  pass: '123456',
}

export const outDir = 'data'
