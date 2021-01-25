import React from 'react';
import sledilnikLogo from '../../../assets/sledilnik-logo.svg';
import { Row, Emoji } from '../ui/New';

const Outro = () => {
  const emojis = '💨🏠,😷,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 + 👐🧼🚿 + #OstaniZdrav 📲 & 🤞';

  const EmojisRow = () => (
    <Row noArrow={true} end={false}>
      <Emoji emoji={emojis} ariaLabel="emojis"></Emoji>
    </Row>
  );

  const Spark = () => <Emoji emoji={'✨'} ariaLabel="spark" />;

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
    <Row noArrow={true} end={false}>
      <Spark />{' '}
      <Link
        text="SPARK"
        className="spark-link"
        href="https://covid-spark.info"
        target="_blank"
        rel="noopener noreferrer"
      />{' '}
      <Spark />
    </Row>
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
