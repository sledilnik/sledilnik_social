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

const setPlatformFriendlyIcon = (iconsVersion = 'FB') => trend => {
  const selectedIcons = ICONS[iconsVersion];

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

const Municipalities = props => {
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

  const difference_as_array = _.toPairs(difference_since_yesterday) // { ljubljana: 10, maribor: 8 } becomes [['ljubljana', 10], ['maribor', 8]]
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

  const display_values = _.map(difference_as_array, (towns, count) => {
    // if there is a single town for a specific number of new cases, calculate 7-d trend

    // fetch 7-d data for trend
    const outputData = towns
      .map(town => {
        // prepare data to calculate trend
        const deltas = Object.entries(calculatedPerDayRegions)
          .map(([day, regionData], index, entries) => {
            if (day === 'd16') {
              return null; // last value; can not subtract
            }
            const regionDataDayBefore = entries[index + 1][1];
            return regionData[town] - regionDataDayBefore[town];
          })
          .filter(item => item !== null);

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

        // set icon
        const upDown =
          props.showTrend === 'y' ? (
            setPlatformFriendlyIcon(props.icons)(trend)
          ) : (
            <i>{Math.round((trend + Number.EPSILON) * 100000) / 100000}</i>
          );

        return [town, upDown, trend];
      })
      .reduce(
        (outputData, town_upDown) => {
          outputData[0].push(town_upDown[0]);
          outputData[1].push(town_upDown[1]);
          outputData[2].push(town_upDown[2]);
          return outputData;
        },
        [[], [], []]
      );
    // generate HTML output
    const outputLabelJaka = outputData[0].map((town, index) => {
      const trend = outputData[2][index];
      const upDown = outputData[1][index];
      return (
        <span key={index + ' ' + town}>
          {town} {trend !== 'no' && upDown}
          {index !== outputData[0].length - 1 && ', '}
        </span>
      );
    });

    return (
      <li key={count + '-' + { towns }}>
        {outputLabelJaka} <span className="bold">+{count}</span>
      </li>
    );
  }).reverse();

  return display_values;
};

export default Municipalities;
