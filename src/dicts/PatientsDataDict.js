const PatientsDataDict = {
  Hospitalized: {
    field: 'hospitalized',
    types: { default: 'twoBracketsLastSingle', fallback: null },
  },
  Hospitalized_RZ_C19: {
    field: 'hospitalized_rz_c19',
    types: { default: 'hospRedZoneAndReasonCovid', fallback: null },
  },
  OnRespiratory: {
    field: 'onRespiratory',
    types: { default: 'twoSingleBrackets', fallback: null },
  },
  Care: {
    field: 'care',
    types: { default: 'bracketsInOut', fallback: null },
  },
  Deceased: {
    field: 'deceased',
    types: { default: 'twoFirstWithSign', fallback: null },
  },
  RedZone: {
    field: 'redZone',
    types: { default: 'single', fallback: null },
  },
  ReasonCovid: {
    field: 'reasonCovid',
    types: { default: 'single', fallback: null },
  },
};

export default PatientsDataDict;
