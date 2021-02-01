# Sledilnik Social

Basic API extraction to serve Sledilnik's API data in a Social media form.

## ver: 0.3.0

Endpoints for data fetch are set in `urlDict.js`.

### New Features

- Displaying data as it is fetched.
- Refresh each post separately.
- Simple text editor with option to trim redundant new lines before posting on social media.
- Twitter #Covid-19 button
- Switch between Facebook and Twitter icons.
- Show/Hide ratio trend check.

## ver: 0.2.1

Endpoints for data fetch are set in `apiPathObject.js`.

### API Paths

- stats
- patients
- municipalities
- hospitals-list
- lab-tests
- summary

### Data

- Today: `array.slice(-1)`
- Yesterday: `array.slice(-2, -1)`
- Two days ago: `array.slice(-3, -2)`

#### Test and active cases

Component: `<TESTS_ACTIVE/>`:

1. PCR tests `<PercentageRow/>`:
   - Today:
     - `/lab-tests.data`
       - `.regular.positive.today`
       - `.regular.performed.today`
2. HAT tests `<PercentageRow/>`:
   - Today:
     - `/lab-tests.data`
       - `.hagt.positive.today`
       - `.hagt.performed.today`
3. Active cases:
   - Today:
   - `/summary.casesActive.value`
   - `/summary.casesActive.subValues`
     - `.in`
     - `.out`

#### Hospitalized and deceased (HOS)

Component: `<HOSPITALIZED_DECEASED/>`:

1. Hospitalized `<Hospitalized/>`:

   - Today:
     - `/patients.total.inHospital`
       - `.today`
       - `.in`
       - `.put`
     - `/patients.total.icu.today`
   - Yesterday:
     - `/patients.total.icu.today`

2. On respiratory `<OnRespiratory/>`:
   - Today & Yesterday:
     - `/patients.total.critical.today`
     - `/patients.total.niv.today`
3. InCare `<InCare/>`:
   - Today:
     - `/patients.total.care`
       - `.today`
       - `.in`
       - `.out`
4. Deceased `<Deceased/>`:
   - `/patients.total.deceased`
     - `.today`
     - `.toDate`

Combined `<Combined/>`

1. [Test and active cases](####Test-and-active-cases)
2. Vaccination `<Vaccination/>`

   - Yesterday:
     - `/stats.vaccination.administrated.toDate`
     - `/stats.vaccination.administrated2nd.toDate`

3. Comfirmed `<Comfirmed/>`
   - Yesterday:
     - `/stats.vaccination.cases.confirmedToDate`
4. Per age `<PerAge/>`
   - Yesterday & Two days ago:
     - `/stats.statePerAgeToDate`
5. [Hospitalized and deceased (HOS)](<####Hospitalized-and-deceased-(HOS)>)
6. By hospitals `<InHospitals/>`
   - Today:
     - `/patients.facilities`
     - `/hospital-list`
     - `/patients.facilities[<code>]`
       - `.inHospital` & `.icu`
         - `.today`
         - `.in`
         - `.out`
7. By cities `<CITIES_SOCIAL_FRIENDLY/>`
   - For 16 Days:
     - `/municipalities.regions`
     - `/municipalities.regions[region][town].confirmedToDate;`

---

### Components

### Main

There are 3 main components: `<TESTS_ACTIVE>`, `<HOSPITALIZED_DECEASED>` and `<Combined>`

#### TESTS_ACTIVE

Display 3 sets of data:

1. PCR tests.
2. HAT tests.
3. Active cases:

Tests data includes: positive, performed and percentage.
Active cases: total, increased and decreased.

#### HOSPITALIZED_DECEASED

Display 3 sets of data:

1. How many persons need hospital treatment.
2. How many person are on respirators.
3. Number of deceased.

#### Combined

1. Data in TESTS_ACTIVE.
2. Vaccination.
3. Confirmed.
4. Segments per age.
5. Data in HOSPITALIZED_DECEASED
6. Number of patients in hospitals by hospital.
7. Data by municipalities with social friendly icons (Facebook, Twitter) for each social platform.

---

## ver: 0.1.0

- APIs are set in App.js
- ./components/List.js - parse data
  - if you want to disable "Moralec" comment out RandomGenerator start and end
  - there are subcomponents for Delta and Percentage
- municipalities have a complex algorithm, check Array

```

```
