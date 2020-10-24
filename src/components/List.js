import React from 'react';
import Delta from './Delta';
import Percentage from './Percentage';
import Municipalities from './Municipalities';
import RandomGenerator from './RandomGenerator';
const List = (props) => {

  const { stats } = props;
  const { municipalities } = props;
  const { patients } = props;
  if (!stats || stats.length === 0) return <p>No data available, sorry!!!</p>;

  return (
    <div>
      
      <ul><p className="text">
        <span className="bold">#COVID19 SLO Update {stats[stats.length -1].day}.{stats[stats.length -1].month}.{stats[stats.length -1].year}
        </span></p></ul>
      <ul><p><RandomGenerator mode={"start"}></RandomGenerator></p></ul>
      <ul><p className="text">
        Rast novih potrjenih primerov: <span className="bold">+{stats[stats.length -2].positiveTests}</span>, 
        št. testiranih: <span className="bold">{stats[stats.length -2].performedTests}</span>, 
        delež pozitivnih testov: <Percentage part={stats[stats.length -2].positiveTests} total={stats[stats.length -2].performedTests}></Percentage>%.
      </p></ul>      
      <ul><p className="text">
        Št. vseh aktivnih primerov: <span className="bold">{stats[stats.length -2].cases.active}</span>  
        {' '}(+<span className="bold">{stats[stats.length -2].positiveTests}</span>, 
        -<Delta today={stats[stats.length -2].cases.recoveredToDate} yesterday={stats[stats.length -3].cases.recoveredToDate}></Delta>, 
        {' '}+<span className="bold">{stats[stats.length -1].statePerTreatment.deceased}</span> oseb preminulih), 
        skupno <span className="bold">{stats[stats.length -2].cases.confirmedToDate}</span> potrjenih primerov.
      </p></ul>
      <ul><p className="text">
        Hospitalizirani: <span className="bold">{stats[stats.length -1].statePerTreatment.inHospital}</span> oseb 
        (+<span className="bold">{patients[patients.length -1].total.inHospital.in}</span>, 
        {' '}-<span className="bold">{patients[patients.length -1].total.inHospital.out}</span>), 
        v intenzivni oskrbi <span className="bold">{stats[stats.length -1].statePerTreatment.inICU}</span> oseb (+
        <Delta today={stats[stats.length -1].statePerTreatment.inICU} yesterday={stats[stats.length -2].statePerTreatment.inICU}></Delta>).
      </p></ul>
      <ul><p className="text">
        Na respiratorju se zdravi <span className="bold">{stats[stats.length -1].statePerTreatment.critical}</span> oseb 
        (<Delta today={stats[stats.length -1].statePerTreatment.critical} yesterday={stats[stats.length -2].statePerTreatment.critical}></Delta>).
      </p></ul>
      <ul><p className="text">Preminuli: +<span className="bold">{stats[stats.length -1].statePerTreatment.deceased}</span>, skupaj: <span className="bold">{stats[stats.length -1].statePerTreatment.deceasedToDate}</span>.</p></ul>
      <ul><p className="text">
      Po starosti: 0-4 (<Delta today={stats[stats.length -2].statePerAgeToDate[0].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[0].allToDate}></Delta>), 
      5-14 (<Delta today={stats[stats.length -2].statePerAgeToDate[1].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[1].allToDate}></Delta>), 
      15-24 (<Delta today={stats[stats.length -2].statePerAgeToDate[2].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[2].allToDate}></Delta>), 
      25-34 (<Delta today={stats[stats.length -2].statePerAgeToDate[3].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[3].allToDate}></Delta>), 
      35-44 (<Delta today={stats[stats.length -2].statePerAgeToDate[4].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[4].allToDate}></Delta>), 
      45-54 (<Delta today={stats[stats.length -2].statePerAgeToDate[5].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[5].allToDate}></Delta>), 
      55-64 (<Delta today={stats[stats.length -2].statePerAgeToDate[6].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[6].allToDate}></Delta>), 
      65-74 (<Delta today={stats[stats.length -2].statePerAgeToDate[7].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[7].allToDate}></Delta>), 
      75-84 (<Delta today={stats[stats.length -2].statePerAgeToDate[8].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[8].allToDate}></Delta>), 
      85+ (<Delta today={stats[stats.length -2].statePerAgeToDate[9].allToDate} yesterday={stats[stats.length -3].statePerAgeToDate[9].allToDate}></Delta>).
      </p></ul>
      <ul><p className="text">
        Po krajih: <Municipalities data={municipalities}></Municipalities>.
      </p></ul>
      <ul><p><RandomGenerator mode={"end"}></RandomGenerator></p></ul>
      <ul><p className="text">#OstaniZdrav <span role="img" aria-label='s'>📲 + 👐🧼🚿,😷 ,🙎↔️↔️🙎‍♂️🙎↔️↔️🙎 & 🤞</span></p></ul>
    </div>
  );
};
export default List;