import React from 'react';
import LAB from './LAB';
import Card from './Card';
import HOS from './HOS';
import PCR from './PCR';

function Posts() {
  return (
    <section>
      <PCR />
      {/* <Card summary={'LAB'} open={true}>
        <LAB />
      </Card>
      <br />
      <Card summary={'HOS'}>
        <HOS />
      </Card>
      <br />
      <HOS />
      <br />
      <LAB hasHeader={false} hasFooter={false} /> */}
    </section>
  );
}

export default Posts;
