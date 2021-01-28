import React from 'react';
import _ from 'lodash';
import MunicipalitiesDict from '../../../../MunicipalitiesDict';

// { name: x, translation: X} becomes { x: { name: x, translation: X }}
const MunicipalitiesLookup = _.keyBy(MunicipalitiesDict, 'name');

const calc_regions = regions => {
  const region_names = Object.keys(regions);

  const result = region_names.reduce((region_box, region) => {
    const towns = Object.keys(regions[region]);
    const region_numbers_today = towns.reduce((town_box, town) => {
      if (
        MunicipalitiesLookup[town] &&
        MunicipalitiesLookup[town].translation
      ) {
        town_box[MunicipalitiesLookup[town].translation] =
          regions[region][town].confirmedToDate;
      }
      return town_box;
    }, {});
    return { ...region_numbers_today, ...region_box };
  }, {});

  return result;
};

// platform friendly icons
const FB_ICONS = {
  down: '⤵ ',
  up: '⤴ ',
  no: '',
  between: '➖ ',
  dots: '... ',
};

const TW_ICONS = {
  down: '📉 ',
  up: '📈 ',
  no: '',
  between: '➖ ',
  dots: '... ',
};

const ICONS = {
  FB: FB_ICONS,
  TW: TW_ICONS,
};

function getIconKey(trend) {
  if (trend < -0.03) {
    return 'down';
  }
  if (trend > 0.03) {
    return 'up';
  }
  if (trend === 'no') {
    return 'no';
  }
  if (trend >= -0.03 || trend <= 0.03) {
    return 'between';
  }
  return 'dots';
}

const setPlatformFriendlyIcon = (iconsVersion = 'FB', trend) => {
  const selectedIcons = ICONS[iconsVersion];

  const iconKey = getIconKey(trend);

  return selectedIcons[iconKey];
};

const createCalculatedRegions = perDayRegions => {
  let index = 1;
  const obj = perDayRegions.reduce((acc, regions) => {
    acc['d' + index] = calc_regions(regions);
    index++;
    return acc;
  }, {});
  return obj;
};

const Municipalities = ({ data, showTrend = 'y', icons = '' }) => {
  const display = data.map((townsByDiff, index) => {
    const outputLabel = Object.entries(townsByDiff).map(([count, towns]) => {
      return towns.map(town => {
        const icon =
          showTrend === 'y' ? ICONS[icons][town.upDown] : <i>{town.trend}</i>;

        return (
          <span key={town.key}>
            {town.town} {town.trend !== 'no' && icon}
            {town.next ? ', ' : <span className="bold"> +{count}</span>}
          </span>
        );
      });
    });
    return <li key={index + '-' + { towns: townsByDiff }}>{outputLabel}</li>;
  });

  return display;
};

function withListHOC(Component) {
  return ({ ...props }) => {
    const perDayRegions = props.data
      .map(item => item.regions)
      .reverse()
      .slice(0, 16); // one day too much
    // TODO we could skip calculatedPerDayRegions and calc regions even earlier in getRegions
    const calculatedPerDayRegions = createCalculatedRegions([...perDayRegions]);

    const difference_since_yesterday = _.assignWith(
      { ...calculatedPerDayRegions.d1 },
      { ...calculatedPerDayRegions.d2 },
      (today, yesterday) => today - yesterday
    );

    const townsByDifference = _.toPairs(difference_since_yesterday) // { ljubljana: 10, maribor: 8 } becomes [['ljubljana', 10], ['maribor', 8]]
      .sort((a, b) => b[1] - a[1])
      .reverse()
      .reduce((acc, [town, count]) => {
        if (count < 1) {
          return acc;
        }
        if (acc[count]) {
          acc[count].push(town);
        } else {
          acc[count] = [town];
        }
        return acc;
      }, {});

    const getTrend = deltas => {
      // prepare params to calculate trend
      const addValue = (acc, value) => acc + value;
      const y3 = deltas.slice(0, 7).reduce(addValue, 0);
      const y2 = deltas.slice(4, 11).reduce(addValue, 0);
      const y1 = deltas.slice(8, 15).reduce(addValue, 0);

      // calculate trend
      const oneTrendArgIsUndefined = y1 === 0 || y2 === 0 || y3 === 0;
      const calcTrend = (y1, y2, y3) =>
        (Math.log(y1) + 3 * Math.log(y3) - 4 * Math.log(y2)) / 8;
      const trend = oneTrendArgIsUndefined ? 'no' : calcTrend(y1, y2, y3);
      return trend;
    };

    const getDeltas = (town, calculatedPerDayRegions) =>
      Object.entries(calculatedPerDayRegions).map(
        ([day, regionData], index, days) => {
          if (day === 'd16') {
            return null; // last value; can not subtract
          }
          const regionDataDayBefore = days[index + 1][1];
          return regionData[town] - regionDataDayBefore[town];
        }
      );

    const getTownTrend = calculatedPerDayRegions => town => {
      // prepare data to calculate trend
      const deltas = getDeltas(town, calculatedPerDayRegions).filter(
        item => item !== null
      );
      const trend = getTrend(deltas);
      const upDown = getIconKey(trend); // ? can we skip this and mo
      return [town, upDown, trend];
    };

    const data = _.map(townsByDifference, (towns, count) => {
      const outputData = towns
        .map(getTownTrend(calculatedPerDayRegions))
        .reduce(
          (acc, town_upDown) => {
            // town_upDown = ["Murska Sobota", "down", -0.031660708691416684];
            acc[0].push(town_upDown[0]);
            acc[1].push(town_upDown[1]);
            acc[2].push(town_upDown[2]);
            return acc;
          },
          [[], [], []]
        );

      const outputLabel = outputData[0].map((town, index) => {
        let trend = outputData[2][index];
        trend =
          trend !== 'no' &&
          Math.round((trend + Number.EPSILON) * 100000) / 100000;
        const upDown = outputData[1][index];
        return {
          key: index + '-' + town,
          town,
          trend: trend !== 'no' && trend,
          upDown,
          next: index !== outputData[0].length - 1,
        };
      });

      return { [count]: outputLabel };
    }).reverse();

    const newProps = {
      data,
      showTrend: props.showTrend,
      icons: props.icons,
    };

    return <Component {...newProps} />;
  };
}

export default withListHOC(Municipalities);
