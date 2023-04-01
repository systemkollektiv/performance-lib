export const removeRemotes = (urls, state) => {
  urls.forEach(url => {
    if (!state.remoteUrls.includes(url)) {
      return
    }

    const index = state.remoteUrls.indexOf(url)
    if (index > -1) {
      state.remoteUrls.splice(index, 1)
      state.remotes.splice(index, 1)
    }
  })

  return state
}
