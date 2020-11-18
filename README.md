# FSA Data Catalog Editor

This project allows the users to add or edit datasets for the data catalogue on
[data.food.gov.uk](https://data.food.gov.uk/catalog). Each dataset has one or
more elements, which are subsets of the dataset by some theme (eg. data from a
certain period of time). The app uses [VueJS](https://vuejs.org) as the main
framework and was created via [Vue CLI](https://cli.vuejs.org/).

## Developer notes

To install and build the app locally:

```shell
git clone git@github.com:FoodStandardsAgency/data-dot-food-editor.git
yarn install
```

If the app is running in production mode, it will need a local API with the following:

- `/catalog/editor/` as a base endpoint for requests such as datasets, elements,
  keywords, directorates, activities, license, publish, etc.
- `/catalog/system/security/` as a security endpoint for requests such as
  getLoggedInUser, login, logout, etc.
- `/catalog-editor/static/api/Datatypes.json` as an endpoint for datatypes

If the app is running in development mode, all requests to the API will be
proxied to the [dev server](https://fsa-dev-catalog-editor.epimorphics.net).
The proxy configuration is managed by `vue.config.js`.

To compile and serve the app locally, with and hot-reloads for development:

```shell
yarn serve
```

### Testing and linting

Unit tests are written in Jest. We need to increase test coverage.

```shell
yarn test:unit
```

Linting is by eslint using Standard-JS configuration:

```shell
yarn lint
```

### Issues

Issues for this editor are maintained on the coordinating repo for all data.food
activities:
[github.com/FoodStandardsAgency/data-dot-food/issues](https://github.com/FoodStandardsAgency/data-dot-food/issues).

Issues **should** be referenced from commits using the full Github linking syntax:

```text
FoodStandardsAgency/data-dot-food#issue-number
```

e.g:

```text
FoodStandardsAgency/data-dot-food#42
```


### Releases

For each release, ensure you:

- increment the version in `package.json` according to semver principles, and
- update the [CHANGELOG](CHANGELOG.md) to record the changes

### Deployment

The app is deployed by building the production deployment artefact
(`data-dot-food-editor.tgz`), pushing that to an S3 bucket corresponding
to the desired deployment environment (`dev`, `staging`, `production`)
and then initiating a DMS configuration update via the
[DMS control panel](https://fsa-controller.epimorphics.net/). Apart
from the final DMS step, all of the preceding build steps are scripted:

```shell
yarn deploy:dev
yarn deploy:staging
yarn deploy:production
```
