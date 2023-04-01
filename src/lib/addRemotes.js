import { urlToObject } from './urlToObject.js'

export const addRemotes = (urls, state) => {
  urls.forEach(url => {
    if (!state.remoteUrls.includes(url)) {
      state.remoteUrls.push(url)
      state.remotes.push(urlToObject(url))
    }
  })
}
