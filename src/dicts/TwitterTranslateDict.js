export const TWSummaryDict = {
  testsToday: [
    { prefix: 'PCR: ' },
    { dataKeys: ['subValues', 'positive'], formatType: 'sign' },
    { prefix: ', testiranih: ' },
    { dataKeys: ['value'] },
    { prefix: ', delež pozitivnih: ' },
    { dataKeys: ['subValues', 'percent'], formatType: 'percent', divide: 100 },
    { prefix: '' },
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
};

export const TWPatientsDict = {
  hospitalized: [
    { prefix: 'Hospitalizirani: ' },
    { dataKeys: ['0', 'total', 'inHospital', 'today'] },
    { prefix: '' },
    {
      prefix: '(',
      dataKeys: ['0', 'total', 'inHospital', 'in'],
      suffix: ',',
      formatType: 'sign',
    },
    {
      dataKeys: ['0', 'total', 'inHospital', 'out'],
      suffix: ')',
      formatType: 'sign',
      negative: true,
    },
    { prefix: ', EIT: ' },
    { dataKeys: ['0', 'total', 'icu', 'today'] },
    {
      prefix: '(',
      dataKeys: ['total', 'icu', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ')',
      formatType: 'sign',
    },
    { prefix: '.' },
  ],
  onRespiratory: [
    { prefix: 'Respirator ' },
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
    { prefix: ' intubirani ' },
    { dataKeys: ['0', 'total', 'critical', 'today'] },
    {
      prefix: '(',
      dataKeys: ['total', 'critical', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ')',
      formatType: 'sign',
    },
    { prefix: ' neinvazivno ' },
    { dataKeys: ['0', 'total', 'niv', 'today'] },
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
    { prefix: 'Negovalne b.: ' },
    { dataKeys: ['0', 'total', 'care', 'today'] },
    { prefix: ' ' },
    {
      prefix: '( ',
      dataKeys: ['0', 'total', 'care', 'in'],
      suffix: ',',
      formatType: 'sign',
    },
    {
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
};
