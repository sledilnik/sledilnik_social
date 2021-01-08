import React from 'react';
import Municipalities from './Municipalities';
import Intro from './Intro';
import Outro from './Outro';
import FirstTweet from './Tweets/FirstTweet';
import SecondTweet from './Tweets/SecondTweet';
import ThirdTweet from './Tweets/ThirdTweet';

import ThirdTweetMarkoB from './NewFeat-MarkoB/ReorderThirdTweet';

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
      <p className="bold">
        Legenda trenda rasti potrjenih primerov v posamezni občini:
      </p>
      <p>
        - Trend potrjenih primerov v občini pada{' '}
        <span role="img" aria-label="up">
          ⤵
        </span>
      </p>
      <p>
        - Ni sprememb v trendu potrjenih primerov{' '}
        <i>(trend v območju -0,03 do +0,03)</i>{' '}
        <span role="img" aria-label="neutral">
          ➖
        </span>
      </p>
      <p>
        - Trend potrjenih primerov v občini raste{' '}
        <span role="img" aria-label="down">
          ⤴
        </span>
      </p>
      <p>
        - Trenda ni mogoče izračunati : ni simbola (ena od vrednosti y1, y2, y3
        je enaka 0)
      </p>
      <br />
      <br />
      <p className="bold">Formula za izračun trenda</p>
      <p>trend = ( log(y1)+3*log(y3) - 4*log(y2) ) / 8</p>
      <p>..</p>
      <p>y1=vsota novih primerov za dneve (-14..-8)</p>
      <p>y2=vsota novih primerov za dneve (-10..-4)</p>
      <p>y3=vsota novih primerov za dneve (-6..0)</p>
      <br />
      <br />
      <p className="bold">Občine CHECK ratio</p>
      <ul className="municipalities">
        <Municipalities data={municipalities} showTrend="n"></Municipalities>
      </ul>
      <div style={{ marginTop: '40px' }}>
        <hr />
        <h2>Future Features</h2>
        <h3>asked by: MarkoB</h3>
        <p>Reorder lines. Move per age cases before embed second tweet.</p>
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
