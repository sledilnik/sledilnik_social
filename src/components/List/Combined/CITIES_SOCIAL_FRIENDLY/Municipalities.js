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

const getRegions = data => {
  return data
    .map(item => {
      return item.regions;
    })
    .reverse();
};

const createCalculatedRegions = arr => {
  let index = 1;
  const obj = arr.reduce((acc, value) => {
    acc['d' + index] = calc_regions(value);
    index++;
    return acc;
  }, {});
  return obj;
};

const Municipalities = props => {
  const regionsArray = getRegions([...props.data]).slice(0, 16); //
  const calculatedRegions = createCalculatedRegions([...regionsArray]);

  const difference_since_yesterday = _.assignWith(
    { ...calculatedRegions.d1 },
    { ...calculatedRegions.d2 },
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
        const deltas = Object.entries(calculatedRegions)
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

        // set output
        const upDown =
          props.showTrend === 'y'
            ? setPlatformFriendlyIcon(props.icons)(trend)
            : `<i>${
                Math.round((trend + Number.EPSILON) * 100000) / 100000
              }</i> `;

        return [town, upDown];
      })
      .reduce(
        (outputData, town_upDown) => {
          outputData[0].push(town_upDown[0]);
          outputData[1].push(town_upDown[1]);
          return outputData;
        },
        [[], []]
      );

    // generate HTML output
    let outputLabel = '';
    for (var k = 0; k < outputData[0].length; k++) {
      outputLabel = outputLabel.concat(outputData[0][k]);
      outputLabel = outputLabel.concat(' ');
      outputLabel = outputLabel.concat(
        outputData[1][k] === '' ? '' : outputData[1][k]
      ); // remove NaN that reside in an array due to y1-y3 being 0
      if (k < outputData[0].length - 1) {
        outputLabel = outputLabel.concat(', ');
      }
    }
    outputLabel = outputLabel.concat(`<strong>&nbsp;+${count}<br></strong>`);

    // TODO Lists do not contain only <li> elements and script supporting elements (<script> and <template>)
    return (
      <div key={count}>
        <span dangerouslySetInnerHTML={{ __html: outputLabel }}></span>
      </div>
    );
  }).reverse();

  return display_values;
};

export default Municipalities;
