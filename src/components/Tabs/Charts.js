import EmbeddedChart from 'components/Shared/EmbeddedChart';
import Card from 'components/Shared/Card';

const EmbeddedChartCard = () => (
  <Card title="Grafi" open noClose noRefresh noToClipboard noCount>
    <EmbeddedChart />
  </Card>
);

export default EmbeddedChartCard;
