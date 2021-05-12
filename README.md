# Sledilnik Social

Basic API extraction to serve Sledilnik's API data in a Social media form.

## ver 0.5.0

Two new tabs: 'Posnetki' and 'Grafi'.

Add Covid-10 Sledilnik chart and card screenshots.
Screenshots are created with two different AWS lambda functions.

Screenshots in tabs 'Posnetki' and 'Grafi' are created with [sledilnik-screnshots AWS Lambda Function](https://github.com/jalezi/sledilnik-screenshots). Download will start by clicking on image.

Screenshots in tabs 'LAB' are 'HOS' are created with [SledilnikScreenshots AWS Lambda Function](https://github.com/VesterDe/SledilnikScreenshots). Download will start by clicking on appropriate icon.

### 'Posnetki' tab

Screenshots are stored in browser local storage `base64` encoded. If local storage value is `null` then it will call [sledilnik-screnshots AWS Lambda Function](https://github.com/jalezi/sledilnik-screenshots).

Clicking on `image` should start download.
Clicking on `button` 'Vse' should `zip` all `images` and download `zip` file.
Clicking on `button` 'Multi kartice', 'Grafi' or 'Kartice' should `zip` and download just images in each section.

We are also storing last [timestamp](https://github.com/sledilnik/data/blob/master/csv/stats.csv.timestamp). If `timestamp` is old then we re-fetch all screenshots.

### 'Grafi' tab

At the bottom of the page is `iframe` with selected [`chart`](https://github.com/sledilnik/website/blob/master/examples/README.md).

Select your choice and click `button` 'Naredi posnetek grafa'.

Clicking on `button` will call [SledilnikScreenshots AWS Lambda Function](https://github.com/VesterDe/SledilnikScreenshots). Clicking on `image` should start download.

Those screenshots are not stored in local storage.

#### Charts

##### Active

1. MetricsComparison
2. DailyComparison
3. Tests
4. Vaccinations
5. Regions100k
6. Map
7. Municipalities
8. Sewage
9. Schools
10. SchoolStatus
11. Patients
12. IcuPatients
13. CarePatients
14. AgeGroupsTimeline
15. WeeklyDemographic
16. AgeGroups
17. MetricsCorrelation
18. Deceased
19. ExcessDeaths
20. Infections
21. HcCases
22. EuropeMap
23. Sources
24. Cases
25. RegionMap
26. Regions
27. PhaseDiagram
28. Spread

##### Archived

1. WorldMap
2. Ratios
3. HCenters

#### Custom charts

- IcuPatients:
  - twoMonthsTooltip
- Patients:
  - twoMonthsTooltip
- DailyComparison:
  - casesConfirmedTooltip
  - casesActiveTooltip
  - performedPCRTooltip
  - sharePCRTooltip
  - testsHATTooltip
  - vaccinesUsedTooltip
  - admittedHospitalsTooltip
  - dischargedHospitalsTooltip
  - admittedICUTooltip
  - deceasedTooltip
- Regions100k:
  - casesConfirmed7DayAvg,
  - casesConfrimedActive,
  - casesConfirmedAll,
  - vaccinated7DayAvg
  - vaccinatedDose1
  - vaccinatedDose2
  - deceased
- Map:
  - weeklyGrowth
  - absolute1Day
  - populationsShare1Day
  - distribution1Day
  - absolute7Days
  - populationShare7Days
  - distribution7Days
  - weeklyGrowthTooltip
  - absolute1DayTooltip
  - populationShare1DayTooltip
  - distribution1DayTooltip
  - absolute7DaysTooltip
  - populationShare7DaysTooltip
  - distribution7DaysTooltip
  - vaccinated1stPopulationShare
  - vaccinated1stPopulationShareTooltip
  - vaccinated1stAbsolute
  - vaccinated1stAbsoluteTooltip
  - vaccinated2ndPopulationShare
  - vaccinated2ndPopulationShareTooltip
  - vaccinated2ndAbsolute
  - vaccinated2ndAbsoluteTooltip
- Municipalities:
  - gorenjskaSortByLast
  - goriskaSortByLast
  - jvSlovenijaSortByLast
  - koroskaSortByLast
  - obalnoKraskaSortByLast
  - osrednjeSlovenskaSortByLast
  - podravskaSortByLast
  - pomurskaSortByLast
  - posavskaSortByLast
  - primorskoNotranjskaSortByLast
  - savinjskaSortByLast
  - zasavskaSortByLast
- AgeGroupsTimeline:
  - twoMonthsNewCasesTooltip

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
