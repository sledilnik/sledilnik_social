import React from 'react';
import Delta from './Delta';
import Percentage from './Percentage';
import Municipalities from './Municipalities';
import Translate from './Translate';
// import RandomGenerator from './RandomGenerator'; // for "moralec" :)
const List = (props) => {

  const { stats } = props;
  const { municipalities } = props;
  const { patients } = props;
  
  if (!stats || stats.length === 0) return <p>Napaka: API ne vrača podatkov, refresh page !!!</p>;

  // prepare hospitalsDict
  const { hospitalsList } = props;
  let hospitalsDict = []
  for (let i = 0; i < hospitalsList.length; i++) {
    hospitalsDict.push([hospitalsList[i].code, hospitalsList[i].name])
  }

  // prepare perHospitalChanges
  const perHospitalChanges = Object.entries(patients[13].facilities)
  for (let i = 0; i < perHospitalChanges.length ; i++) {
    for (let j= 0; j < hospitalsDict.length; j++){
      if (perHospitalChanges[i][0] === hospitalsDict[j][0]) {
        perHospitalChanges[i].push(hospitalsDict[j][1])
      }
    }
  }

console.log(patients[13].facilities)

  // const datestamps
  const today = parseInt(new Date().getFullYear().toString()+(new Date().getMonth()+1).toString()+new Date().getDate().toString());
  const statsCheck = stats[stats.length -1].year.toString()+stats[stats.length -1].month.toString()+stats[stats.length -1].day.toString();
  const municipalitiesCheck = parseInt(municipalities[municipalities.length -1].year.toString()+municipalities[municipalities.length -1].month.toString()+municipalities[municipalities.length -1].day.toString());
  //const patientsCheck = patients[patients.length -1].year.toString()+patients[patients.length -1].month.toString()+patients[patients.length -1].day.toString();
  
  // paint red if data is not updated for the current day
  var paint_mun = "a";
  var paint_stats = "a";
  var paint_stats_age = "a";

  if ((today-statsCheck) > 0) {
    paint_stats = "red"
  }
  if ((today-municipalitiesCheck) > 1) {
    paint_mun = "red"
  }
  if (stats[stats.length -2].statePerAgeToDate[0].allToDate === null || (today-statsCheck) > 0) {
    paint_stats_age = "red"
  }

  return (
    <div>

      <span className={paint_stats}>
      <p className="text">
        <span className="bold">#COVID19 SLO Update {stats[stats.length -1].day}.{stats[stats.length -1].month}.{stats[stats.length -1].year}
        </span></p>
      {/* <p><RandomGenerator mode={"start"}></RandomGenerator></p> */}
              
      <p className="text">
      <span role="img" aria-label='s'>➡️</span> Št. vseh aktivnih primerov: <span className="bold">{stats[stats.length -2].cases.active}</span>  
        {' '}(+<span className="bold">{stats[stats.length -2].positiveTests}</span>, 
        -<Delta today={stats[stats.length -2].cases.recoveredToDate} yesterday={stats[stats.length -3].cases.recoveredToDate} noChanges={true}></Delta>, 
        {' '}+<span className="bold">{stats[stats.length -1].statePerTreatment.deceased}</span> <Translate text={"preminula oseba"} number={stats[stats.length -1].statePerTreatment.deceased}></Translate>), 
        skupno <span className="bold">{stats[stats.length -2].cases.confirmedToDate}</span> potrjenih primerov.
      </p>
      <p className="text">
      <span role="img" aria-label='s'>➡️</span> Hospitalizirani: <span className="bold">{stats[stats.length -1].statePerTreatment.inHospital}</span> <Translate text={"oseba"} number={stats[stats.length -1].statePerTreatment.inHospital}></Translate>{' '} 
        (+<span className="bold">{patients[patients.length -1].total.inHospital.in}</span>, 
        {' '}-<span className="bold">{patients[patients.length -1].total.inHospital.out}</span>), 
        v intenzivni oskrbi <span className="bold">{stats[stats.length -1].statePerTreatment.inICU}</span> <Translate text={"oseba"} number={stats[stats.length -1].statePerTreatment.inICU}></Translate>{' '} (
        <Delta today={stats[stats.length -1].statePerTreatment.inICU} yesterday={stats[stats.length -2].statePerTreatment.inICU}  getPrefix={true} noChanges={true}></Delta>).
      </p>
      <p className="text">
      <span role="img" aria-label='s'>➡️</span> Na respiratorju (intubirani) se <Translate text={"zdravi"} number={stats[stats.length -1].statePerTreatment.critical}></Translate> <span className="bold">{stats[stats.length -1].statePerTreatment.critical}</span> 
      {' '}<Translate text={"oseba"} number={stats[stats.length -1].statePerTreatment.critical}></Translate>{' '}        
        (<Delta today={stats[stats.length -1].statePerTreatment.critical} yesterday={stats[stats.length -2].statePerTreatment.critical} getPrefix={true} noChanges={true}></Delta>).
      </p>
      <p className="text"><span role="img" aria-label='s'>➡️</span> Preminuli: {(stats[stats.length -1].statePerTreatment.deceased > 0)?"+":""}<span className="bold">{stats[stats.length -1].statePerTreatment.deceased}</span> <Translate text={"oseba"} number={stats[stats.length -1].statePerTreatment.deceased}></Translate>, skupaj: <span className="bold">{stats[stats.length -1].statePerTreatment.deceasedToDate}</span>.</p>
      <br />
      <p className="text">
      <span role="img" aria-label='s'>➡️</span> Rast novih potrjenih primerov: <span className="bold">+{stats[stats.length -2].positiveTests}</span>, 
        št. testiranih: <span className="bold">{stats[stats.length -2].performedTests}</span>*, 
        delež pozitivnih testov: <Percentage part={stats[stats.length -2].positiveTests} total={stats[stats.length -2].performedTests}></Percentage>%. (*samo pozitivni testi iz laboratorija)
      </p>
      <p className="text">
        <span role="img" aria-label='s'>➡️</span> 14-dnevna pojavnost na 100.000 prebivalcev: <span className="bold">+{Math.round(stats[stats.length -2].cases.active*100000/2095861)}</span> (
          <Percentage part={Math.round(stats[stats.length -2].cases.active*100000/2095861)} total={Math.round(stats[stats.length -3].cases.active*100000/2095861)} getPrefix={true} minus1={true}></Percentage>%). 
      </p>

      <span>
      <p className="text"><span role="img" aria-label='s'>➡️</span> Stanje po bolnišnicah:</p>
      <ul>
      {perHospitalChanges
      .sort((a, b) => { return b[1].inHospital.today - a[1].inHospital.today})
      .map(hosp => {
        return hosp[1].inHospital.today === undefined ?  "" :  <li key={hosp[0]}><span><span className="bold">
          {hosp[2]}</span>: 
          skupaj se zdravi <span className="bold">{hosp[1].inHospital.today}</span> <Translate text={"oseba"} number={hosp[1].inHospital.today}></Translate> 
          {' '}(<span className="bold">+{hosp[1].inHospital.in} -{hosp[1].inHospital.out}</span>), 
          ICU <span className="bold">{hosp[1].icu.today}</span> <Translate text={"oseba"} number={hosp[1].icu.today}></Translate> 
          {' '}(<span className="bold">+{hosp[1].icu.in} -{hosp[1].icu.out}</span>). 
          </span><br /><br /> 
          </li>
      })
      }
      </ul>
      </span>

      </span>
      <br />
      <span className={paint_stats_age}>
      <p className="text">
      <span role="img" aria-label='s'>➡️</span>Novookuženi po starosti: 0-4 (<Delta today={stats[stats.length -2].statePerAgeToDate[0].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[0].allToDate}></Delta>), 
      5-14 (<Delta today={stats[stats.length -2].statePerAgeToDate[1].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[1].allToDate}></Delta>), 
      15-24 (<Delta today={stats[stats.length -2].statePerAgeToDate[2].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[2].allToDate}></Delta>), 
      25-34 (<Delta today={stats[stats.length -2].statePerAgeToDate[3].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[3].allToDate}></Delta>), 
      35-44 (<Delta today={stats[stats.length -2].statePerAgeToDate[4].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[4].allToDate}></Delta>), 
      45-54 (<Delta today={stats[stats.length -2].statePerAgeToDate[5].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[5].allToDate}></Delta>), 
      55-64 (<Delta today={stats[stats.length -2].statePerAgeToDate[6].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[6].allToDate}></Delta>), 
      65-74 (<Delta today={stats[stats.length -2].statePerAgeToDate[7].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[7].allToDate}></Delta>), 
      75-84 (<Delta today={stats[stats.length -2].statePerAgeToDate[8].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[8].allToDate}></Delta>), 
      85+ (<Delta today={stats[stats.length -2].statePerAgeToDate[9].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[9].allToDate}></Delta>).
      </p>
      </span>
      <br />
      <p className="text">
      <span role="img" aria-label='s'>➡️</span> Po krajih: 
      </p>
      <ul className="municipalities">      
      <span className={paint_mun}>
      <Municipalities data={municipalities}></Municipalities></span></ul>

      <p>Legenda trenda (primerjava današnjega stanja novookuženih glede na 7-dnevno povprečje):</p>
      <p>- Trend novookuženih pada <span role="img" aria-label="up">📉</span></p>
      <p>- Ni sprememb <span role="img" aria-label="neutral">➖</span></p>
      <p>- Trend novookuženih raste <span role="img" aria-label="down">📈</span></p>
      
      {/* <p><RandomGenerator mode={"end"}></RandomGenerator></p> */}
      <p className="text">#OstaniZdrav <span role="img" aria-label='s'>📲 + 👐🧼🚿,😷 ,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 & 🤞</span></p>
    </div>
  );
};
export default List;