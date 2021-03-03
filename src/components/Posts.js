import React, { useContext } from 'react';

import './Posts.css';

import Card from './Card';
import Post from './Post';

import PerAge from './PerAge';
import { TimestampsContext } from '../context/TimestampsContext';
import InHospitals from './InHospitals';
import Municipalities from './Municipalities';
import Summary from './Summary';
import Patients from './Patients';

const LAB = () => {
  const { labTests, cases } = useContext(TimestampsContext);
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const dates = { 'lab-tests': labTestsTimestamp, cases: casesTimestamp };

  return (
    <Card id="lab" summary="LAB" dates={dates} open={true} noCount={false}>
      <Post id="post-lab" postNumber={1}>
        <Summary title="PCR" />
        <Summary title="HAT" />
        <Summary title="ActiveCases" />
      </Post>
    </Card>
  );
};

const HOS = () => {
  const { patients } = useContext(TimestampsContext);
  const { data: patientsTimestamp } = patients;
  const dates = { patients: patientsTimestamp };
  return (
    <Card id="hos" summary="HOS" dates={dates} open={false} noCount={false}>
      <Post id="post-hos" postNumber={2}>
        <Patients title="Hospitalized" />
        <Patients title="OnRespiratory" />
        <Patients title="Care" />
        <Patients title="Deceased" />
      </Post>
    </Card>
  );
};

const EPI = () => {
  const { stats, labTests, cases, patients, munActive } = useContext(
    TimestampsContext
  );
  const { data: statsTimestamp } = stats;
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const { data: patientsTimestamp } = patients;
  const { data: munActiveTimestamp } = munActive;
  const dates = {
    stats: statsTimestamp,
    'lab-tests': labTestsTimestamp,
    cases: casesTimestamp,
    patients: patientsTimestamp,
    'municipalities-active': munActiveTimestamp,
  };
  return (
    <Card id="epi" summary="EPI" dates={dates} open={false}>
      <Post id="post-epi" postNumber={3}>
        <Summary title="PCR" />
        <Summary title="HAT" />
        <Summary title="ActiveCases" />
        <Summary title="Vaccination" />
        <Summary title="ConfirmedToDate" />
        <PerAge />
        <Patients title="Hospitalized" />
        <Patients title="OnRespiratory" />
        <Patients title="Care" />
        <Patients title="Deceased" />
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
