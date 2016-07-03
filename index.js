const got = require('got')
const BASE_URL = 'http://api.metro.net/'
const ENDPOINTS = [
  'agencies/:agency/routes/:id/',
  'agencies/:agency/routes/:id/stops/',
  'agencies/:agency/stops/:id/predictions/',
  'agencies/:agency/stops/:id/messages/',
  'agencies/:agency/routes/:id/info/',
  'agencies/:agency/routes/:id/sequence/',
  'agencies/:agency/routes/:id/runs/',
  'agencies/:agency/routes/:id/vehicles/'
]
const agencies = {
  bus: 'lametro'
  /*
    currently the rail apis do not work
    seems to just return bus info
    rail: 'lametro-rail'
  */
}
const getEndpointMethodName = endpoint => {
  return endpoint.split(/\//)
    .reduce((accum, segment) => {
      if (segment.match(/^:/) || segment === 'agencies') return accum
      return accum ? `${accum}${toTitleCase(segment)}` : segment
    }, '')
}
const toTitleCase = str => {
  return str.substr(0, 1).toUpperCase() + str.substr(1)
}
const request = (endpoint, agency) => (options = {}, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  const _endpoint = endpoint
    .replace(':id', options.id || '')
    .replace(':agency', agency)
    .replace('//', '/')
  const url = `${BASE_URL}${_endpoint}`
  const req = got.get(url, {json: true})
  if (typeof callback !== 'function') return req
  req
    .then(resp => callback(null, resp.body))
    .catch(callback)
}
const metro = ENDPOINTS.reduce((accum, endpoint) => {
  Object.keys(agencies).forEach(agency => {
    if (typeof accum[agency] === 'undefined') {
      accum[agency] = {}
    }
    accum[agency][getEndpointMethodName(endpoint)] = request(endpoint, agencies[agency])
  })
  return accum
}, {})

module.exports = metro
