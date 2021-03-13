import React, { useContext, useState, useCallback } from 'react';
import _ from 'lodash';
import municipalitiesDict from '../dicts/MunicipalitiesDict';

import {
  formatNumberWithSign,
  formatPercentage,
} from './../utils/formatNumber';

import { DataContext } from '../context/DataContext';
import { SocialContext } from '../context/SocialContext';

import DataRow from './DataRow';
import { differenceInDays } from 'date-fns/esm';
import { getDate } from '../utils/dates';
import FetchBoundary from './FetchBoundary';
import TextWithTooltip from './TextWithTooltip';
import MunPopOut from './MunPopOut';

// platform friendly icons
const FB_ICONS = {
  down: '⤵',
  up: '⤴',
  no: '',
  between: '➖',
  dots: '...',
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

const get14dTrendIconKey = num => {
  if (num < -0.03) {
    return 'down';
  }
  if (num > 0.03) {
    return 'up';
  }
  if (num === 'no') {
    return 'no';
  }
  if (num >= -0.03 || num <= 0.03) {
    return 'between';
  }
  return 'dots';
};

const getWeeklyGrowthIconKey = num => {
  if (num < 0) {
    return 'down';
  }
  if (num === 0) {
    return 'between';
  }
  if (num > 0) {
    return 'up';
  }
  if (num === 'no') {
    return 'no';
  }
  return 'dots';
};

const GetIcons = {
  trend14: get14dTrendIconKey,
  weeklyGrowth: getWeeklyGrowthIconKey,
};

const setPlatformFriendlyIcon = (
  iconsVersion = 'FB',
  num,
  what = 'trend14'
) => {
  const hasIcons = GetIcons.hasOwnProperty(what);

  if (!hasIcons) {
    return null;
  }

  const selectedIcons = ICONS[iconsVersion];
  const getIcons = GetIcons[what];
  const iconKey = getIcons(num);

  return selectedIcons[iconKey];
};

const getIconOrNum = (icons, num, showNum, showIcon, what) => {
  const icon = showNum && showIcon && setPlatformFriendlyIcon(icons, num, what);
  const roundedNum = Math.round((num + Number.EPSILON) * 100000) / 100000;
  const output =
    what === 'weeklyGrowth'
      ? formatPercentage(num)
      : isNaN(roundedNum)
      ? '-'
      : roundedNum;

  return showNum === 'y' ? (
    icon
  ) : num !== 'no' && icon ? (
    <span style={{ fontWeight: 700 }}>
      {icon} <i>{output}</i>
    </span>
  ) : (
    <i>{output}</i>
  );
};

const Municipalities = ({ isWrongDate, memoDisplay, ...props }) => {
  const [showPopOut, setShowPopOut] = useState(false);
  const onListClickHandler = () => {
    setShowPopOut(true);
  };

  const onClosePopOutHandler = () => {
    setShowPopOut(false);
  };
  return (
    <details>
      <summary className="summary-with-after">
        <DataRow markFail={isWrongDate}>Po krajih:</DataRow>
      </summary>
      <ul onClickCapture={onListClickHandler}>{memoDisplay}</ul>
      <MunPopOut
        open={showPopOut}
        onCancel={onClosePopOutHandler}
        output={props.popOutOutput}
      />
    </details>
  );
};

// { name: x, translation: X} becomes { x: { name: x, translation: X }}
const MunicipalitiesLookup = _.keyBy(municipalitiesDict, 'name');

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

const createCalculatedRegions = perDayRegions => {
  let index = 1;
  const obj = perDayRegions.reduce((acc, regions) => {
    acc['d' + index] = calc_regions(regions);
    index++;
    return acc;
  }, {});
  return obj;
};

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

const get14dTownTrend = calculatedPerDayRegions => town => {
  // prepare data to calculate trend
  const deltas = getDeltas(town, calculatedPerDayRegions).filter(
    item => item !== null
  );
  const trend = getTrend(deltas);
  return [town, trend];
};

const getWeeklyGrowth = (town, calculatedPerDayRegions) => {
  const townConfirmedToDate = Object.entries(calculatedPerDayRegions).reduce(
    (acc, [day, regionData]) => {
      if (day === 'd16') {
        return acc; // last value; can not subtract
      }

      acc.push(regionData[town]);
      return acc;
    },
    []
  );

  const casesNow = townConfirmedToDate[0];
  const cases7dAgo = townConfirmedToDate[7];
  const cases14dAgo = townConfirmedToDate[14];

  const incidenceThisWeek = casesNow - cases7dAgo;
  const incidenceLastWeek = cases7dAgo - cases14dAgo;
  const weeklyGrowth = incidenceThisWeek / incidenceLastWeek - 1;

  return [town, weeklyGrowth];
};

const getTownWeeklyGrowth = calculatedPerDayRegions => town => {
  const weeklyGrowth = getWeeklyGrowth(town, calculatedPerDayRegions).filter(
    item => item !== null
  );
  return weeklyGrowth;
};

const getMunicipalitiesData = (data, mapFunc) => {
  const perDayRegions = data
    .map(item => item.regions)
    .reverse()
    .slice(0, 16);
  // ? we could skip calculatedPerDayRegions and calc regions even earlier
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

  const munData = Object.entries(townsByDifference)
    .reverse()
    .reduce((acc1, [count, towns]) => {
      const townsLabelData = towns
        .map(mapFunc(calculatedPerDayRegions))
        .reduce((acc, townWithTrend, index) => {
          // townWithTrend = ["Murska Sobota",  -0.031660708691416684];
          const townLabel = {
            key: `${count}-${townWithTrend[0]}`,
            name: townWithTrend[0],
            trend: townWithTrend[1],
            next: index !== towns.length - 1,
          };
          acc.push(townLabel);
          return acc;
        }, []);
      acc1.set(count, townsLabelData);
      return acc1;
    }, new Map());

  return munData;
};

const GetFunc = {
  trend14: get14dTownTrend,
  weeklyGrowth: getTownWeeklyGrowth,
};

function withMunicipalitiesHOC(Component) {
  const WithMunicipalities = ({
    showTrend = 'y',
    showIcons,
    what = 'trend14',
    ...rest
  }) => {
    const hasFunc = GetFunc.hasOwnProperty(what);
    if (!hasFunc) {
      throw new Error(`Missing function for keyword: ${what}!`);
    }
    const mapFunc = GetFunc[what];
    const isFunc = mapFunc instanceof Function;
    if (!isFunc) {
      throw new Error(mapFunc + ' is not a function!');
    }

    const { municipalities: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    const data = hook.data && getMunicipalitiesData(hook.data, mapFunc);

    const isWrongDate =
      hook.data &&
      differenceInDays(new Date(), getDate(hook.data.slice(-1).pop())) > 1;

    const memoDisplay = useCallback(
      (social, showIcons, showTrend, what, noTooltip) => {
        const display = [];
        if (!data) {
          return display;
        }

        for (const [count, townsByDiff] of data) {
          const sameDiffTownsLabel = townsByDiff.map(town => {
            const icon = getIconOrNum(
              social,
              town.trend,
              showTrend,
              showIcons,
              what
            );

            const formatedTrend = formatPercentage(town.trend);
            const formatedCount = formatNumberWithSign(count);

            return (
              <span key={town.key}>
                {noTooltip ? (
                  <span>
                    {town.name} {icon}
                  </span>
                ) : (
                  <TextWithTooltip
                    className="up"
                    text={`${town.name} ${icon}`}
                    tooltipText={formatedTrend}
                  />
                )}
                {town.next ? (
                  ', '
                ) : (
                  <span style={{ fontWeight: 700 }}> {formatedCount}</span>
                )}
              </span>
            );
          });
          const color = isWrongDate ? 'var(--red)' : 'initial';
          display.push(
            <li key={`${count}-${{ social }}`} style={{ color }}>
              {sameDiffTownsLabel}
            </li>
          );
        }

        return display;
      },
      [data, isWrongDate]
    );

    const popOutOutput = memoDisplay(social, true, 'no', what, true);

    const newProps = {
      memoDisplay: memoDisplay(social, showIcons, showTrend, what),
      isWrongDate,
      what,
      popOutOutput,
      ...rest,
    };

    return (
      <FetchBoundary hook={hook} title={'Po krajih'}>
        <Component hook={hook} {...newProps} />
      </FetchBoundary>
    );
  };
  return WithMunicipalities;
}

export default withMunicipalitiesHOC(Municipalities);
