export default {
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
  Vaccination: {
    field: 'vaccinationSummary',
    types: { default: 'onlyIn', fallback: null },
  },
  ConfirmedToDate: {
    field: 'casesToDateSummary',
    types: { default: 'onlyValue', fallback: null },
  },
};
