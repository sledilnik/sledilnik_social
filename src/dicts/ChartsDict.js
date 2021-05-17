import { differenceInDays, addMonths } from 'date-fns';
const CHART_BASE_URL = 'https://covid-19.sledilnik.org/embed.html#/chart/';

const getDaysDiffOnDifferentMonth = (
  monthsToAdd = 1,
  dateLeft = new Date()
) => {
  const dateRight = addMonths(dateLeft, monthsToAdd);
  return differenceInDays(dateLeft, dateRight) + 1;
};

const return2Months = () => getDaysDiffOnDifferentMonth(-2);
const return35 = () => 35;

export const getChartUrl = name => `${CHART_BASE_URL}${name}`;

const CUSTOM_CHART_OPTIONS = {
  patients2Months: {
    hasHoverIndex: true,
    days: return2Months,
    tsName: 'patients',
    defaultValuesKey: 'days',
    labelText: 'Datum',
  },
  labTests35: {
    hasHoverIndex: true,
    days: return35,
    tsName: 'labTests',
    defaultValuesKey: 'days',
    labelText: 'Datum',
  },
  twoMonthsNewCasesTooltip: {
    hasHoverIndex: true,
    days: return2Months,
    tsName: 'cases',
    defaultValuesKey: 'days',
    labelText: 'Datum',
  },
  municipality: {
    hasHoverIndex: true,
    municipalities: true,
    defaultValuesKey: 'municipalities',
    labelText: 'Občina',
  },
};

