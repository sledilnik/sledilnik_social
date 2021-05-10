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
  },
  labTests35: {
    hasHoverIndex: true,
    days: return35,
    tsName: 'labTests',
  },
};

export default {
  MetricsComparison: {
    name: 'MetricsComparison',
    text: 'Stanje COVID-19 v Sloveniji',
  },
  DailyComparison: {
    name: 'DailyComparison',
    text: 'Primerjava po dnevih v tednu',
    customCharts: {
      casesConfirmedTooltip: {
        name: 'casesConfirmedTooltip',
        text: 'Potrjeni',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      casesActiveTooltip: {
        name: 'casesActiveTooltip',
        text: 'Aktivni',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      performedPCRTooltip: {
        name: 'performedPCRTooltip',
        text: 'Testi: PCR',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      sharePCRTooltip: {
        name: 'sharePCRTooltip',
        text: 'Delež pozitivnih: PCR',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      testsHATTooltip: {
        name: 'testsHATTooltip',
        text: 'Testi: HAT',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      vaccinesUsedTooltip: {
        name: 'vaccinesUsedTooltip',
        text: 'Uporabljeni odmerki cepiva',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      admittedHospitalsTooltip: {
        name: 'admittedHospitalsTooltip',
        text: 'Sprejeti v bonišnico',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      dischargedHospitalsTooltip: {
        name: 'dischargedHospitalsTooltip',
        text: 'Odpuščeni iz bolnišnice',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      admittedICUTooltip: {
        name: 'admittedICUTooltip',
        text: 'Sprejeti v intenzivno',
        ...CUSTOM_CHART_OPTIONS.labTests35,
      },
      deceasedTooltip: {
        name: 'deceasedTooltip',
        text: 'Umrli',
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
      absolute1Day: {
        name: 'absolute1Day',
        text: 'Absolutno - 1d',
        hasHoverIndex: false,
      },
      distribution1Day: {
        name: 'distribution1Day',
        text: 'Porazdelitev - 1d',
        hasHoverIndex: false,
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
        name: 'posavskaSortByLast',
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
      twoMonthsNewCasesTooltip: {
        name: 'twoMonthsNewCasesTooltip',
        text: 'Novi primeri - 2m',
        hasHoverIndex: true,
        days: return2Months,
        tsName: 'cases',
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
