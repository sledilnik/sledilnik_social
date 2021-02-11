const getValue = (dataItem, keys) => {
  if (keys.length > 1)
    return getValue(dataItem[keys[0]], keys.slice(1, keys.length));
  return dataItem[keys[0]];
};
export default function getTranslatedData(dict, data) {
  return dict.map(item => {
    if (item.calculate?.what === 'diff') {
      const values = item.calculate.indexArray.map(index => {
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

    const value = getValue(data, item.dataKeys);
    return { ...item, data: value };
  });
}
