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

export default {
  IcuPatients: {
    name: 'IcuPatients',
    text: 'Intenzivna terapija',
    customCharts: {
      twoMonthsTooltip: {
        name: 'twoMonthsTooltip',
        text: 'Vse bolnišnice - 2m',
        hasHoverIndex: true,
        days: return2Months,
        tsName: 'patients',
      },
    },
  },
  Patients: {
    name: 'Patients',
    text: 'Hospitalizirani',
    customCharts: {
      twoMonthsTooltip: {
        name: 'twoMonthsTooltip',
        text: 'Vse bolnišnice - 2m',
        hasHoverIndex: true,
        days: return2Months,
        tsName: 'patients',
      },
    },
  },

  DailyComparison: {
    name: 'DailyComparison',
    text: 'Primerjava po dnevih v tednu',
    customCharts: {
      casesConfirmedTooltip: {
        name: 'casesConfirmedTooltip',
        text: 'Potrjeni',
        hasHoverIndex: true,
        days: return35,
        tsName: 'labTests',
      },
      casesActiveTooltip: {
        name: 'casesActiveTooltip',
        text: 'Aktivni',
        hasHoverIndex: true,
        days: return35,
        tsName: 'labTests',
      },
      performedPCRTooltip: {
        name: 'performedPCRTooltip',
        text: 'Testi: PCR',
        hasHoverIndex: true,
        days: return35,
        tsName: 'labTests',
      },
      sharePCRTooltip: {
        name: 'sharePCRTooltip',
        text: 'Delež pozitivnih: PCR',
        hasHoverIndex: true,
        days: return35,
        tsName: 'labTests',
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
  MetricsComparison: {
    name: 'MetricsComparison',
    text: 'Stanje COVID-19 v Sloveniji',
  },
  EuropeMap: {
    name: 'EuropeMap',
    text: 'Stanje COVID-19 v Evropi',
  },
  WorldMap: {
    name: 'WorldMap',
    text: 'Stanje COVID-19 v Svetu',
  },
  CarePatients: {
    name: 'CarePatients',
    text: 'Negovalne bolnišnice',
  },
  Ratios: {
    name: 'Ratios',
    text: 'Delež resnih primerov',
  },
  Tests: {
    name: 'Tests',
    text: 'Testiranje',
  },
  HCenters: {
    name: 'HCenters',
    text: 'Obravnava v ZD',
    noShow: true,
  },
  Cases: {
    name: 'Cases',
    text: 'Potrjeni primeri',
  },
  Spread: {
    name: 'Spread',
    text: 'Prirast potrjenih primerov',
  },
  Infections: {
    name: 'Infections',
    text: 'Struktura potrjenih primerov',
  },
  Regions: {
    name: 'Regions',
    text: 'Primeri po regijah',
  },
  RegionMap: {
    name: 'RegionMap',
    text: 'Zemljevid po regijah',
  },
  Municipalities: {
    name: 'Municipalities',
    text: 'Primeri po občinah',
  },
  SchoolStatus: {
    name: 'SchoolStatus',
    text: 'Primeri po šolah in vrtcih',
  },
  AgeGroups: {
    name: 'AgeGroups',
    text: 'Po starostnih skupinah',
  },
  PhaseDiagram: {
    name: 'PhaseDiagram',
    text: 'Fazni diagram',
  },
  Sources: {
    name: 'Sources',
    text: 'Viri in lokacije okužb, tedensko',
  },
  HcCases: {
    name: 'HcCases',
    text: 'Primeri v zdravstvu in domovih za starejše občane, tedensko',
  },
  ExcessDeaths: {
    name: 'ExcessDeaths',
    text: 'Presežne smrti',
  },
  Deceased: {
    name: 'Deceased',
    text: 'Umrli',
  },
  MetricsCorrelation: {
    name: 'MetricsCorrelation',
    text: 'Soodvisnost primerov, hospitaliziranih in umrlih',
  },
  WeeklyDemographics: {
    name: 'WeeklyDemographics',
    text: 'Demografija potrjenih primerov, tedensko',
  },
  Schools: {
    name: 'Schools',
    text: 'Primeri v šolah in vrtcih',
  },
  Sewage: {
    name: 'Sewage',
    text: 'Virus v odpadnih vodah',
  },
};
