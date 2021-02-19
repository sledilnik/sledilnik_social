import React, { useContext } from 'react';

import './Posts.css';

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
import Municipalities from './Municipalities';

const LAB = () => {
  const { labTests, cases } = useContext(TimestampsContext);
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const dates = { 'lab-tests': labTestsTimestamp, cases: casesTimestamp };

  return (
    <Card id="lab" summary="LAB" dates={dates} open={true}>
      <Post id="post-lab" postNumber={1}>
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
    <Card id="hos" summary="HOS" dates={dates} open={false}>
      <Post id="post-hos" postNumber={2}>
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
    <Card id="epi" summary="EPI" dates={dates} open={false}>
      <Post id="post-epi" postNumber={3}>
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
        <Municipalities icons="FB" />
      </Post>
    </Card>
  );
};

function Posts() {
  return (
    <section className="Posts">
      <LAB />
      <HOS />
      <EPI />
    </section>
  );
}

export default Posts;
