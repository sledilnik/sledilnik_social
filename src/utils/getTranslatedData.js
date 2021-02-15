const dictionary = {
  oseba: ['oseba', 'osebi', 'osebe', 'osebe', 'oseb'],
};

const getValue = (dataItem, keys) => {
  if (keys.length > 1) {
    return getValue(dataItem[keys[0]], keys.slice(1, keys.length));
  }

  return dataItem[keys[0]];
};
export default function getTranslatedData(dict, data) {
  return dict.map(item => {
    if (item.dataKeys === undefined) {
      return { ...item, data: null };
    }

    if (item.calculate?.what === 'diff') {
      const values = item.calculate.indexArray.map(index => {
        if (index instanceof Array) {
          const newData = getValue(data, index);
          return getValue(newData, item.dataKeys);
        }

        return getValue(data[index], item.dataKeys);
      });

      return { ...item, data: values[0] - values[1] };
    }

    if (item.calculate?.what === 'sum') {
      const values = item.calculate.dataKeys.map(keys => {
        return getValue(data[0][item.dataKeys], keys);
      });
      return { ...item, data: values[0] + values[1] };
    }

    if (item.calculate?.what === 'translate') {
      const value = getValue(data, item.calculate.dataKeys);
      const dict = dictionary[data[item.dataKeys[0]]];
      let index = 0;
      index = value === 0 || value > 4 ? 4 : index;
      index = value === 2 ? 1 : index;
      index = value === 3 ? 2 : index;
      index = value === 4 ? 3 : index;
      return { ...item, data: dict[index] };
    }

    const value = getValue(data, item.dataKeys);
    return { ...item, data: value };
  });
}
