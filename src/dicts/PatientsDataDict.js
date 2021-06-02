const PatientsDataDict = {
  Hospitalized: {
    field: 'hospitalized',
    types: { default: 'twoBracketsLastSingle', fallback: null },
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
};

export default PatientsDataDict;
