import EmbeddedChart from '../EmbeddedChart';
import Card from '../Card';

const EmbeddedChartCard = () => (
  <Card title="Grafi" open noClose noRefresh noToClipboard noCount>
    <EmbeddedChart />
  </Card>
);

export default EmbeddedChartCard;
