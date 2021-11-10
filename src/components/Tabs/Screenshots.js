import { useContext } from 'react';
import { TimestampsContext } from 'context/TimestampsContext';
import Card from 'components/Shared/Card';

import ScreenshotsContainer from './Shared/ScreenshotsContainer';

const ScreenshotsCard = () => {
  const { stats } = useContext(TimestampsContext);
  const { data: statsTimestamp } = stats;
  const dates = {
    stats: statsTimestamp,
  };
  return (
    <Card
      title="Posnetki"
      dates={dates}
      open
      noClose
      noRefresh
      noToClipboard
      noCount
    >
      <ScreenshotsContainer />
    </Card>
  );
};

export default ScreenshotsCard;
