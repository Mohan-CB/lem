# Initiatives
Service A sends requests to Service B.

In this case, I own B and I don't own A, how can I ensure the connection is alive?

I monitor the last activity for Service B, if the last activity was 6 hours, then it attracts my attention.

# Examples 

## initialize
`let lemInstance = require('lem')`

## pass redis information
`lemInstance('redisConnectionInfo', routeRegisterationOption) || lemInstance(redisClient, routeRegisterationOption)`

## router registeration options
by default, lemInstance monitor all routes for 6 hours by `lemInstance(redisConnectionInfo)`
well, you can also try to pass a dedicated route monitor configuration file to control it
```json
{
  {
    'router1' : 3600000 // 1h
  },
  {
    'router2/subRoute1' : 86400000 // 1d
  },
  {
    'router3/subRoute/2' : 21600000 //6h
  }
}
```
and monitor is setup to check the router1 for 1h, router2/subRoute1 for 1d and router3/subRoute/2 for 6h respectively
