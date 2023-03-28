export const performanceRecorderOscConfig = {
  localAddress: '127.0.0.1',
  localPort: 2324,
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

export const outDir = 'data'

export const addresses = {
  TRANSLATE: '/PosRot',
  START: '/startRecording',
  STOP: '/stopRecording',
  SCREENSHOT: '/takeScreenshot',
  SET_PERFORMANCE_NAME: '/recFileName',
}

export const shortAddresses = {
  TRANSLATE: 't',
  SCREENSHOT: 's',
}
