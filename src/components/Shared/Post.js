import { memo, useContext } from 'react';
import { format } from 'date-fns';
import { SocialContext } from 'context/SocialContext';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Intro = ({ postNumber, introTodayDate, postsCount }) => {
  const { social } = useContext(SocialContext);

  const isFB = social === 'FB';

  const postThread = isFB ? '' : `${postNumber}/${postsCount}`;

  return (
    <h3>
      <span>
        Status #COVID19 <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} /> {postThread}{' '}
        {introTodayDate}
      </span>
    </h3>
  );
};

const Outro = ({ spark = false }) => {
  const emojis = `💪💉+🌬️🏠+😷+🙎↔↔🙎‍♂️=⛔🦠!`;

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
  spark,
  postsCount,
  forwardedRef,
  ...props
}) {
  const header = hasHeader && (
    <Intro
      postNumber={postNumber}
      introTodayDate={format(new Date(), 'd.M.yyyy')}
      postsCount={postsCount}
    />
  );
  const footer = hasFooter && <Outro spark={spark} />;
  return (
    <article ref={forwardedRef} id={id} {...props}>
      {header}
      {children}
      {footer}
    </article>
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps.forwardedRef === nextProps.forwardedRef;
}

export default memo(Post, areEqual);
