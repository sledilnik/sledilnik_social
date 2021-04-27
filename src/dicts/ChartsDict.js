const CHART_BASE_URL = 'https://covid-19.sledilnik.org/embed.html#/chart/';

export const getChartUrl = name => `${CHART_BASE_URL}${name}`;

export default {
  IcuPatients: {
    name: 'IcuPatients',
    customCharts: {
      twoMonthsTooltip: { hasHoverIndex: true, days: 60 },
    },
  },
  Patients: {
    name: 'Patients',
    customCharts: {
      twoMonthsTooltip: { hasHoverIndex: true, days: 60 },
    },
  },
  MetricsComparison: {
    name: 'MetricsComparison',
  },
  DailyComparison: {
    name: 'DailyComparison',
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
  Map: {
    name: 'Map',
    customCharts: {
      weeklyGrowth: { hasHoverIndex: false },
      absolute1Day: { hasHoverIndex: false },
      distribution1Day: { hasHoverIndex: false },
    },
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
  AgeGroupsTimeline: {
    name: 'AgeGroupsTimeline',
  },
};
