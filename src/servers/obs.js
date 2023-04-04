import OBSWebSocket from 'obs-websocket-js'

export const obs = async parent => {
  const { obsConfig, obsEventSubscriptions = {} } = parent

  const obsWebSocket = new OBSWebSocket()

  const url = `${obsConfig.protocol}://${obsConfig.address}:${obsConfig.port}`

  await obsWebSocket.connect(url, obsConfig.password, {
    eventSubscriptions: obsEventSubscriptions,
  })

  return obsWebSocket
}
