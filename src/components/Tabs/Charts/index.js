import { Card } from 'components/Shared';
import EmbeddedChart from './EmbeddedChart';

const EmbeddedChartCard = () => (
  <Card title="Grafi" open noClose noRefresh noToClipboard noCount>
    <EmbeddedChart />
  </Card>
);

export default EmbeddedChartCard;
