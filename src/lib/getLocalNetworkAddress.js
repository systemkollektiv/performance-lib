import os from 'node:os'

export const getLocalNetworkAddress = () => {
  const interfaces = os.networkInterfaces()

  let address

  Object.values(interfaces).forEach(i => {
    i.forEach(ii => {
      if (ii.address.startsWith('192.') || ii.address.startsWith('10.')) {
        address = ii.address
      }
    })
  })

  return address
}