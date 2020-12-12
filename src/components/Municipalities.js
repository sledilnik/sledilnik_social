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
  const today = _.nth(props.data, -1);
  const yesterday = _.nth(props.data, -2);
  const d3 = _.nth(props.data, -3); // extended for calculation trends
  const d4 = _.nth(props.data, -4);
  const d5 = _.nth(props.data, -5);
  const d6 = _.nth(props.data, -6);
  const d7 = _.nth(props.data, -7);
  const d8 = _.nth(props.data, -8);

  const mun_today = today.regions;
  const mun_yesterday = yesterday.regions;
  const mun_d3 = d3.regions; // extended for calculation trends
  const mun_d4 = d4.regions;
  const mun_d5 = d5.regions;
  const mun_d6 = d6.regions;
  const mun_d7 = d7.regions;
  const mun_d8 = d8.regions;

  const all_numbers_today = calc_regions(mun_today);
  const all_numbers_yesterday = calc_regions(mun_yesterday);
  const all_numbers_d3 = calc_regions(mun_d3); // extended for calculation trends
  const all_numbers_d4 = calc_regions(mun_d4);
  const all_numbers_d5 = calc_regions(mun_d5);
  const all_numbers_d6 = calc_regions(mun_d6);
  const all_numbers_d7 = calc_regions(mun_d7);
  const all_numbers_d8 = calc_regions(mun_d8);

  const difference_since_yesterday = _.assignWith(
    all_numbers_today,
    all_numbers_yesterday,
    (today, yesterday) => today - yesterday, 
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
    let counter = 0
    let trend = 0
    let upDown = ""
    let outputTowns = []
    let outputTrends = []
   
    // fetch 7-d data for trend
    for (let j=0; j < towns.length; j++) {
      let townsPastWeek = [
      all_numbers_yesterday[towns[j]] - all_numbers_d3[towns[j]],
      all_numbers_d3[towns[j]] - all_numbers_d4[towns[j]],
      all_numbers_d4[towns[j]] - all_numbers_d5[towns[j]],
      all_numbers_d5[towns[j]] - all_numbers_d6[towns[j]],
      all_numbers_d6[towns[j]] - all_numbers_d7[towns[j]],
      all_numbers_d7[towns[j]] - all_numbers_d8[towns[j]],
    ]
      
      // calculate trend for every municipality
      for (let i=0; i < townsPastWeek.length;i++){
        trend += townsPastWeek[i]
      }
      trend = Math.round(trend / 7)
      
      // plot FB/TW friendly icons
      if (count < trend) {
        upDown = "📉"
      } else if (count > trend) {
        upDown = "📈"
      } else {
        upDown = "➖"
      }

      // fancy SVGs
      // if (count < trend) {
      //   upDown = "<img src='trend_down.svg' alt='trend_down' width='16px' height='auto'>"
      // } else if (count > trend) {
      //   upDown = "<img src='trend_up.svg' alt='trend_up' width='16px' height='auto'>"
      // } else {
      //   upDown = "<img src='trend_neutral.svg' alt='trend_neutral' width='16px' height='auto'>"
      // }

      outputTowns.push(towns[j])
      outputTrends.push(upDown) 
    }

    // generate HTML
    let outputLabel = ""
    for (var k = 0; k < outputTowns.length; k++) {
      outputLabel = outputLabel.concat(outputTowns[k])
      outputLabel = outputLabel.concat(" ")
      outputLabel = outputLabel.concat(outputTrends[counter])
      if (counter < outputTowns.length -1) {
        outputLabel = outputLabel.concat(", ")
      }
      counter++
    }
    outputLabel = outputLabel.concat(`<strong>&nbsp;+${count}<br></br></strong>`)



    return (
      <div key={count}>
        <span dangerouslySetInnerHTML={{ __html: outputLabel }}>
        </span>
      </div>
    );
  }).reverse();




  return display_values;
};
export default Municipalities;
