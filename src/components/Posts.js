import React, { useContext, useRef } from 'react';

import './Posts.css';

import { TimestampsContext } from '../context/TimestampsContext';
import { DataContext } from '../context/DataContext';

import Card from './Card';
import Post from './Post';
import Summary from './Summary';
import Patients from './Patients';
import PerAge from './PerAge';
import InHospitals from './InHospitals';
import Municipalities from './Municipalities';

const LAB = ({ noTWCount }) => {
  const ref = useRef();
  const { labTests, cases } = useContext(TimestampsContext);
  const { data: labTestsTimestamp } = labTests;
  const { data: casesTimestamp } = cases;
  const dates = { 'lab-tests': labTestsTimestamp, cases: casesTimestamp };

  const { summary } = useContext(DataContext);

  const refreshHandler = () => {
    labTests.refetch();
    cases.refetch();
    summary.refetch();
  };

  const noCount = noTWCount || summary.isLoading || summary.hasError;

  return (
    <Card
      postRef={ref}
      title="LAB"
      dates={dates}
      open
      noCount={noCount}
      refreshHandler={refreshHandler}
    >
      <Post forwardedRef={ref} id="post-lab" postNumber={1}>
        <Summary title="PCR" />
        <Summary title="HAT" />
        <Summary title="ActiveCases" />
      </Post>
    </Card>
  );
};

const HOS = ({ noTWCount }) => {
  const ref = useRef();
  const { patients } = useContext(TimestampsContext);
  const { data: patientsTimestamp } = patients;
  const dates = { patients: patientsTimestamp };

  const { patients: patientsDataHook } = useContext(DataContext);

  const refreshHandler = () => {
    patients.refetch();
    patientsDataHook.refetch();
  };

  const noCount = noTWCount || patients.isLoading || patients.hasError;

  return (
    <Card
      postRef={ref}
      title="HOS"
      dates={dates}
      noCount={noCount}
      refreshHandler={refreshHandler}
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

const EPI = ({ noTWCount }) => {
  const ref = useRef();
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

  const dataHooks = useContext(DataContext);

  const refreshHandler = () => {
    stats.refetch();
    labTests.refetch();
    cases.refetch();
    patients.refetch();
    munActive.refetch();
    dataHooks.stats.refetch();
    dataHooks.summary.refetch();
    dataHooks.patients.refetch();
    dataHooks.hospitalsList.refetch();
    dataHooks.municipalities.refetch();
  };

  const noCount =
    noTWCount ||
    Object.values(dataHooks).filter(({ hasError, isLoading }) => {
      return hasError || isLoading;
    });

  return (
    <Card
      postRef={ref}
      title="EPI"
      dates={dates}
      open={false}
      noCount={noCount}
      refreshHandler={refreshHandler}
    >
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
      <EPI noTWCount />
    </section>
  );
}

export default Posts;
