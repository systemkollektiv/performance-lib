export const urlToObject = (url = '127.0.0.1') => {
  if (!url) {
    return
  }

  console.log({url})

  const [address, port = '2323'] = url.split(':')

  return {
    address,
    port,
  }
}
