import React, { useContext } from 'react';
import Output from './Output';
import { SocialContext } from '../context/SocialContext';

function InHospital(props) {
  return (
    <li key={props.hospShort}>
      <Output noArrow={true} {...props} />
    </li>
  );
}

const Brackets = ({ children }) => <>({children})</>;

function withInHospital_HOC(Component) {
  const InHospital = ({ hospShort, hospitalName, hosp, icu, ...props }) => {
    const { social } = useContext(SocialContext);
    const kindOfData = 'default';

    const newData = {
      value1: hospitalName,
      value2: hosp.number,
      value4: (
        <Brackets>
          {hosp.in}, {hosp.out}
        </Brackets>
      ),
      value6: icu.number,
      value8: (
        <Brackets>
          {icu.in}, {icu.out}
        </Brackets>
      ),
    };

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      keyTitle: 'InHospital',
    };

    return <Component {...newProps} />;
  };
  return InHospital;
}
export default withInHospital_HOC(InHospital);
