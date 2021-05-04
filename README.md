# Sledilnik Social

Basic API extraction to serve Sledilnik's API data in a Social media form.

## ver 0.5.0

Two new tabs: 'Posnetki' in 'Grafi'.

Add Covid-10 Sledilnik chart and card screenshots. Screenshots are created with [sledilnik-screnshots AWS Lambda Function](https://github.com/jalezi/sledilnik-screenshots).

In tabs 'LAB' are 'HOS' are links (icon: 'file-download'). Clicking on link will download screenshot. Those screenshots are made with [SledilnikScreenshots AWS Lambda Function](https://github.com/VesterDe/SledilnikScreenshots).

### 'Posnetki' tab

Screenshots are stored in browser local storage `base64` encoded. If local storage value is `null` then it will call [sledilnik-screnshots AWS Lambda Function](https://github.com/jalezi/sledilnik-screenshots).

Clicking on `image` should start download.
Clicking on `button` 'Prenesi ZIP' should `zip` all `images` and download `zip` file.

We are also storing last [timestamp](https://github.com/sledilnik/data/blob/master/csv/stats.csv.timestamp). If `timestamp` is old then we re-fetch all screenshots.

### 'Grafi' tab

At the bottom of the page is `iframe` with selected [`chart`](https://github.com/sledilnik/website/blob/master/examples/README.md).

Select your choice and click `button` 'Naredi posnetek grafa'.

Clicking on `button` will call [SledilnikScreenshots AWS Lambda Function](https://github.com/VesterDe/SledilnikScreenshots). Clicking on `image` should start download.

Those screenshots are not stored in local storage.

## ver 0.4.0

Endpoints for data fetch are set in `urlDict.js`.

### New Features

- show only one post at the time
- timestamps contexts
- data context
- social context
- count characters for twitter with twitter-text package
- weekly growth per town
- toggle Municipalities icons show/hide
- toggle show trend weekly growth/15d trend
- show social and in ToClipboard

### Data

#### Endpoint: `/summary`

1. PCR
   - `.testsToday`
     - `.value`
     - `.subValues.positive`
     - `.subValues.percent`
2. HAT
   - `.testsTodayHAT`
     - `.value`
     - `.subValues.positive`
     - `.subValues.percent`
3. ActiveCases
   - `.casesActive`
     - `value`
     - `.subValues.in`
     - `.subValues.out`
4. Vaccination
   - `.vaccinationSummary`
     - `.value`
     - `.subValues.in`
5. ConfirmedToDate
   - `.casesToDateSummary`
     - `.value`

#### Endpoint: `/patients`

1. Hospitalized
   - `.total.inHospital` & `.total.icu`
     - `.today`
     - `.in`
     - `.out`
2. OnRespiratory
   - `.total.critical` & `.total.niv`
     - `.today`
3. Care
   - `.total.care`
     - `today`
     - `.in`
     - `.out`
4. Deceased
   - `.total.deceased`
     - `.today`
     - `.toDate`
5. InHospitals
   - `.facilities[code]`
     - `.inHospital` & `.icu`
       - `.today`
       - `.in`
       - `.out`

#### Endpoint: `/stats`

1. PerAge
   - `statePerAgeToDate`

#### Endpoint: `/municipalities`

1. Municipalities
   - `.regions[region][town].confirmedToDate;`
