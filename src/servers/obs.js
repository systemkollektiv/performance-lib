import OBSWebSocket from 'obs-websocket-js'

const isIntable = e => parseInt(e) === +parseInt(e)

export const obs = (parent) => {
  const { obsConfig, obsEventSubscriptions = {} } = parent

  const obsWebSocket = new OBSWebSocket()

  const url = `${obsConfig.protocol}://${obsConfig.address}:${obsConfig.port}`

  await obsWebSocket.connect(url, obsConfig.password, {
    eventSubscriptions: obsEventSubscriptions,
  })

  return obsWebSocket
}