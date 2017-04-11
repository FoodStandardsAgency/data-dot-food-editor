# dataset-browse

> Dataset Catalog editor front-end
Based on Vue.js

This code can be genericised but is currently minimally using the FSA livery.

It's an SPA so runs inside the users browser. Minimal state is kept as a login cookie.

The code is laid out as a MVC app with little shared state.

Testing in Vue has been problematic and so sadly aren't implemented.

The app relies on having a back-end Cairn server running to deal with API calls. To do this it runs a forwarding proxy to `localhost:8080`. Run a CairnJ instance on this port.

If the SPA needs to be run on an alternative port use `PORT=8081 npm run dev`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
