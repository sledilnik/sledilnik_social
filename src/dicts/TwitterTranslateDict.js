export const TWPatientsDict = {
  hospitalized: [
    {
      prefix: 'Hospitalizirani: ',
      dataKeys: ['0', 'total', 'inHospital', 'today'],
      suffix: '',
    },
    {
      prefix: '(',
      dataKeys: ['0', 'total', 'inHospital', 'in'],
      suffix: ',',
      formatType: 'sign',
    },
    {
      prefix: '',
      dataKeys: ['0', 'total', 'inHospital', 'out'],
      suffix: '), ',
      formatType: 'sign',
      negative: true,
    },
    {
      prefix: 'EIT: ',
      dataKeys: ['0', 'total', 'icu', 'today'],
      suffix: '',
    },
    {
      prefix: '(',
      dataKeys: ['total', 'icu', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ').',
      formatType: 'sign',
    },
  ],
  onRespiratory: [
    {
      prefix: 'Respirator ',
      dataKeys: ['total'],
      calculate: {
        what: 'sum',
        dataKeys: [
          ['critical', 'today'],
          ['niv', 'today'],
        ],
      },
      suffix: ' ',
    },
    {
      prefix: 'intubirani ',
      dataKeys: ['0', 'total', 'critical', 'today'],
      suffix: '',
    },
    {
      prefix: '(',
      dataKeys: ['total', 'critical', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ') ',
      formatType: 'sign',
    },
    {
      prefix: 'neinvazivno ',
      dataKeys: ['0', 'total', 'niv', 'today'],
      suffix: '',
    },
    {
      prefix: '(',
      dataKeys: ['total', 'niv', 'today'],
      calculate: { what: 'diff', indexArray: [0, 1] },
      suffix: ').',
      formatType: 'sign',
    },
  ],
  care: [
    {
      prefix: 'Negovalne b.: ',
      dataKeys: ['0', 'total', 'care', 'today'],
      suffix: ' ',
    },
    {
      prefix: '( ',
      dataKeys: ['0', 'total', 'care', 'in'],
      suffix: ',',
      formatType: 'sign',
    },
    {
      prefix: '',
      dataKeys: ['0', 'total', 'care', 'out'],
      suffix: ').',
      formatType: 'sign',
      negative: true,
    },
  ],
  deceased: [
    {
      prefix: 'Umrli: ',
      dataKeys: ['0', 'total', 'deceased', 'today'],
      suffix: ', ',
      formatType: 'sign',
    },
    {
      prefix: 'skupaj: ',
      dataKeys: ['0', 'total', 'deceased', 'toDate'],
      suffix: '.',
    },
  ],
};
