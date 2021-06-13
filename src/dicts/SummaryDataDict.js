const SocialDataDict = {
  PCR: {
    field: 'testsToday',
    types: { default: 'percentage', fallback: 'onlyValue' },
    mandatoryProperties: ['value', 'positive', 'percent'],
  },
  HAT: {
    field: 'testsTodayHAT',
    types: { default: 'percentage', fallback: 'onlyValue' },
    mandatoryProperties: ['value', 'positive', 'percent'],
  },
  ActiveCases: {
    field: 'casesActive',
    types: { default: 'bracketsInOut', fallback: null },
  },
  Vaccination1: {
    field: 'vaccinationSummary',
    types: { default: 'vaccinationSummary1', fallback: null },
  },
  Vaccination2: {
    field: 'vaccinationSummary',
    types: { default: 'vaccinationSummary2', fallback: null },
  },
  ConfirmedToDate: {
    field: 'casesToDateSummary',
    types: { default: 'onlyValue', fallback: null },
  },
  CasesActive100k: {
    field: 'casesActive100k',
    types: { default: 'casesActive100k', fallback: null },
  },
};

export default SocialDataDict;
