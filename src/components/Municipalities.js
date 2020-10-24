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
          regions[region][town].activeCases;
      }
      return town_box;
    }, {});
    return { ...region_numbers_today, ...region_box };
  }, {});

  return result;
};

const Municipalities = (props) => {
  const today = props.data.pop();
  const yesterday = props.data.pop();

  const mun_today = today.regions;
  const mun_yesterday = yesterday.regions;
  const all_numbers_today = calc_regions(mun_today);
  const all_numbers_yesterday = calc_regions(mun_yesterday);

  // DESC order arrays
  console.log("all_numbers_today", all_numbers_today);
  console.log("all_numbers_today", all_numbers_yesterday);

  const difference_since_yesterday = _.assignWith(
    all_numbers_today,
    all_numbers_yesterday,
    (today, yesterday) => today - yesterday
  );

  console.log("difference_since_yesterday", difference_since_yesterday);

  const difference_as_array = _.toPairs(difference_since_yesterday) // { ljubljana: 10, maribor: 8 } becomes [['ljubljana', 10], ['maribor', 8]]
    .sort((a, b) => a[1] - b[1])
    .reverse();

  const display_values = difference_as_array.map(([town, count]) =>
    count > 1 ? `${town} +${count}` : `${town}`
  );

  const display_final = display_values.join(", ");

  return <span>{display_final}</span>;
};
export default Municipalities;
