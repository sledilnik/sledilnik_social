import React from 'react';

const dictionary = [
  [
    'preminula oseba',
    'preminuli osebi',
    'osebe preminule',
    'osebe preminule',
    'preminulih oseb',
  ],
  [
    'potrjeni primer',
    'potrjena primera',
    'potrjeni primeri',
    'potrjeni primeri',
    'potrjenih primerov',
  ],
  ['zdravi', 'zdravita', 'zdravijo', 'zdravijo', 'zdravi'],
  ['oseba', 'osebi', 'osebe', 'osebe', 'oseb'],
];

const Translate = ({ number, text }) => {
  let variable = '';

  if (number > 5) {
    number = 5;
  }

  dictionary.forEach(translation => {
    if (translation[0] === text) {
      variable = translation[number - 1];
    }
  });

  return <span>{variable}</span>;
};
export default Translate;
