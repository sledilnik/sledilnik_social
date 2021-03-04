import React, { useContext, createRef } from 'react';

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
  const ref = createRef();
  const { labTests, cases } = useContext(TimestampsContext);
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const dates = { 'lab-tests': labTestsTimestamp, cases: casesTimestamp };

  return (
    <Card
      postRef={ref}
      id="lab"
      summary="LAB"
      dates={dates}
      open={true}
      noCount={false}
    >
      <Post forwardedRef={ref} id="post-lab" postNumber={1}>
        <Summary title="PCR" />
        <Summary title="HAT" />
        <Summary title="ActiveCases" />
      </Post>
    </Card>
  );
};

const HOS = () => {
  const ref = createRef();
  const { patients } = useContext(TimestampsContext);
  const { data: patientsTimestamp } = patients;
  const dates = { patients: patientsTimestamp };
  return (
    <Card
      postRef={ref}
      id="hos"
      summary="HOS"
      dates={dates}
      open={false}
      noCount={false}
    >
      <Post forwardedRef={ref} id="post-hos" postNumber={2}>
        <Patients title="Hospitalized" />
        <Patients title="OnRespiratory" />
        <Patients title="Care" />
        <Patients title="Deceased" />
      </Post>
    </Card>
  );
};

const EPI = () => {
  const ref = createRef();
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
    <Card postRef={ref} id="epi" summary="EPI" dates={dates} open={false}>
      <Post forwardedRef={ref} id="post-epi" postNumber={3}>
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