export default {
  MetricsComparison: {
    name: 'MetricsComparison',
    text: 'Stanje COVID-19 v Sloveniji',
    customCharts: {
      casesConfirmed7DaysAvgFourMonths: {
        name: 'casesConfirmed7DaysAvgFourMonths',
        text: 'Potrjeni - 7dni povprečje - 4m',
        shortText: 'Potrjeni - 7dAVG - 4m',
      },
    },
  },
  DailyComparison: {
    name: 'DailyComparison',
    text: 'Primerjava po dnevih v tednu',
    customCharts: {
      casesConfirmed: {
        name: 'casesConfirmed',
        text: 'Potrjeni',
      },
      casesConfirmedTooltip: {
        name: 'casesConfirmedTooltip',
        text: 'Potrjeni - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      casesActive: {
        name: 'casesActive',
        text: 'Aktivni',
      },
      casesActiveTooltip: {
        name: 'casesActiveTooltip',
        text: 'Aktivni - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      performedPCR: {
        name: 'performedPCR',
        text: 'Testi: PCR',
      },
      performedPCRTooltip: {
        name: 'performedPCRTooltip',
        text: 'Testi: PCR - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      sharePCR: {
        name: 'sharePCR',
        text: 'Delež pozitivnih: PCR',
      },
      sharePCRTooltip: {
        name: 'sharePCRTooltip',
        text: 'Delež pozitivnih: PCR - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      testsHAT: {
        name: 'testsHAT',
        text: 'Testi: HAT',
      },
      testsHATTooltip: {
        name: 'testsHATTooltip',
        text: 'Testi: HAT - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      vaccinesUsed: {
        name: 'vaccinesUsed',
        text: 'Uporabljeni odmerki cepiva',
      },
      vaccinesUsedTooltip: {
        name: 'vaccinesUsedTooltip',
        text: 'Uporabljeni odmerki cepiva - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      admittedHospitalsTooltip: {
        name: 'admittedHospitalsTooltip',
        text: 'Sprejeti v bonišnico - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      dischargedHospitalsTooltip: {
        name: 'dischargedHospitalsTooltip',
        text: 'Odpuščeni iz bolnišnice - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      admittedICUTooltip: {
        name: 'admittedICUTooltip',
        text: 'Sprejeti v intenzivno - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      deceasedTooltip: {
        name: 'deceasedTooltip',
        text: 'Umrli - datum',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
    },
  },
  Tests: {
    name: 'Tests',
    text: 'Testiranje',
  },
  Vaccination: {
    name: 'Vaccination',
    text: 'Cepljenje',
  },
  Regions100k: {
    name: 'Regions100k',
    text: 'Po regijah (na 100k prebivalcev)',
    shortText: 'Po regijah/100k',
    customCharts: {
      casesConfirmed7DayAvg: {
        name: 'casesConfirmed7DayAvg',
        text: 'Potrjeni primeri - Novi(7-dnevno povprečje)',
        shortText: 'Novi potrjeni -7dAVG',
      },
      casesConfirmedActive: {
        name: 'casesConfirmedActive',
        text: 'Potrjeni primeri - Aktivni',
        shortText: 'Aktivni potrjeni',
      },
      casesConfirmedAll: {
        name: 'casesConfirmedAll',
        text: 'Potrjeni primeri - Vsi',
        shortText: 'Vsi potrjeni',
      },
      vaccinated7DayAvg: {
        name: 'vaccinated7DayAvg',
        text: 'Cepljeni - Na dan(7-dnevno povprečje)',
        shortText: 'Cepljeni -7dAVG',
      },
      vaccinatedDose1: {
        name: 'vaccinatedDose1',
        text: 'Cepljeni - 1. odmerek',
      },
      vaccinatedDose2: {
        name: 'vaccinatedDose2',
        text: 'Cepljeni - 2. odmerek',
      },
      deceased: {
        name: 'deceased',
        text: 'Umrli',
      },
    },
  },
  Map: {
    name: 'Map',
    text: 'Zemljevid po občinah',
    customCharts: {
      weeklyGrowth: {
        name: 'weeklyGrowth',
        text: 'Tedenski prirast',
        hasHoverIndex: false,
      },
      weeklyGrowthTooltip: {
        name: 'weeklyGrowthTooltip',
        text: 'Tedenski prirast - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      absolute1Day: {
        name: 'absolute1Day',
        text: 'Absolutno - 1d',
        hasHoverIndex: false,
      },
      absolute1DayTooltip: {
        name: 'absolute1DayTooltip',
        text: 'Absolutno - 1d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      absolute7Days: {
        name: 'absolute7Days',
        text: 'Absolutno - 7d',
        hasHoverIndex: false,
      },
      absolute7DaysTooltip: {
        name: 'absolute7DaysTooltip',
        text: 'Absolutno - 7d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      populationShare1Day: {
        name: 'populationShare1Day',
        text: 'Delež prebivalstva - 1d',
        hasHoverIndex: false,
      },
      populationShare1DayTooltip: {
        name: 'populationShare1DayTooltip',
        text: 'Delež prebivalstva - 1d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      populationShare7Days: {
        name: 'populationShare7Days',
        text: 'Delež prebivalstva - 7d',
        hasHoverIndex: false,
      },
      populationShare7DaysTooltip: {
        name: 'populationShare7DaysTooltip',
        text: 'Delež prebivalstva - 7d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      distribution1Day: {
        name: 'distribution1Day',
        text: 'Porazdelitev - 1d',
        hasHoverIndex: false,
      },
      distribution1DayTooltip: {
        name: 'distribution1DayTooltip',
        text: 'Porazdelitev - 1d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      distribution7Days: {
        name: 'distribution7Days',
        text: 'Porazdelitev - 7d',
        hasHoverIndex: false,
      },
      distribution7DaysTooltip: {
        name: 'distribution7DaysTooltip',
        text: 'Porazdelitev - 7d - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      vaccinated1stPopulationShare: {
        name: 'vaccinated1stPopulationShare',
        text: 'Cepljeni - 1.odmerek - delež prebivalstva',
        shortText: '1.odmerek - delež preb.',
        hasHoverIndex: false,
      },
      vaccinated1stPopulationShareTooltip: {
        name: 'vaccinated1stPopulationShareTooltip',
        text: 'Cepljeni - 1.odmerek - delež prebivalstva - občina',
        shortText: '1.odmerek - delež preb - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      vaccinated1stAbsolute: {
        name: 'vaccinated1stAbsolute',
        text: 'Cepljeni - 1.odmerek - absolutno',
        shortText: '1.odmerek - absolutno',
        hasHoverIndex: false,
      },
      vaccinated1stAbsoluteTooltip: {
        name: 'vaccinated1stAbsoluteTooltip',
        text: 'Cepljeni - 1.odmerek - absolutno - občina',
        shortText: '1.odmerek - absolutno - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      vaccinated2ndPopulationShare: {
        name: 'vaccinated2ndPopulationShare',
        text: 'Cepljeni - 2.odmerek - delež prebivalstva',
        shortText: '2.odmerek - delež preb.',
        hasHoverIndex: false,
      },
      vaccinated2ndPopulationShareTooltip: {
        name: 'vaccinated2ndPopulationShareTooltip',
        text: 'Cepljeni - 2.odmerek - delež prebivalstva - občina',
        shortText: '2.odmerek - delež preb. - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
      vaccinated2ndAbsolute: {
        name: 'vaccinated2ndAbsolute',
        text: 'Cepljeni - 2.odmerek - absolutno',
        shortText: '2.odmerek - absolutno',
        hasHoverIndex: false,
      },
      vaccinated2ndAbsoluteTooltip: {
        name: 'vaccinated2ndAbsoluteTooltip',
        text: 'Cepljeni - 2.odmerek - absolutno - občina',
        shortText: '2.odmerek - absolutno - občina',
        ...CUSTOM_CHART_OPTIONS.municipality,
      },
    },
  },
  Municipalities: {
    name: 'Municipalities',
    text: 'Primeri po občinah',
    customCharts: {
      gorenjskaSortByLast: {
        name: 'gorenjskaSortByLast',
        text: 'Gorenjska - razvrsti po "Zadnji',
        shortText: 'Gorenjska ("Zadnji")',
      },
      goriskaSortByLast: {
        name: 'goriskaSortByLast',
        text: 'Goriška - razvrsti po "Zadnji',
        shortText: 'Goriška ("Zadnji")',
      },
      jvSlovenijaSortByLast: {
        name: 'jvSlovenijaSortByLast',
        text: 'Jugovzhodna Slovenija - razvrsti po "Zadnji',
        shortText: 'JV Slovenija ("Zadnji")',
      },
      koroskaSortByLast: {
        name: 'koroskaSortByLast',
        text: 'Koroška - razvrsti po "Zadnji',
        shortText: 'Koroška ("Zadnji")',
      },
      obalnoKraskaSortByLast: {
        name: 'obalnoKraskaSortByLast',
        text: 'Obalno-kraška - razvrsti po "Zadnji',
        shortText: 'Obalno-kraška ("Zadnji")',
      },
      osrednjeSlovenskaSortByLast: {
        name: 'osrednjeSlovenskaSortByLast',
        text: 'Osrednjeslovenska - razvrsti po "Zadnji',
        shortText: 'Osrednjeslovenska ("Zadnji")',
      },
      podravskaSortByLast: {
        name: 'podravskaSortByLast',
        text: 'Podravska - razvrsti po "Zadnji',
        shortText: 'Podravska ("Zadnji")',
      },
      pomurskaSortByLast: {
        name: 'pomurskaSortByLast',
        text: 'Pomurska - razvrsti po "Zadnji',
        shortText: 'Pomurska ("Zadnji")',
      },
      posavskaSortByLast: {
        name: 'posavskaSortByLast',
        text: 'Posavska - razvrsti po "Zadnji',
        shortText: 'Posavska ("Zadnji")',
      },
      primorskoNotranjskaSortByLast: {
        name: 'primorskoNotranjskaSortByLast',
        text: 'Primorsko-notranjska - razvrsti po "Zadnji',
        shortText: 'Primorsko-notranjska ("Zadnji")',
      },
      savinjskaSortByLast: {
        name: 'savinjskaSortByLast',
        text: 'Savinjska - razvrsti po "Zadnji',
        shortText: 'Savinjska ("Zadnji")',
      },
      zasavskaSortByLast: {
        name: 'zasavskaSortByLast',
        text: 'Zasavska - razvrsti po "Zadnji',
        shortText: 'Zasavska ("Zadnji")',
      },
    },
  },
  Sewage: {
    name: 'Sewage',
    text: 'Virus v odpadnih vodah',
  },
  Schools: {
    name: 'Schools',
    text: 'Primeri v šolah in vrtcih',
    customCharts: {
      activeAbsolutePupilsFourMonths: {
        name: 'activeAbsolutePupilsFourMonths',
        text: 'Aktivni - učenci - absolutno - 4m',
        shortText: 'Aktivni - učenci - abs - 4m',
      },
    },
  },
  SchoolStatus: {
    name: 'SchoolStatus',
    text: 'Primeri po šolah in vrtcih',
  },
  Patients: {
    name: 'Patients',
    text: 'Hospitalizirani',
    customCharts: {
      twoMonthsTooltip: {
        name: 'twoMonthsTooltip',
        text: 'Vse bolnišnice - 2m',
        ...CUSTOM_CHART_OPTIONS.patients2Months,
      },
    },
  },
  IcuPatients: {
    name: 'IcuPatients',
    text: 'Intenzivna terapija',
    customCharts: {
      twoMonthsTooltip: {
        name: 'twoMonthsTooltip',
        text: 'Vse bolnišnice - 2m',
        ...CUSTOM_CHART_OPTIONS.patients2Months,
      },
    },
  },
  CarePatients: {
    name: 'CarePatients',
    text: 'Negovalne bolnišnice',
  },
  AgeGroupsTimeline: {
    name: 'AgeGroupsTimeline',
    text: 'Potrjeni primeri po starostnih skupinah',
    shortText: 'Potrjeni po starostnih sk.',
    customCharts: {
      newCasesFourMonths: {
        name: 'newCasesFourMonths',
        text: 'Novi primeri - 4m',
      },
      newCasesRelativeFourMonths: {
        name: 'newCasesRelativeFourMonths',
        text: 'Novi primeri(relativno) - 4m',
      },
      twoMonthsNewCasesTooltip: {
        name: 'twoMonthsNewCasesTooltip',
        text: 'Novi primeri - 2m - datum',
        ...CUSTOM_CHART_OPTIONS.twoMonthsNewCasesTooltip,
      },
    },
  },
  WeeklyDemographics: {
    name: 'WeeklyDemographics',
    text: 'Demografija potrjenih primerov, tedensko',
    shortText: 'Demografija potrjenih, tedensko',
  },
  AgeGroups: {
    name: 'AgeGroups',
    text: 'Po starostnih skupinah',
  },
  MetricsCorrelation: {
    name: 'MetricsCorrelation',
    text: 'Soodvisnost primerov, hospitaliziranih in umrlih',
    shortText: 'Soodvisnost primerov, hosp. in umrlih',
  },
  Deceased: {
    name: 'Deceased',
    text: 'Umrli',
  },
  ExcessDeaths: {
    name: 'ExcessDeaths',
    text: 'Presežne smrti',
  },
  Infections: {
    name: 'Infections',
    text: 'Struktura potrjenih primerov',
  },
  HcCases: {
    name: 'HcCases',
    text: 'Primeri v zdravstvu in domovih za starejše občane, tedensko',
    shortText: 'Primeri v zdr. in DSO, tedensko',
  },
  EuropeMap: {
    name: 'EuropeMap',
    text: 'Stanje COVID-19 v Evropi',
  },
  Sources: {
    name: 'Sources',
    text: 'Viri in lokacije okužb, tedensko',
  },
  Cases: {
    name: 'Cases',
    text: 'Potrjeni primeri',
  },
  RegionMap: {
    name: 'RegionMap',
    text: 'Zemljevid po regijah',
  },
  Regions: {
    name: 'Regions',
    text: 'Po regijah',
  },
  PhaseDiagram: {
    name: 'PhaseDiagram',
    text: 'Fazni diagram',
  },
  Spread: {
    name: 'Spread',
    text: 'Prirast potrjenih primerov',
  },
  WorldMap: {
    name: 'WorldMap',
    text: 'Stanje COVID-19 v Svetu',
    noShow: true,
  },
  Ratios: {
    name: 'Ratios',
    text: 'Delež resnih primerov',
    noShow: true,
  },
  HCenters: {
    name: 'HCenters',
    text: 'Obravnava v ZD',
    noShow: true,
  },
};
