# Initiatives
Service A sends requests to Service B.

In this case, I own B and I don't own A, how can I ensure the connection is alive?

By monitoring the last activity of some route on Service B, if the last activity was 6 hours ago, then this would attract my attention.

# Examples 

## initialize


```
const lem = require('lem')

lemInstance = new lem.lem();

<!-- OR -->

lemInstance = new lem.lem(
  null, 
  {
    include: {
      '/route1': 10,
      '/route2': 10
    },
    exclude: [
      '/route3',
      '/route4'
    ]
  },
  console.err);
```

```
<!-- in express/koa -->
app.use(lemInstance.register());
```

## route registeration options
by default, lemInstance monitor all routes for 6 hours

however, you can also try to pass a dedicated route monitor configuration file to control the behavior
```
{
  include: [
      {
        '/route1' : 60
      },
      {
        '/route2/subRoute1' : 3600
      },
      {
        '/route3/subRoute2' : 10
      }
  ],
  exclude: [
      '/route1',
      '/route2',
      '/route3',
  ]
}
```
and monitor is setup to check the `/route1` for 1min, `/route2/subRoute1` for 1h

# RoadMap
- [ ] trie implementation for route config
- [ ] test converage
- [ ] ...
