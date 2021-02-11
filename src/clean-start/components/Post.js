import React from 'react';
import {
  formatNumberWithSign,
  formatPercentage,
  formatNumber,
} from './../../utils/formatNumber';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Arrow = () => <Emoji emoji={'➡️'} ariaLabel={'arrow'} />;

function Post({ hasHeader = true, output = [], hasFooter = true }) {
  const header = hasHeader && <div>This is Post's header</div>;
  const footer = hasFooter && <div>This is Post's footer</div>;
  return (
    <article>
      {header}
      {output}
      {footer}
    </article>
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

function withPostHOC(Component) {
  return ({ data = [], ...props }) => {
    const output = data.map((item, index) => {
      const dataString = item.map((rowData, index2) => {
        const {
          prefix = '',
          data,
          suffix = '',
          formatType,
          negative,
          divide,
        } = rowData;

        const formatedNumber =
          !isNaN(data) &&
          getFormatedNumber(data, divide, {
            formatType,
            negative,
          });

        const number = formatedNumber || ' - ';

        return `${prefix}${number}${suffix}`;
      });
      return (
        <p key={index}>
          <Arrow /> {dataString}
        </p>
      );
    });

    const newProps = { output, ...props };

    return <Component {...newProps} />;
  };
}

export default withPostHOC(Post);
