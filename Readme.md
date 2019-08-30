# Initiatives
Service A sends requests to Service B.

In this case, I own B and I don't own A, how can I ensure the connection is alive?

By monitoring the last activity of some route on Service B, if the last activity was 6 hours ago, then it attracts my attention.

# Examples 

## initialize
`const lem = require('lem')`

```
lemInstance = new lem.lem();
```

```
lemInstance = new lem.lem(
  null, 
  {
    include: {
      '/add': 10,
      '/minus': 10
    },
    exclude: [
      '/multiply',
      '/divide'
    ]
  },
  console.log);
```

```
<!-- in express/koa -->
app.use(lemInstance.register());
```

## router registeration options
by default, lemInstance monitor all routes for 6 hours by 

well, you can also try to pass a dedicated route monitor configuration file to control it
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
