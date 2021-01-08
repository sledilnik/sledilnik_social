import React from 'react';
import Intro from './Intro';
import Outro from './Outro';
import FirstTweet from './Tweets/FirstTweet';
import SecondTweet from './Tweets/SecondTweet';
import ThirdTweet from './Tweets/ThirdTweet';

import ThirdTweetMarkoB from './NewFeat-MarkoB/ReorderThirdTweet';
import Legend from './Legend';

const List = props => {
  const { stats } = props;
  const { municipalities } = props;
  const { patients } = props;
  const { labTests } = props;
  const { summary } = props;

  if (!stats || stats.length === 0)
    return <p>Napaka: API ne vrača podatkov, refresh page !!!</p>;

  // prepare hospitalsDict
  const { hospitalsList } = props;
  let hospitalsDict = [];
  for (let i = 0; i < hospitalsList.length; i++) {
    hospitalsDict.push([hospitalsList[i].code, hospitalsList[i].name]);
  }

  // prepare perHospitalChanges

  const perHospitalChanges =
    patients[patients.length - 1] === undefined
      ? 'NI PODATKOV'
      : Object.entries(patients[patients.length - 1].facilities);
  for (let i = 0; i < perHospitalChanges.length; i++) {
    for (let j = 0; j < hospitalsDict.length; j++) {
      if (perHospitalChanges[i][0] === hospitalsDict[j][0]) {
        perHospitalChanges[i].push(hospitalsDict[j][1]);
      }
    }
  }

  // const datestamps
  const todayDate = parseInt(
    new Date().getFullYear().toString() +
      (new Date().getMonth() + 1).toString() +
      new Date().getDate().toString()
  );

  const patientsDate =
    patients[patients.length - 1].year.toString() +
    patients[patients.length - 1].month.toString() +
    patients[patients.length - 1].day.toString();
  const statsDate =
    stats[stats.length - 1].year.toString() +
    stats[stats.length - 1].month.toString() +
    stats[stats.length - 1].day.toString();
  const municipalitiesDate = parseInt(
    municipalities[municipalities.length - 1].year.toString() +
      municipalities[municipalities.length - 1].month.toString() +
      municipalities[municipalities.length - 1].day.toString()
  );
  const summaryDate =
    summary.testsToday.year.toString() +
    summary.testsToday.month.toString() +
    summary.testsToday.day.toString();
  //const patientsCheck = patients[patients.length -1].year.toString()+patients[patients.length -1].month.toString()+patients[patients.length -1].day.toString();

  // let introTodayDate = `${stats[stats.length - 1].day}.${
  //   stats[stats.length - 1].month
  // }.${stats[stats.length - 1].year}`;

  let introTodayDate =
    new Date().getDate().toString() +
    '.' +
    (new Date().getMonth() + 1).toString() +
    '.' +
    new Date().getFullYear().toString();

  // paint red if data is not updated for the current day
  var check_first = '';
  var check_second = '';
  var check_third_age = '';
  var check_third_mun = '';

  if (todayDate - summaryDate === -1) {
    check_first = 'red';
  }
  if (todayDate - patientsDate > 0) {
    check_second = 'red';
  }
  if (
    stats[stats.length - 2].statePerAgeToDate[0].allToDate === undefined ||
    todayDate - statsDate > 0
  ) {
    check_third_age = 'red';
  }
  if (true) {
  }
  if (todayDate - municipalitiesDate > 1) {
    check_third_mun = 'red';
  }

  // render app
  return (
    <div>
      {' '}
      <Intro post={1} introTodayDate={introTodayDate} />
      <FirstTweet
        check_first={check_first}
        labTests={labTests}
        summary={summary}
      />
      <Outro />
      <br />
      <br />
      <Intro post={2} introTodayDate={introTodayDate} />
      <SecondTweet
        check_second={check_second}
        stats={stats}
        patients={patients}
      />
      <Outro />
      <br />
      <br />
      <Intro post={3} introTodayDate={introTodayDate} />
      <ThirdTweet
        check_first={check_first}
        check_second={check_second}
        check_third_age={check_third_age}
        check_third_mun={check_third_mun}
        labTests={labTests}
        summary={summary}
        stats={stats}
        patients={patients}
        municipalities={municipalities}
        perHospitalChanges={perHospitalChanges}
      />
      <Outro />
      <br />
      <br />
      <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
      <br />
      <br />
      <h2>Legenda</h2>
      <Legend municipalities={municipalities} />
      {/* TODO Delete before master merge */}
      {/* Next time create playground in new branch */}
      <div style={{ marginTop: '40px' }}>
        <hr />
        <h2>Future Features</h2>
        <h3>asked by: MarkoB</h3>
        <p>Reorder lines. Move per age cases before embedded second tweet.</p>
        <hr />
        <Intro post={3} introTodayDate={introTodayDate} />
        <ThirdTweetMarkoB
          check_first={check_first}
          check_second={check_second}
          check_third_age={check_third_age}
          check_third_mun={check_third_mun}
          labTests={labTests}
          summary={summary}
          stats={stats}
          patients={patients}
          municipalities={municipalities}
          perHospitalChanges={perHospitalChanges}
        />
        <Outro />
        <br />
        <br />
      </div>
    </div>
  );
};
export default List;
