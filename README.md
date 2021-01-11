# Sledilnik Social

Basic API extraction to serve Sledilnik's API data in a Social media form.

## ver: 0.2.0

Endpoints for data fetch are set apiPathObject.js

### API Paths

- stats
- patients
- municipalities
- hospitals-list
- lab-tests
- summary

### Components

There are 3 main components: `<TESTS_ACTIVE>`, `<HOSPITALIZED_DECEASED>` and `<Combined>`

## ver: 0.1.0

- APIs are set in App.js
- ./components/List.js - parse data
  - if you want to disable "Moralec" comment out RandomGenerator start and end
  - there are subcomponents for Delta and Percentage
- municipalities have a complex algorithm, check Array
