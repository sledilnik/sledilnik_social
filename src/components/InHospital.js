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

const TextsDict = {
  FB: {
    default: {
      text1: '',
      text2: ': ',
      text3: '',
      text4: '',
      text5: ', EIT: ',
      text6: '',
      text7: '',
      text8: '',
      text9: '.',
    },
    onlyValue: {},
  },
  TW: {
    default: {},
    onValue: {},
  },
};

const defaultTexts = TextsDict.FB.default;

const Brackets = ({ children }) => <>({children})</>;

function withInHospital_HOC(Component) {
  const InHospital = ({ hospShort, hospitalName, hosp, icu, ...props }) => {
    const { social } = useContext(SocialContext);
    const kindOfData = 'default';

    const newText = {
      text3: ` ${hosp.text} `,
      text7: ` ${icu.text} `,
    };

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

    TextsDict.FB.default = { ...defaultTexts, ...newText };

    const newProps = {
      ...props,
      data: newData,
      social,
      kindOfData,
      defaultTexts: TextsDict.FB.default,
      TextsDict,
      keyTitle: 'InHospital',
    };

    return <Component {...newProps} />;
  };
  return InHospital;
}
export default withInHospital_HOC(InHospital);
