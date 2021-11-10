import React from 'react';
import twitter from 'twitter-text';
import CharCount from 'components/Shared/CharCount';

function TweetCount({ text }) {
  if (!text) {
    return null;
  }
  const parsedTweet = twitter.parseTweet(text);
  const length = parsedTweet.weightedLength;

  return <CharCount length={length} valid={parsedTweet.valid} />;
}

export default TweetCount;
