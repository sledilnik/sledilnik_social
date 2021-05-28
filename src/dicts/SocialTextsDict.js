const PCR = {
  FB: {
    default: {
      text1: 'PCR: ',
      text2: ', testiranih: ',
      text3: ', delež pozitivnih: ',
      text4: '.',
    },
    onlyValue: {
      text2: ' testiranih (*ni podatka o pozitivnih).',
      text3: '',
      text4: '',
    },
  },
  TW: {
    default: { text4: '' },
    onValue: {},
  },
};

const HAT = {
  FB: {
    default: {
      text1: 'HAT: ',
      text2: ', testiranih: ',
      text3: ', delež pozitivnih: ',
      text4: '.',
    },
    onlyValue: {
      text2: ' testiranih (*ni podatka o pozitivnih).',
      text3: '',
      text4: '',
    },
  },
  TW: {
    default: { text4: '' },
    onValue: {},
  },
};

const ActiveCases = {
  FB: {
    default: {
      text1: 'Aktivni primeri: ',
      text2: ' ',
      text3: '.',
    },
  },
  TW: {
    default: {},
  },
};

const Vaccination = {
  FB: {
    default: {
      text1: 'Cepljenih oseb: 💉',
      text2: ' ',
      text3: ', 💉💉',
      text4: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const ConfirmedToDate = {
  FB: {
    default: {
      text1: 'Skupaj: ',
      text2: '',
      text3: ' potrjenih primerov.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const Hospitalized = {
  FB: {
    default: {
      text1: 'Hospitalizirani: ',
      text2: ' ',
      text3: ', EIT: ',
      text4: ' ',
      text5: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const OnRespiratory = {
  FB: {
    default: {
      text1: 'Na respiratorju: ',
      text2: ', intubirani: ',
      text3: ' ',
      text4: ', neinvazivno: ',
      text5: ' ',
      text6: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const Care = {
  FB: {
    default: {
      text1: 'Negovalne bolnišnice: ',
      text2: ' ',
      text3: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const Deceased = {
  FB: {
    default: {
      text1: 'Umrli: ',
      text2: ', skupaj: ',
      text3: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const InHospital = {
  FB: {
    default: {
      text1: '',
      text2: ': ',
      text3: '',
      text4: '',
      text5: ', EIT: ',
      text6: '',
      text7: '',
      text8: '',
      text9: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const summaryKeys = [
  'PCR',
  'HAT',
  'ActiveCases',
  'Vaccination',
  'ConfirmedToDate',
];
const summaryDict = {
  PCR,
  HAT,
  ActiveCases,
  Vaccination,
  ConfirmedToDate,
};

const patientsKeys = [
  'Hospitalized',
  'OnRespiratory',
  'Care',
  'Deceased',
  'InHospital',
];
const patientsDict = {
  Hospitalized,
  OnRespiratory,
  Care,
  Deceased,
  InHospital,
};

const getDict = (keys, dict) => {
  return keys.reduce(
    (acc, item) => {
      acc.FB = { ...acc.FB, [item]: dict[item].FB };
      acc.TW = { ...acc.TW, [item]: dict[item].TW };
      return acc;
    },
    { FB: {}, TW: {} }
  );
};

const SummaryDict = getDict(summaryKeys, summaryDict);
const PatientsDict = getDict(patientsKeys, patientsDict);

const FB = { ...SummaryDict.FB, ...PatientsDict.FB };
const TW = { ...SummaryDict.TW, ...PatientsDict.TW };

export const DefaultTextsDict = FB;
export default {
  FB,
  TW,
};
