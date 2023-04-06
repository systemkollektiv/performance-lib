import log from '@magic/log'

import OBSWebSocket from 'obs-websocket-js'

export const obs = async parent =>
  new Promise(async resolve => {
    const { obsConfig, obsEventSubscriptions = 0 } = parent
    const url = `${obsConfig.protocol}://${obsConfig.address}:${obsConfig.port}`

    try {
      const obsWebSocket = new OBSWebSocket()

      await obsWebSocket.connect(url, obsConfig.password, {
        eventSubscriptions: obsEventSubscriptions,
      })

      console.log('Connected to obs via', url)

      resolve(obsWebSocket)
    } catch (e) {
      const waitForRetryDuration = 5_000
      log.warn('W_OBS_CONNECTION', e.message)
      log.info(
        'obs refused the connection to',
        url,
        'retrying in',
        waitForRetryDuration / 1000,
        'seconds',
      )
      setTimeout(() => obs(parent, resolve), waitForRetryDuration)
    }
  })
