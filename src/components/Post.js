import React from 'react';
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
    <h3>
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

  const Link = ({ text = '', href = '', target = '', rel = '' }) => {
    return (
      <a href={href} target={target} rel={rel}>
        {text ? text : href}
      </a>
    );
  };

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
