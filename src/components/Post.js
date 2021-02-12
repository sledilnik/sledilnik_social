import React from 'react';
import sledilnikLogo from '../assets/sledilnik-logo.svg';
import { format } from 'date-fns';

const mainComponentsNames = ['LAB', 'HOS', 'EPI'];

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Intro = ({ postNumber, introTodayDate }) => {
  const postsCount = mainComponentsNames.length;
  return (
    <h3 className="Intro text">
      <span>
        Status #COVID19 <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} /> {postNumber}/
        {postsCount} {introTodayDate}
      </span>
    </h3>
  );
};

const Outro = ({ spark = true }) => {
  const emojis =
    '💨🏠,😷,🙎↔️↔️🙎‍♂️ + 👐🧼🚿 + #ObvestiSvojeStike + #OstaniZdrav 📲 & 🤞';

  const EmojisRow = () => <Emoji emoji={emojis} ariaLabel="emojis"></Emoji>;

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

  const Logo = ({
    className,
    src = '',
    alt = 'logo',
    width = '48',
    height = '48',
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );

  const SparkRow = () => (
    <>
      <Spark />{' '}
      <Link
        text="SPARK"
        href="https://covid-spark.info"
        target="_blank"
        rel="noopener noreferrer"
      />{' '}
      <Spark />
    </>
  );

  return (
    <div>
      <EmojisRow />
      <div>{spark && <SparkRow />}</div>
      <div>
        <Logo
          src={sledilnikLogo}
          alt="logo"
          className="logoCenter"
          width="48"
          height="48"
        />
      </div>
    </div>
  );
};

function Post({ postNumber, hasHeader = true, children, hasFooter = true }) {
  const header = hasHeader && (
    <Intro
      postNumber={postNumber}
      introTodayDate={format(new Date(), 'dd.MM.yyyy')}
    />
  );
  const footer = hasFooter && <Outro />;
  return (
    <article>
      {header}
      {children}
      {footer}
    </article>
  );
}

function withPostHOC(Component) {
  return props => {
    return <Component {...props} />;
  };
}

export default withPostHOC(Post);
