import { useRef, useContext } from 'react';
import { TimestampsContext } from './../../context/TimestampsContext';
import { DataContext } from './../../context/DataContext';
import useDownloadLinkClick from './../../hooks/useDownloadLinkClick';
import { AWS_LAMBDA_OLD_URL, AWS_LAMBDA_NEW_URL } from './../../dicts/URL_Dict';
import Card from '../Card';
import Post from '../Post';
import Patients from '../Patients';

const HOS = ({ noTWCount, noClose }) => {
  const ref = useRef();
  const download1Ref = useRef();
  const download2Ref = useRef();
  const download3Ref = useRef();
  const download4Ref = useRef();

  const { patients } = useContext(TimestampsContext);
  const dates = { patients: patients.data };

  const { patients: patientsDataHook } = useContext(DataContext);

  useDownloadLinkClick(
    [download1Ref, download2Ref, download3Ref, download4Ref],
    [
      `${AWS_LAMBDA_OLD_URL}?screen=homeLast5Cards`,
      `${AWS_LAMBDA_OLD_URL}?screen=IcuPatients`,
      `${AWS_LAMBDA_NEW_URL}?type=chart&screen=Patients&custom=&hideLegend=true&immediateDownload=true`,
      `${AWS_LAMBDA_NEW_URL}?type=multicard&screen=HOS&immediateDownload=true`,
    ]
  );

  const refreshHandler = () => {
    patients.refetch();
    patientsDataHook.refetch();
  };
  const timestampsLoading = [patients].some(({ isLoading }) => isLoading);

  const loadingOrError = [patients, patientsDataHook].some(
    ({ hasError, isLoading }) => hasError || isLoading
  );

  const noCount = noTWCount || loadingOrError || timestampsLoading;

  return (
    <Card
      postRef={ref}
      title="HOS"
      dates={dates}
      open
      noCount={noCount}
      noClose={noClose}
      refreshHandler={refreshHandler}
      download={[
        [download1Ref, 'last5Cards'],
        [download2Ref, 'IcuPatients'],
        [download3Ref, 'Patients-Chart'],
        [download4Ref, 'HOS'],
      ]}
    >
      <Post forwardedRef={ref} id="post-hos" postNumber={2}>
        <Patients title="Hospitalized" />
        <Patients title="OnRespiratory" />
        <Patients title="Deceased" />
      </Post>
    </Card>
  );
};

export default HOS;
