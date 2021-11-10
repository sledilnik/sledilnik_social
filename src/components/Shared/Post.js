import { format } from 'date-fns';

const Emoji = ({ emoji, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const Intro = ({ postNumber, introTodayDate, postsCount }) => {
  return (
    <h3>
      <span>
        Status #COVID19 <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} /> {postNumber}/
        {postsCount} {introTodayDate}
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

export default function Post({
  id,
  postNumber,
  hasHeader = true,
  children,
  hasFooter = true,
  spark,
  postsCount,
  ...props
}) {
  const { forwardedRef } = props;
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
