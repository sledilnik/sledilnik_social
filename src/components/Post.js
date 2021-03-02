import React, { useContext } from 'react';

import './Post.css';

import { format } from 'date-fns';
import { SocialContext } from './../context/SocialContext';

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

function Post({
  id,
  postNumber,
  hasHeader = true,
  children,
  hasFooter = true,
  ...props
}) {
  const header = hasHeader && (
    <Intro
      postNumber={postNumber}
      introTodayDate={format(new Date(), 'd.M.yyyy')}
    />
  );
  const footer = hasFooter && <Outro spark={props.spark} />;
  return (
    <article id={id} className="Post">
      {header}
      {children}
      {footer}
    </article>
  );
}

const SparkDict = {
  FB: {
    LAB: true,
    HOS: true,
    EPI: true,
  },
  TW: {
    LAB: true,
    HOS: false,
    EPI: true,
  },
};

function withPostHOC(Component) {
  const WithPost = props => {
    const post = props.id.replace('post-', '').toUpperCase();
    const { social } = useContext(SocialContext);
    const spark = SparkDict[social][post];
    const newProps = { ...props, spark };

    return <Component {...newProps} />;
  };

  return WithPost;
}

export default withPostHOC(Post);
