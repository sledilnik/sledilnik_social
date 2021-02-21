import React, { useEffect, useState } from 'react';
import twitter from 'twitter-text';
import CharCount from './CharCount';

function TweetCount({ text }) {
  const [length, setLength] = useState(null);
  const [parsedTweet, setParsedTweet] = useState(null);

  useEffect(() => {
    text && setParsedTweet(twitter.parseTweet(text));
  }, [text]);

  useEffect(() => {
    parsedTweet && setLength(parsedTweet.weightedLength);
  }, [parsedTweet]);

  return <CharCount length={length} valid={parsedTweet?.valid} />;
}

export default TweetCount;
