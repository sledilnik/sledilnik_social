import React, { useContext, useState, useCallback, useRef } from 'react';
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

const get15dTrendIconKey = num => {
  if (num >= -0.03 && num <= 0.03) {
    return 'between';
  }
  if (num < -0.03) {
    return 'down';
  }
  if (num > 0.03) {
    return 'up';
  }
  if (num === 'no') {
    return 'no';
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
  trend15: get15dTrendIconKey,
  weeklyGrowth: getWeeklyGrowthIconKey,
};

const setPlatformFriendlyIcon = (
  iconsVersion = 'FB',
  num,
  what = 'weeklyGrowth'
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

const Municipalities = ({ isWrongDate, memoDisplay, ...props }) => {
  const ref = useRef();
  const [showPopOut, setShowPopOut] = useState(false);

  const onListClickHandler = () => {
    setShowPopOut(true);
  };

  const onClosePopOutHandler = () => {
    setShowPopOut(false);
  };

  return (
    <details ref={ref} open={true}>
      <summary className="summary-with-after">
        <DataRow markFail={isWrongDate}>Po krajih:</DataRow>
      </summary>
      <ul onClickCapture={onListClickHandler}>{memoDisplay}</ul>
      <MunPopOut
        open={showPopOut}
        onCancel={onClosePopOutHandler}
        output={props.popoutOutput}
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

const get15dTrend = deltas => {
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

const get15dTownTrend = calculatedPerDayRegions => town => {
  // prepare data to calculate trend
  const deltas = getDeltas(town, calculatedPerDayRegions).filter(
    item => item !== null
  );
  const trend = get15dTrend(deltas);
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
  trend15: get15dTownTrend,
  weeklyGrowth: getTownWeeklyGrowth,
};

function withMunicipalitiesHOC(Component) {
  const WithMunicipalities = ({
    showIcons,
    what = 'weeklyGrowth',
    showTrend,
    noTooltip = false,
    ...rest
  }) => {
    const hasFunc = GetFunc.hasOwnProperty(what);
    if (!hasFunc) {
      throw new Error(`Missing function for keyword: ${what}!`);
    }
    const mapFunc = GetFunc[what];
    const isFunc = mapFunc instanceof Function;
    if (!isFunc) {
      throw new Error(`${mapFunc} is not a function!`);
    }

    const { municipalities: hook } = useContext(DataContext);
    const { social } = useContext(SocialContext);

    const data = hook.data && getMunicipalitiesData(hook.data, mapFunc);

    const isWrongDate =
      hook.data &&
      differenceInDays(new Date(), getDate(hook.data.slice(-1).pop())) > 1;

    const memoDisplay = useCallback(
      (social, showIcons, what, noTooltip, showTrend = false) => {
        const display = [];
        if (!data) {
          return display;
        }

        for (const [count, townsByDiff] of data) {
          const sameDiffTownsLabel = townsByDiff.map(town => {
            const icon = showIcons
              ? setPlatformFriendlyIcon(social, town.trend, what)
              : '';

            const formatedTrend =
              what === 'weeklyGrowth'
                ? formatPercentage(town.trend)
                : isNaN(town.trend)
                ? '-'
                : Math.round((town.trend + Number.EPSILON) * 100000) / 100000;
            const formatedCount = formatNumberWithSign(count);

            return (
              <span key={town.key}>
                {noTooltip ? (
                  <span>
                    {town.name} {showTrend && formatedTrend} {icon}
                  </span>
                ) : (
                  <TextWithTooltip
                    className="up"
                    text={`${town.name} ${
                      showTrend ? formatedTrend : ''
                    } ${icon}`}
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

    const popoutOutput = memoDisplay(social, true, what, true, true);

    const newProps = {
      memoDisplay: memoDisplay(social, showIcons, what, noTooltip, showTrend),
      isWrongDate,
      what,
      popoutOutput,
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
