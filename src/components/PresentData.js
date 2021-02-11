import React from 'react';
import {
  formatNumberWithSign,
  formatPercentage,
  formatNumber,
} from '../utils/formatNumber';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Arrow = () => <Emoji emoji={'➡️'} ariaLabel={'arrow'} />;

function PresentData({ dataString }) {
  return (
    <p>
      <Arrow /> {dataString}
    </p>
  );
}

const getFormatedNumber = (
  num,
  divide = 1,
  options = { formatType: '', negative: false }
) => {
  const step1 = num / divide;
  const step2 = options.negative ? -step1 : step1;

  if (options.formatType === 'sign') {
    return formatNumberWithSign(step2);
  }

  if (options.formatType === 'percent') {
    return formatPercentage(step2);
  }

  return formatNumber(step2);
};

function withPresentDataHOC(Component) {
  return ({ data, ...props }) => {
    const output = data.map(item => {
      const {
        prefix = '',
        data,
        suffix = '',
        formatType,
        negative,
        divide,
      } = item;

      const formatedNumber =
        !isNaN(data) &&
        getFormatedNumber(data, divide, {
          formatType,
          negative,
        });

      const number = formatedNumber || ' - ';

      return `${prefix}${number}${suffix}`;
    });

    const newProps = { ...props, dataString: output };

    return <Component {...newProps} />;
  };
}
export default withPresentDataHOC(PresentData);
