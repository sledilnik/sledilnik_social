export const FBSummaryDict = {
  testsToday: [
    { prefix: 'PCR: ' },
    { dataKeys: ['subValues', 'positive'], formatType: 'sign' },
    { prefix: ', testiranih: ' },
    { dataKeys: ['value'] },
    { prefix: ', delež pozitivnih: ' },
    { dataKeys: ['subValues', 'percent'], formatType: 'percent', divide: 100 },
    { prefix: '.' },
  ],
  testsTodayHAT: [
    { prefix: 'HAT: ' },
    { dataKeys: ['subValues', 'positive'], formatType: 'sign' },
    { prefix: ', testiranih: ' },
    { dataKeys: ['value'] },
    { prefix: ', delež pozitivnih: ' },
    { dataKeys: ['subValues', 'percent'], formatType: 'percent', divide: 100 },
    { prefix: '.' },
  ],
  casesActive: [
    { prefix: 'Aktivni primeri: ' },
    { dataKeys: ['value'] },
    {
      prefix: ' (',
      dataKeys: ['subValues', 'in'],
      suffix: ', ',
      formatType: 'sign',
    },
    {
      dataKeys: ['subValues', 'out'],
      suffix: ')',
      formatType: 'sign',
      negative: true,
    },
    { prefix: '.' },
  ],
  casesToDateSummary: [
    { prefix: 'Skupaj: ' },
    { dataKeys: ['value'] },
    { prefix: ' potrjenih primerov.' },
  ],
  vaccinationSummary: [
    { prefix: 'Cepljenih oseb: 💉' },
    { dataKeys: ['value'] },
    { prefix: ', 💉💉', dataKeys: ['subValues', 'in'], suffix: '.' },
  ],
};

export const FBPatientsDict = {
  hospitalized: [
    { prefix: 'Hospitalizirani: ' },
    { dataKeys: ['0', 'total', 'inHospital', 'today'] },
    {
      prefix: ' (',
      dataKeys: ['0', 'total', 'inHospital', 'in'],
      formatType: 'sign',
    },
    { prefix: ', ' },
    {
      prefix: '',
      dataKeys: ['0', 'total', 'inHospital', 'out'],
      suffix: ')',
      formatType: 'sign',
      negative: true,
    },
    { prefix: ', EIT: ' },
    { dataKeys: ['0', 'total', 'icu', 'today'] },
    {
      prefix: ' (',
      dataKeys: ['total', 'icu', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ')',
      formatType: 'sign',
    },
    { prefix: '.' },
  ],
  onRespiratory: [
    { prefix: 'Na respiratorju: ' },
    {
      dataKeys: ['total'],
      calculate: {
        what: 'sum',
        dataKeys: [
          ['critical', 'today'],
          ['niv', 'today'],
        ],
      },
    },
    { prefix: ', intubirani: ' },
    { dataKeys: ['0', 'total', 'critical', 'today'], suffix: ' ' },
    { prefix: ' ' },
    {
      prefix: '(',
      dataKeys: ['total', 'critical', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ')',
      formatType: 'sign',
    },
    { prefix: ', neinvazivno: ' },
    {
      dataKeys: ['0', 'total', 'niv', 'today'],
    },
    { prefix: ' ' },
    {
      prefix: '(',
      dataKeys: ['total', 'niv', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ')',
      formatType: 'sign',
    },
    { prefix: '.' },
  ],
  care: [
    { prefix: 'Negovalne bolnišnice: ' },
    { dataKeys: ['0', 'total', 'care', 'today'] },
    { prefix: ' ' },
    {
      prefix: '( ',
      dataKeys: ['0', 'total', 'care', 'in'],
      suffix: ', ',
      formatType: 'sign',
    },
    {
      prefix: '',
      dataKeys: ['0', 'total', 'care', 'out'],
      suffix: ')',
      formatType: 'sign',
      negative: true,
    },
    { prefix: '.' },
  ],
  deceased: [
    { prefix: 'Umrli: ' },
    { dataKeys: ['0', 'total', 'deceased', 'today'], formatType: 'sign' },
    { prefix: ', skupaj: ' },
    { dataKeys: ['0', 'total', 'deceased', 'toDate'] },
    { prefix: '.' },
  ],
  inHospitals: [{ prefix: 'Stanje po bolnišnicah:' }],
};

const perAge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, item) => {
  acc = [
    ...acc,
    { dataKeys: ['0', 'statePerAgeToDate', item, 'ageFrom'], style: null },
    { prefix: item === 9 ? '' : '-' },
    item === 9
      ? { prefix: '+' }
      : { dataKeys: ['0', 'statePerAgeToDate', item, 'ageTo'], style: null },
    { prefix: ' ' },
    {
      prefix: '(',
      dataKeys: ['allToDate'],
      calculate: {
        what: 'diff',
        indexArray: [
          ['1', 'statePerAgeToDate', item],
          ['2', 'statePerAgeToDate', item],
        ],
      },
      suffix: ')',
    },
    { prefix: item === 9 ? '.' : ', ' },
  ];
  return acc;
}, []);
export const FBStatsDict = {
  statePerAgeToDate: [{ prefix: 'Potrjeni primeri po starosti: ' }, ...perAge],
};

export const FBMunicipalitiesDict = {
  perCityTrend: [{ prefix: 'Po krajih:' }],
};
