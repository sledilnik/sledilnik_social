import React from "react";
import _ from "lodash";
import MunicipalitiesDict from "../MunicipalitiesDict";

// { name: x, translation: X} becomes { x: { name: x, translation: X }}
const MunicipalitiesLookup = _.keyBy(MunicipalitiesDict, "name");

const calc_regions = (regions) => {
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

const Municipalities = (props) => {
  // set 16d for calculating 15d difference
  const today = _.nth(props.data, -1);
  const yesterday = _.nth(props.data, -2);
  const d3 = _.nth(props.data, -3); // extended for calculation trends
  const d4 = _.nth(props.data, -4);
  const d5 = _.nth(props.data, -5);
  const d6 = _.nth(props.data, -6);
  const d7 = _.nth(props.data, -7);
  const d8 = _.nth(props.data, -8);
  const d9 = _.nth(props.data, -9);
  const d10 = _.nth(props.data, -10);
  const d11 = _.nth(props.data, -11);
  const d12 = _.nth(props.data, -12);
  const d13 = _.nth(props.data, -13);
  const d14 = _.nth(props.data, -14);
  const d15 = _.nth(props.data, -15);
  const d16 = _.nth(props.data, -16);

  const mun_today = today.regions;
  const mun_yesterday = yesterday.regions;
  const mun_d3 = d3.regions; // extended for calculation trends
  const mun_d4 = d4.regions;
  const mun_d5 = d5.regions;
  const mun_d6 = d6.regions;
  const mun_d7 = d7.regions;
  const mun_d8 = d8.regions;
  const mun_d9 = d9.regions;
  const mun_d10 = d10.regions;
  const mun_d11 = d11.regions;
  const mun_d12 = d12.regions;
  const mun_d13 = d13.regions;
  const mun_d14 = d14.regions;
  const mun_d15 = d15.regions;
  const mun_d16 = d16.regions;

  const all_numbers_today = calc_regions(mun_today);
  const all_numbers_yesterday = calc_regions(mun_yesterday);
  const all_numbers_d3 = calc_regions(mun_d3); // extended for calculation trends
  const all_numbers_d4 = calc_regions(mun_d4);
  const all_numbers_d5 = calc_regions(mun_d5);
  const all_numbers_d6 = calc_regions(mun_d6);
  const all_numbers_d7 = calc_regions(mun_d7);
  const all_numbers_d8 = calc_regions(mun_d8);
  const all_numbers_d9 = calc_regions(mun_d9);
  const all_numbers_d10 = calc_regions(mun_d10);
  const all_numbers_d11 = calc_regions(mun_d11);
  const all_numbers_d12 = calc_regions(mun_d12);
  const all_numbers_d13 = calc_regions(mun_d13);
  const all_numbers_d14 = calc_regions(mun_d14);
  const all_numbers_d15 = calc_regions(mun_d15);
  const all_numbers_d16 = calc_regions(mun_d16);

  const difference_since_yesterday = _.assignWith(
    all_numbers_today,
    all_numbers_yesterday,
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

    let trend = 0;
    let upDown = "";
    let outputTowns = [];
    let outputTrends = [];

    // fetch 7-d data for trend
    for (let j = 0; j < towns.length; j++) {
      let townsDeltas = [
        all_numbers_today[towns[j]],
        all_numbers_yesterday[towns[j]] - all_numbers_d3[towns[j]],
        all_numbers_d3[towns[j]] - all_numbers_d4[towns[j]],
        all_numbers_d4[towns[j]] - all_numbers_d5[towns[j]],
        all_numbers_d5[towns[j]] - all_numbers_d6[towns[j]],
        all_numbers_d6[towns[j]] - all_numbers_d7[towns[j]],
        all_numbers_d7[towns[j]] - all_numbers_d8[towns[j]],
        all_numbers_d8[towns[j]] - all_numbers_d9[towns[j]],
        all_numbers_d9[towns[j]] - all_numbers_d10[towns[j]],
        all_numbers_d10[towns[j]] - all_numbers_d11[towns[j]],
        all_numbers_d11[towns[j]] - all_numbers_d12[towns[j]],
        all_numbers_d12[towns[j]] - all_numbers_d13[towns[j]],
        all_numbers_d13[towns[j]] - all_numbers_d14[towns[j]],
        all_numbers_d14[towns[j]] - all_numbers_d15[towns[j]],
        all_numbers_d15[towns[j]] - all_numbers_d16[towns[j]],
      ];

      // calculate trend for every municipality
      let y1 = 0;
      for (let i = 8; i < 15; i++) {
        y1 += townsDeltas[i];
      }
      let y2 = 0;
      for (let i = 4; i < 11; i++) {
        y2 += townsDeltas[i];
      }
      let y3 = 0;
      for (let i = 0; i < 7; i++) {
        y3 += townsDeltas[i];
      }

      if (y1 === 0 || y2 === 0 || y3 === 0) {
        trend = "no";
      } else {
        trend = (Math.log(y1) + 3 * Math.log(y3) - 4 * Math.log(y2)) / 8;
      }

      //       red = log(y1*y3^3/y2^4) / 8
      // y1=vsota novih primerov za dneve (-14..-8)
      // y2=vsota novih primerov za dneve (-10..-4)
      // y3=vsota novih primerov za dneve (-6..0)

      // OLD
      // let today7d = 0;
      // let yesterday7d = 0;
      // // 7 days from today
      // for (let i = 0; i <= 13; i++) {
      //   today7d += townsDifferences[i];
      // }
      // // 7 days from yesterday
      // for (let i = 1; i <= 13; i++) {
      //   yesterday7d += townsDifferences[i];
      // }
      // // compare
      // trend = today7d - yesterday7d;

      if (props.showTrend === "y") {
        // plot FB/TW friendly icons
        if (trend < -0.03) {
          upDown = "⤵ ";
        } else if (trend > 0.03) {
          upDown = "⤴ ";
        } else if (trend === "no") {
          upDown = "";
        } else if (trend >= -0.03 || trend <= 0.03) {
          upDown = "➖ ";
        } else {
          upDown = "... ";
        }
      } else {
        upDown = `<i>${
          Math.round((trend + Number.EPSILON) * 100000) / 100000
        }</i> `;
      }

      // fancy SVGs
      // if (count < trend) {
      //   upDown = "<img src='trend_down.svg' alt='trend_down' width='16px' height='auto'>"
      // } else if (count > trend) {
      //   upDown = "<img src='trend_up.svg' alt='trend_up' width='16px' height='auto'>"
      // } else {
      //   upDown = "<img src='trend_neutral.svg' alt='trend_neutral' width='16px' height='auto'>"
      // }

      // OLD ICONS
      // if (trend < 0) {
      //   upDown = "📉"
      // } else if (trend > 0) {
      //   upDown = "📈"
      // } else {
      //   upDown = "➖"
      // }

      outputTowns.push(towns[j]);
      outputTrends.push(upDown);
    }

    // generate HTML output
    let outputLabel = "";
    for (var k = 0; k < outputTowns.length; k++) {
      outputLabel = outputLabel.concat(outputTowns[k]);
      outputLabel = outputLabel.concat(" ");
      outputLabel = outputLabel.concat(
        outputTrends[k] === "" ? "" : outputTrends[k]
      ); // remove NaN that reside in an array due to y1-y3 being 0
      if (k < outputTowns.length - 1) {
        outputLabel = outputLabel.concat(", ");
      }
    }
    outputLabel = outputLabel.concat(
      `<strong>&nbsp;+${count}<br></br></strong>`
    );

    return (
      <div key={count}>
        <span dangerouslySetInnerHTML={{ __html: outputLabel }}></span>
      </div>
    );
  }).reverse();

  return display_values;
};

export default Municipalities;
