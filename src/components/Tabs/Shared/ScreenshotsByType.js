import Screenshot from 'components/Screenshot';
import { CHART, CARD, MULTICARD, ScreenshotNames } from 'dicts';

const typesDict = {
  CHART,
  CARD,
  MULTICARD,
};

const getTranslatedScreenshotName = (name, type, typesDict) => {
  const [screen, custom] = name.split('_');
  const types = typesDict[type.toUpperCase()];
  return !custom ? types[screen].text : types[screen].customCharts[custom].text;
};

const getHideLegendInScreenshot = (name, type, typesDict) => {
  const [screen, custom] = name.split('_');
  const types = typesDict[type.toUpperCase()];
  return !custom
    ? types[screen].hideLegendInScreenshots
    : types[screen].customCharts[custom].hideLegendInScreenshots;
};

export const translatedNames = Object.entries(ScreenshotNames).reduce(
  (acc, [type, names]) => {
    const translated = names.reduce((nestedAcc, name) => {
      nestedAcc[name] = getTranslatedScreenshotName(name, type, typesDict);
      return nestedAcc;
    }, {});
    return { ...acc, ...translated };
  },
  {}
);

function ScreenshotsByType({ title, type, ...props }) {
  const names = ScreenshotNames[type.toUpperCase()];

  const screenshots = names.map(name => {
    const [screen, custom] = name.split('_');
    const text = getTranslatedScreenshotName(name, type, typesDict);
    const hideLegend = getHideLegendInScreenshot(name, type, typesDict);
    const immediateDownload = false;

    return (
      <div key={`${type}-${name}`} className="screenshot-container">
        <Screenshot
          params={{
            type,
            screen,
            custom: custom || '',
            hideLegend: hideLegend ? String(hideLegend) : '',
            immediateDownload,
          }}
          captionTop
          captionText={text}
        />
      </div>
    );
  });

  return (
    <div className={props.className}>
      <h2>{title || type}</h2>
      <div className="screenshots-container">{screenshots}</div>
    </div>
  );
}

export default ScreenshotsByType;
