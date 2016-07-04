const test = require('tape')
const metro = require('./')

test('the "metro" export', t => {
  t.equal(typeof metro, 'object', 'the default metro export is a object')
  t.equal(typeof metro.bus, 'object', 'the default export has to property "bus" on it')
  t.equal(typeof metro.request, 'function', 'the default export has the method "request" on it')
  t.equal(typeof metro.toTitleCase, 'function', 'the default export has the method "toTitleCase" on it')
  t.equal(typeof metro.getEndpointMethodName, 'function', 'the default export has the method "getEndpointMethodName" on it')
  t.end()
})

test('the "metro.request" method', t => {
  const _req = metro.request('agencies/:agency/routes/:id/', 'lametro')
  t.equal(typeof _req, 'function', 'the return from the metro.request call should return a function')
  t.equal(typeof _req().then, 'function', 'the return of the returned function should be a promise of no callback is supplied')
  t.equal(typeof _req(() => {}), 'undefined', 'the return of the returned function should be undefined if a callback is supplied')
  t.end()
})

test('the promise version of the "metro.request" returned method', t => {
  const _req = metro.request('agencies/:agency/routes/:id/', 'lametro')
  _req()
    .then(res => {
      t.pass('The call is successful')
      t.equal(typeof res, 'object', 'The response is JSON')
      t.end()
    })
    .catch(() => t.fail('The call should not fail'))
})

test('the callback version of the "metro.request" returned method', t => {
  const _req = metro.request('agencies/:agency/routes/:id/', 'lametro')
  _req((err, res) => {
    if (err) return t.fail('The call should not fail')
    t.pass('The call is successful')
    t.equal(typeof res, 'object', 'The response is JSON')
    t.end()
  })
})

test('the "metro.toTitleCase" method', t => {
  t.equal(metro.toTitleCase('foo'), 'Foo', 'the string is title cased when passed to "toTitleCase"')
  t.end()
})

test('the "metro.getEndpointMethodName" method', t => {
  t.equal(
    metro.getEndpointMethodName('agencies/:foo/foo/bar'),
    'fooBar',
    `the string has agencies and :params removed
     and the first url segment is not capitialized
     but the second url segment is to form a camel
     case string`
  )
  t.end()
})
