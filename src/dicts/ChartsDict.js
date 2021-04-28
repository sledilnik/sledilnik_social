const CHART_BASE_URL = 'https://covid-19.sledilnik.org/embed.html#/chart/';

export const getChartUrl = name => `${CHART_BASE_URL}${name}`;

export default {
  IcuPatients: {
    name: 'IcuPatients',
    customCharts: {
      twoMonthsTooltip: { hasHoverIndex: true, days: 60, tsName: 'patients' },
    },
  },
  Patients: {
    name: 'Patients',
    customCharts: {
      twoMonthsTooltip: { hasHoverIndex: true, days: 60, tsName: 'patients' },
    },
  },

  DailyComparison: {
    name: 'DailyComparison',
    customCharts: {
      casesConfirmedTooltip: {
        hasHoverIndex: true,
        days: 35,
        tsName: 'labTests',
      },
      casesActiveTooltip: { hasHoverIndex: true, days: 35, tsName: 'labTests' },
      performedPCRTooltip: {
        hasHoverIndex: true,
        days: 35,
        tsName: 'labTests',
      },
      sharePCRTooltip: { hasHoverIndex: true, days: 35, tsName: 'labTests' },
    },
  },
  Map: {
    name: 'Map',
    customCharts: {
      weeklyGrowth: { hasHoverIndex: false },
      absolute1Day: { hasHoverIndex: false },
      distribution1Day: { hasHoverIndex: false },
    },
  },
  AgeGroupsTimeline: {
    name: 'AgeGroupsTimeline',
    customCharts: {
      twoMonthsNewCasesTooltip: {
        hasHoverIndex: true,
        days: 60,
        tsName: 'cases',
      },
    },
  },
  MetricsComparison: {
    name: 'MetricsComparison',
  },
  EuropeMap: {
    name: 'EuropeMap',
  },
  WorldMap: {
    name: 'WorldMap',
  },
  CarePatients: {
    name: 'CarePatients',
  },
  Ratios: {
    name: 'Ratios',
  },
  Tests: {
    name: 'Tests',
  },
  HCenters: {
    name: 'HCenters',
  },
  Cases: {
    name: 'Cases',
  },
  Spread: {
    name: 'Spread',
  },
  Infections: {
    name: 'Infections',
  },
  Regions: {
    name: 'Regions',
  },
  RegionMap: {
    name: 'RegionMap',
  },

  Municipalities: {
    name: 'Municipalities',
  },
  SchoolStatus: {
    name: 'SchoolStatus',
  },
  AgeGroups: {
    name: 'AgeGroups',
  },
};
