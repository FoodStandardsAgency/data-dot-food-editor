# data-dot-food-editor change history

## 1.2.2 - 2021-01-12 (Bogdan)

- Fix for issue GH-108: validation was preventing adding an element with
  no download URL

## 1.2.1 - 2020-11-18 (Ian)

- change support link to new central email address

## 1.2.0 - 2020-11-17 (Ian)

- Created a new build process to deploy the app via an S3 bucket
- Rewrite of the README

## 1.1.5 - 2020-10-30 (Bogdan)

- Added an extra confirmation dialog on save in case the distribution link from
  an element is pasted from `csvlint.io`, `webarchive.nationalarchives.gov.uk`
  or from a `http://` website

## 1.1.4 - 2020-10-26 (Bogdan)

- Removed old unit tests and configs. Added new unit tests based on the old ones
  that use Jest as a framework and Vue Test Utils to run

## 1.1.3 - 2020-10-21 (Bogdan)

- Added a loading message on the reports page to indicate to the user that the
  pie chart is loading, and some small visual changes

## 1.1.2 - 2020-10-21 (Bogdan)

- Added validation of the login form inputs

## 1.1.1 - 2020-10-20 (Bogdan)

- Added a fix for keywords and activities dropdowns; the bug was caused by
  updating the dependecies. It should now work as intended

## 1.1.0 - 2020-10-16 (Bogdan)

- Added a help page and a link to it in the navigation bar. It's currently just
  a draft and future updates to it are required to make it relevant

## 1.0.6 - 2020-10-16 (Bogdan)

- Replaced the FSA support email address with a more specific one

## 1.0.5 - 2020-10-14 (Bogdan)

- Updated all dependencies, this resulted in the removal of a lot of boilerplate
  config files, as well as some code changes
