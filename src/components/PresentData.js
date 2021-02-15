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

function PresentData({ dataString, noArrow = false }) {
  return (
    <p>
      {!noArrow && <Arrow />} {dataString}
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
  return ({ data, noArrow = false, ...props }) => {
    const output = data.map((item, index) => {
      const prefix = item.prefix ? item.prefix : '';
      const suffix = item.suffix ? item.suffix : '';

      if (item.data === null) {
        return `${prefix}${suffix}`;
      }

      const { formatType, negative } = item;

      let output;
      if (formatType === 'string') {
        output = item.data;
      }

      // ? isNaN
      if (formatType !== 'string') {
        const formatedNumber =
          !isNaN(item.data) &&
          getFormatedNumber(item.data, item.divide, {
            formatType,
            negative,
          });

        output = formatedNumber || ' - ';
      }

      const key = `${index}-${prefix}${output}${suffix}`;

      return (
        <span key={key} style={{ fontWeight: item.style === null ? 400 : 700 }}>
          {prefix}
          {output}
          {suffix}
        </span>
      );
    });

    const newProps = { ...props, dataString: output, noArrow };

    return <Component {...newProps} />;
  };
}
export default withPresentDataHOC(PresentData);
