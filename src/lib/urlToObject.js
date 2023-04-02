export const urlToObject = (url = '127.0.0.1') => {
  if (!url) {
    return
  }

  const [address, port = '9000'] = url.split(':')

  return {
    address,
    port,
  }
}
