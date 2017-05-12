# LAMetro

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/lametro-api.svg)](https://greenkeeper.io/)

This is a thin wrapper around the [LA Metro realtime api](http://developer.metro.net/introduction/realtime-api-overview/).

[![Build Status](https://travis-ci.org/jcblw/lametro-api.svg?branch=master)](https://travis-ci.org/jcblw/lametro-api) [![Coverage Status](https://coveralls.io/repos/github/jcblw/lametro-api/badge.svg?branch=master)](https://coveralls.io/github/jcblw/lametro-api?branch=master)

> It seems as tho only bus info is included in this api :( for now.

# Usage

```
npm install lametro
```

Once you have the package installed now you can include it in your project.

```javascript
import metro from 'lametro'
const {bus} = metro

// get all bus routes
bus.routes((err, res) => {
  if (err) return console.error(err)
  console.log('all routes', res)
})
```

### Available methods

- routes
- routesStops
- stopsPredictions
- stopsMessages
- routesSequence
- routesRuns
- routesVehicles

All methods are in the namespace of a `agency`. eg To get all the bus routes it is.

```javascript
metro.bus.routes([option, callback])
```

To get a specific route you will need to call with some options.

```javascript
metro.bus.routes({id: 704}, (err, res) => {
  if (err) return console.error(err)
  console.log(res)
})
```

### Mapping method to endpoints

I am not going to document exactly what info comes back from the endpoints here, because that info can be found at [realtime examples ](http://developer.metro.net/introduction/realtime-api-overview/realtime-api-examples/) page, but it is good to know how the methods of this lib map to the endpoints of the api.

Lets say we want to make the api call to this url.

```
http://api.metro.net/agencies/lametro/stops/6033/predictions/
```

The method that we would be looking for would be.

```javascript
metro.bus.stopsPredictions
```

The to get the lib to pass the correct id to the path we would just need to put it in the first option.

```javascript
metro.bus.stopsPredictions({id: 6033}, (err, res) => {
  if (err) return console.error(err)
  console.log(res)
})
```

This would make the api call to the predictions endpoint. The bus namespace is a clearer indication for the `lametro` agency in the endpoint. The idea behind is that there will eventually be a rails version that will bring back LA Metro rails times.

> All method names are made from the routes. If you are looking for a specific route try the method name that is closest to it.

### Missing info?

If there is something missing the setup is fairly easy to add in a missing endpoint, so if your missing something please make a PR adding the route
