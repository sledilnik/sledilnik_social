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
  Vaccinations: {
    name: 'Vaccinations',
    text: 'Cepljenje',
  },
  Regions100k: {
    name: 'Regions100k',
    text: 'Primeri po regijah (na 100k prebivalcev)',
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
  },
  AgeGroups: {
    name: 'AgeGroups',
    text: 'Po starostnih skupinah',
  },
  MetricsCorrelation: {
    name: 'MetricsCorrelation',
    text: 'Soodvisnost primerov, hospitaliziranih in umrlih',
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
    text: 'Primeri po regijah',
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
