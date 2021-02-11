import React from 'react';

import Card from './Card';
import Post from './Post';

import PCR from './PCR';
import HAT from './HAT';
import ActiveCases from './ActiveCases';

import Hospitalized from './Hospitalized';
import OnRespiratory from './OnRespiratory';
import Care from './Care';
import Deceased from './Deceased';

function Posts() {
  return (
    <section>
      <br />
      <Card summary="LAB" open={true}>
        <Post postNumber={1}>
          <PCR />
          <HAT />
          <ActiveCases />
        </Post>
      </Card>
      <br />
      <Card summary="HOS">
        <Post postNumber={2}>
          <Hospitalized />
          <OnRespiratory />
          <Care />
          <Deceased />
        </Post>
      </Card>
      <br />
      <Card summary="EPI">
        <Post postNumber={3}>
          <PCR />
          <HAT />
          <ActiveCases />
          <Hospitalized />
          <OnRespiratory />
          <Care />
          <Deceased />
        </Post>
      </Card>
      <br />
    </section>
  );
}

export default Posts;
