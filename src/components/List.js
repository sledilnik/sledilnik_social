import React from 'react';
import Delta from './Delta';
import Percentage from './Percentage';
import Municipalities from './Municipalities';
import Translate from './Translate';
import Intro from './Intro';
import Outro from './Outro';
import Arrow from './Arrow';
import Separator from './Separator';

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

  // render tweets

  function FirstTweet() {
    return (
      <div className={check_first}>
        <p className="text">
          <Arrow /> PCR:{' '}
          <span className="bold">
            +
            <Separator
              number={labTests[labTests.length - 1].data.regular.positive.today}
            />
          </span>
          , testiranih:{' '}
          <span className="bold">
            <Separator
              number={
                labTests[labTests.length - 1].data.regular.performed.today
              }
            />
          </span>
          , delež pozitivnih:{' '}
          <Percentage
            part={labTests[labTests.length - 1].data.regular.positive.today}
            total={labTests[labTests.length - 1].data.regular.performed.today}
          ></Percentage>
          %.
        </p>

        <p className="text">
          <Arrow /> HAT:{' '}
          <span className="bold">
            +
            <Separator
              number={labTests[labTests.length - 1].data.hagt.positive.today}
            />
          </span>
          , testiranih:{' '}
          <span className="bold">
            <Separator
              number={labTests[labTests.length - 1].data.hagt.performed.today}
            />
          </span>
          , delež pozitivnih:{' '}
          <Percentage
            part={labTests[labTests.length - 1].data.hagt.positive.today}
            total={labTests[labTests.length - 1].data.hagt.performed.today}
          ></Percentage>
          %.
        </p>

        <p className="text">
          <Arrow /> Aktivni primeri:{' '}
          <span className="bold">
            <Separator number={summary.casesActive.value} />
          </span>{' '}
          (+
          <span className="bold">
            <Separator number={summary.casesActive.subValues.in} />
          </span>
          , -
          <span className="bold">
            <Separator number={summary.casesActive.subValues.out} />
          </span>
          ).
          {/* , +
          <span className="bold">
            {stats[stats.length - 1].statePerTreatment.deceased}
          </span>{" "}
          <Translate
            text={"preminula oseba"}
            number={stats[stats.length - 1].statePerTreatment.deceased}
          ></Translate> */}
          {/* ), skupno{" "}
          <span className="bold">
            <Separator number={stats[stats.length - 2].cases.confirmedToDate} />
          </span>{" "}
          potrjenih primerov. */}
        </p>
      </div>
    );
  }

  function SecondTweet() {
    return (
      <div className={check_second}>
        <p className="text">
          <Arrow /> Hospitalizirani:{' '}
          <span className="bold">
            <Separator
              number={stats[stats.length - 1].statePerTreatment.inHospital}
            />
          </span>{' '}
          <Translate
            text={'oseba'}
            number={stats[stats.length - 1].statePerTreatment.inHospital}
          ></Translate>{' '}
          (+
          <span className="bold">
            <Separator
              number={patients[patients.length - 1].total.inHospital.in}
            />
          </span>
          , -
          <span className="bold">
            <Separator
              number={patients[patients.length - 1].total.inHospital.out}
            />
          </span>
          ), v EIT{' '}
          <span className="bold">
            <Separator
              number={stats[stats.length - 1].statePerTreatment.inICU}
            />
          </span>{' '}
          <Translate
            text={'oseba'}
            number={stats[stats.length - 1].statePerTreatment.inICU}
          ></Translate>{' '}
          (
          <Delta
            today={stats[stats.length - 1].statePerTreatment.inICU}
            yesterday={stats[stats.length - 2].statePerTreatment.inICU}
            getPrefix={true}
            noChanges={true}
          ></Delta>
          ).
        </p>

        <p className="text">
          <Arrow /> Na respiratorju (intubirani) se{' '}
          <Translate
            text={'zdravi'}
            number={stats[stats.length - 1].statePerTreatment.critical}
          ></Translate>{' '}
          <span className="bold">
            <Separator
              number={stats[stats.length - 1].statePerTreatment.critical}
            />
          </span>{' '}
          <Translate
            text={'oseba'}
            number={stats[stats.length - 1].statePerTreatment.critical}
          ></Translate>{' '}
          (
          <Delta
            today={stats[stats.length - 1].statePerTreatment.critical}
            yesterday={stats[stats.length - 2].statePerTreatment.critical}
            getPrefix={true}
            noChanges={true}
          ></Delta>
          ).
        </p>

        <p className="text">
          <Arrow /> Preminuli:{' '}
          {stats[stats.length - 1].statePerTreatment.deceased > 0 ? '+' : ''}
          <span className="bold">
            <Separator
              number={stats[stats.length - 1].statePerTreatment.deceased}
            />
          </span>{' '}
          <Translate
            text={'oseba'}
            number={stats[stats.length - 1].statePerTreatment.deceased}
          ></Translate>
          , skupaj:{' '}
          <span className="bold">
            <Separator
              number={stats[stats.length - 1].statePerTreatment.deceasedToDate}
            />
          </span>
          .
        </p>
      </div>
    );
  }

  function ThirdTweet() {
    return (
      <div>
        {/* <p className="text">
        <Arrow /> 14-dnevna pojavnost na 100.000 prebivalcev:{" "}
        <span className="bold">
          +
          {Math.round(
            (stats[stats.length - 2].cases.active * 100000) / 2095861
          )}
        </span>{" "}
        (
        <Percentage
          part={Math.round(
            (stats[stats.length - 2].cases.active * 100000) / 2095861
          )}
          total={Math.round(
            (stats[stats.length - 3].cases.active * 100000) / 2095861
          )}
          getPrefix={true}
          minus1={true}
        ></Percentage>
        %).
      </p> */}
        <span className={check_second}>
          <p className="text">
            <Arrow /> Stanje po bolnišnicah:
          </p>
          <ul>
            {patients[patients.length - 1] === undefined
              ? 'NI PODATKOV'
              : perHospitalChanges
                  .sort(
                    (a, b) =>
                      (b[1].inHospital.today || 0) -
                      (a[1].inHospital.today || 0)
                  )
                  .map(hosp => {
                    return hosp[1].inHospital.today === undefined ? (
                      ''
                    ) : (
                      <li key={hosp[0]}>
                        <span>
                          <span className="bold">{hosp[2]}</span>:{' '}
                          <span className="bold">
                            <Separator number={hosp[1].inHospital.today} />
                          </span>{' '}
                          <Translate
                            text={'oseba'}
                            number={hosp[1].inHospital.today}
                          ></Translate>{' '}
                          (
                          <span className="bold">
                            +<Separator number={hosp[1].inHospital.in} /> -
                            <Separator number={hosp[1].inHospital.out} />
                          </span>
                          ), EIT{' '}
                          <span className="bold">
                            <Separator number={hosp[1].icu.today} />
                          </span>{' '}
                          <Translate
                            text={'oseba'}
                            number={hosp[1].icu.today}
                          ></Translate>{' '}
                          (
                          <span className="bold">
                            +
                            <Separator number={hosp[1].icu.in} /> -
                            <Separator number={hosp[1].icu.out} />
                          </span>
                          ).
                        </span>
                        <br />
                      </li>
                    );
                  })}
          </ul>
        </span>

        <span className={check_third_mun}>
          <p className="text">
            <Arrow /> Po krajih:
          </p>
          <ul className="municipalities">
            <Municipalities
              data={municipalities}
              showTrend="y"
              icons="FB"
            ></Municipalities>
          </ul>
          <Outro />
          <br />
          <br />
          <p className="text">
            <Arrow /> Po krajih:
          </p>
          <ul className="municipalities">
            <Municipalities
              data={municipalities}
              showTrend="y"
              icons="TW"
            ></Municipalities>
          </ul>
        </span>
      </div>
    );
  }

  // render app
  return (
    <div>
      {' '}
      <Intro post={1} introTodayDate={introTodayDate} />
      {FirstTweet()}
      <Outro />
      <br />
      <br />
      <Intro post={2} introTodayDate={introTodayDate} />
      {SecondTweet()}
      <Outro />
      <br />
      <br />
      <Intro post={3} introTodayDate={introTodayDate} />
      {FirstTweet()}
      <p className="text">
        <Arrow /> Skupaj cepljenih oseb:{' '}
        <span className="bold">
          <Separator
            number={stats[stats.length - 2].vaccination.administered.toDate}
          />{' '}
          (+
          <Separator
            number={stats[stats.length - 2].vaccination.administered.today}
          />
          ).
        </span>
      </p>
      <Arrow /> Skupaj{' '}
      <span className="bold">
        <Separator number={stats[stats.length - 2].cases.confirmedToDate} />
      </span>{' '}
      potrjenih primerov.
      <span className={check_third_age}>
        <p className="text">
          <Arrow /> Potrjeni primeri po starosti: 0-4 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[0].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[0].allToDate}
          ></Delta>
          ), 5-14 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[1].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[1].allToDate}
          ></Delta>
          ), 15-24 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[2].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[2].allToDate}
          ></Delta>
          ), 25-34 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[3].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[3].allToDate}
          ></Delta>
          ), 35-44 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[4].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[4].allToDate}
          ></Delta>
          ), 45-54 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[5].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[5].allToDate}
          ></Delta>
          ), 55-64 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[6].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[6].allToDate}
          ></Delta>
          ), 65-74 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[7].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[7].allToDate}
          ></Delta>
          ), 75-84 (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[8].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[8].allToDate}
          ></Delta>
          ), 85+ (
          <Delta
            today={stats[stats.length - 2].statePerAgeToDate[9].allToDate}
            yesterday={stats[stats.length - 3].statePerAgeToDate[9].allToDate}
          ></Delta>
          ).
        </p>
      </span>
      {SecondTweet()}
      {ThirdTweet()}
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
    </div>
  );
};
export default List;
