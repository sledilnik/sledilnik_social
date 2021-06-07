const DEFAULT_PCR = {
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
};

const DEFAULT_HAT = {
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
};

const DEFAULT_ActiveCases = {
  default: {
    text1: 'Aktivni primeri: ',
    text2: ' ',
    text3: '.',
  },
  onlyValue: {},
};

const DEFAULT_Vaccination = {
  default: {
    text1: 'Cepljenih oseb: 💉',
    text2: ' ',
    text3: ', 💉💉',
    text4: '.',
  },
  onlyValue: {},
};

const DEFAULT_ConfirmedToDate = {
  default: {
    text1: 'Skupaj: ',
    text2: '',
    text3: ' potrjenih primerov.',
  },
  onlyValue: {},
};

const DEFAULT_Hospitalized = {
  default: {
    text1: 'Hospitalizirani: ',
    text2: ' ',
    text3: ', EIT: ',
    text4: ' ',
    text5: '.',
  },
  onlyValue: {},
};

const DEFAULT_OnRespiratory = {
  default: {
    text1: 'Na respiratorju: ',
    text2: ', intubirani: ',
    text3: ' ',
    text4: ', neinvazivno: ',
    text5: ' ',
    text6: '.',
  },
  onlyValue: {},
};

const DEFAULT_Care = {
  default: {
    text1: 'Negovalne bolnišnice: ',
    text2: ' ',
    text3: '.',
  },
  onlyValue: {},
};

const DEFAULT_Deceased = {
  default: {
    text1: 'Umrli: ',
    text2: ', skupaj: ',
    text3: '.',
  },
  onlyValue: {},
};

const DEFAULT_InHospital = {
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
};

const PCR = {
  FB: {
    default: { ...DEFAULT_PCR.default },
    onValue: { ...DEFAULT_PCR.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_PCR.default, text4: '' },
    onValue: { ...DEFAULT_PCR.onlyValue },
  },
};

const HAT = {
  FB: {
    default: { ...DEFAULT_HAT.default },
    onlyValue: { ...DEFAULT_HAT.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_HAT.default, text4: '' },
    onlyValue: { ...DEFAULT_HAT.onlyValue },
  },
};

const ActiveCases = {
  FB: {
    default: { ...DEFAULT_ActiveCases.default },
    onlyValue: { ...DEFAULT_ActiveCases.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_ActiveCases.default },
    onlyValue: { ...DEFAULT_ActiveCases.onlyValue },
  },
};

const Vaccination = {
  FB: {
    default: { ...DEFAULT_Vaccination.default },
    onlyValue: { ...DEFAULT_Vaccination.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_Vaccination.default },
    onlyValue: { ...DEFAULT_Vaccination.onlyValue },
  },
};

const ConfirmedToDate = {
  FB: {
    default: { ...DEFAULT_ConfirmedToDate.default },
    onlyValue: { ...DEFAULT_ConfirmedToDate.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_ConfirmedToDate.default },
    onlyValue: { ...DEFAULT_ConfirmedToDate.onlyValue },
  },
};

const Hospitalized = {
  FB: {
    default: { ...DEFAULT_Hospitalized.default },
    onlyValue: { ...DEFAULT_Hospitalized.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_Hospitalized.default },
    onlyValue: { ...DEFAULT_Hospitalized.onlyValue },
  },
};

const OnRespiratory = {
  FB: {
    default: { ...DEFAULT_OnRespiratory.default },
    onlyValue: { ...DEFAULT_OnRespiratory.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_OnRespiratory.default },
    onlyValue: { ...DEFAULT_OnRespiratory.onlyValue },
  },
};

const Care = {
  FB: {
    default: { ...DEFAULT_Care.default },
    onlyValue: { ...DEFAULT_Care.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_Care.default },
    onlyValue: { ...DEFAULT_Care.onlyValue },
  },
};

const Deceased = {
  FB: {
    default: { ...DEFAULT_Deceased.default },
    onlyValue: { ...DEFAULT_Deceased.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_Deceased.default },
    onlyValue: { ...DEFAULT_Deceased.onlyValue },
  },
};

const InHospital = {
  FB: {
    default: { ...DEFAULT_InHospital.default },
    onlyValue: { ...DEFAULT_InHospital.onlyValue },
  },
  TW: {
    default: { ...DEFAULT_InHospital.default },
    onlyValue: { ...DEFAULT_InHospital.onlyValue },
  },
};

const summaryDict = {
  PCR,
  HAT,
  ActiveCases,
  Vaccination,
  ConfirmedToDate,
};

const patientsDict = {
  Hospitalized,
  OnRespiratory,
  Care,
  Deceased,
  InHospital,
};

const getDict = dict => {
  return Object.entries(dict).reduce(
    (acc, [key, value]) => {
      acc.FB = { ...acc.FB, [key]: value.FB };
      acc.TW = { ...acc.TW, [key]: value.TW };
      return acc;
    },
    { FB: {}, TW: {} }
  );
};

const SummaryDict = getDict(summaryDict);
const PatientsDict = getDict(patientsDict);

const FB = { ...SummaryDict.FB, ...PatientsDict.FB };
const TW = { ...SummaryDict.TW, ...PatientsDict.TW };

const SocialTextDict = {
  FB,
  TW,
};

export default SocialTextDict;
