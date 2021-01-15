import React from 'react';
import sledilnikLogo from '../../../assets/sledilnik-logo.svg';
import DataRow from './DataRow';

const Outro = () => {
  const emojis = '💨🏠,😷,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 + 👐🧼🚿 + #OstaniZdrav 📲 & 🤞';

  const EmojisRow = () => (
    <DataRow noArrow={true}>
      <span role="img" aria-label="emojis">
        {emojis}
      </span>
    </DataRow>
  );

  const Spark = () => (
    <span role="img" aria-label="s">
      ✨
    </span>
  );

  const Link = ({
    text = '',
    className = '',
    href = '',
    target = '',
    rel = '',
  }) => {
    return (
      <a className={className} href={href} target={target} rel={rel}>
        {text ? text : href}
      </a>
    );
  };

  const Logo = (
    { className, src = '', alt = 'logo' },
    width = '48',
    height = '48'
  ) => (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );

  // TODO edit css .spark-link
  const SparkRow = () => (
    <DataRow noArrow={true}>
      <Spark />{' '}
      <Link
        text="SPARK"
        className="spark-link"
        href="https://covid-spark.info"
        target="_blank"
        rel="noopener noreferrer"
      />{' '}
      <Spark />
    </DataRow>
  );

  return (
    <div className="Outro">
      <EmojisRow />
      <SparkRow />
      <Logo
        src={sledilnikLogo}
        alt="logo"
        className="logoCenter"
        width="48"
        height="48"
      />
    </div>
  );
};
export default Outro;
