import { useContext } from 'react';
import { TimestampsContext } from '../../context/TimestampsContext';
import Card from '../Shared/Card/index.js';

import Screenshots from '../Screenshots';

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
      <Screenshots />
    </Card>
  );
};

export default ScreenshotsCard;
