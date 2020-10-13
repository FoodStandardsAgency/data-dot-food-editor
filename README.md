# FSA Data Catalog Editor

This project allows the users to add or edit datasets for the data catalogue on
[data.food.gov.uk](https://data.food.gov.uk/catalog). Each dataset has one or
more elements, which are subsets of the dataset by some theme (eg. data from a
certain period of time). The app uses [VueJS](https://vuejs.org) as the main
framework and was created via [Vue CLI](https://cli.vuejs.org/).

If the app is running in production mode, it will need a local API with the following:

- `/catalog/editor/` as a base endpoint for requests such as datasets, elements,
  keywords, directorates, activities, license, publish, etc.
- `/catalog/system/security/` as a security endpoint for requests such as
  getLoggedInUser, login, logout, etc.
- `/catalog-editor/static/api/Datatypes.json` as an endpoint for datatypes

If the app is running in development mode, all requests to the API will be
proxied to `https://fsa-dev-catalog-editor.epimorphics.net`, which is the dev server.

Currently, tests may or may not work. They need a complete rewrite, using
updated dependencies.

## Project setup

```shell
yarn install
```

### Compiles and hot-reloads for development

```shell
yarn serve
```

### Compiles and minifies for production

```shell
yarn build
```

### Lints and fixes files

```shell
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
