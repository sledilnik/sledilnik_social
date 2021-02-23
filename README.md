# Sledilnik Social

Basic API extraction to serve Sledilnik's API data in a Social media form.

## ver 0.4.0

Endpoints for data fetch are set in `urlDict.js`.

### New Features

### Data

#### Endpoints

##### summary

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

##### patients

1. Hospitalized
   - `.total.inHospital` & `.total.niv`
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

##### stats

1. PerAge
   - `statePerAgeToDate`

##### municipalities

1. Municipalities
   - `.regions[region][town].confirmedToDate;`
