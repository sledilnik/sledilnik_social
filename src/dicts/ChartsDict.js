const CHART_BASE_URL = 'https://covid-19.sledilnik.org/embed.html#/chart/';

export const getChartUrl = name => `${CHART_BASE_URL}${name}`;

export default {
  IcuPatients: {
    name: 'IcuPatients',
  },
  Patients: {
    name: 'Patients',
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
  Map: {
    name: 'Map',
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
