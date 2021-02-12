import React, { useContext } from 'react';

import Card from './Card';
import Post from './Post';

import PCR from './PCR';
import HAT from './HAT';
import ActiveCases from './ActiveCases';

import Hospitalized from './Hospitalized';
import OnRespiratory from './OnRespiratory';
import Care from './Care';
import Deceased from './Deceased';

import ComfirmedToDate from './ConfirmedToDate';
import Vaccination from './Vaccination';
import PerAge from './PerAge';
import { TimestampsContext } from '../context/TimestampsContext';
import InHospitals from './InHospitals';

const LAB = () => {
  const { labTests, cases } = useContext(TimestampsContext);
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const dates = { 'lab-tests': labTestsTimestamp, cases: casesTimestamp };

  return (
    <Card summary="LAB" dates={dates} open={true}>
      <Post postNumber={1}>
        <PCR />
        <HAT />
        <ActiveCases />
      </Post>
    </Card>
  );
};

const HOS = () => {
  const { patients } = useContext(TimestampsContext);
  const { data: patientsTimestamp } = patients;
  const dates = { patients: patientsTimestamp };
  return (
    <Card summary="HOS" dates={dates} open={true}>
      <Post postNumber={2}>
        <Hospitalized />
        <OnRespiratory />
        <Care />
        <Deceased />
      </Post>
    </Card>
  );
};

const EPI = () => {
  const { stats } = useContext(TimestampsContext);
  const { data: patientsTimestamp } = stats;
  const dates = { stats: patientsTimestamp };
  return (
    <Card summary="EPI" dates={dates} open={true}>
      <Post postNumber={3}>
        <PCR />
        <HAT />
        <ActiveCases />
        <Vaccination />
        <ComfirmedToDate />
        <PerAge />
        <Hospitalized />
        <OnRespiratory />
        <Care />
        <Deceased />
        <InHospitals />
      </Post>
    </Card>
  );
};

function Posts() {
  return (
    <section>
      <LAB />
      <br />
      <HOS />
      <br />
      <EPI />
      <br />
    </section>
  );
}

export default Posts;
