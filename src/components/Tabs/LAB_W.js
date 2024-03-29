import { useContext, useRef } from 'react';
import { DataContext } from '../../context/DataContext';
import { TimestampsContext } from '../../context/TimestampsContext';
import { AWS_LAMBDA_NEW_URL, AWS_LAMBDA_OLD_URL } from '../../dicts/URL_Dict';
import useDownloadLinkClick from '../../hooks/useDownloadLinkClick';
import Card from 'components/Shared/Card';
import Summary from 'components/Data/Summary';
import Post from './Shared/Post';

const LAB = ({ noTWCount, noClose }) => {
  const ref = useRef();
  const download1Ref = useRef();
  const download2Ref = useRef();
  const { labTests, cases } = useContext(TimestampsContext);
  const dates = { 'lab-tests': labTests.data, cases: cases.data };

  const { summary } = useContext(DataContext);

  useDownloadLinkClick(
    [download1Ref, download2Ref],
    [
      `${AWS_LAMBDA_OLD_URL}?screen=homeTop4Cards`,
      `${AWS_LAMBDA_NEW_URL}?type=multicard&screen=LAB&immediateDownload=true`,
    ]
  );

  const refreshHandler = () => {
    labTests.refetch();
    cases.refetch();
    summary.refetch();
  };

  const timestampsLoading = [labTests, cases].some(
    ({ isLoading }) => isLoading
  );
  const loadingOrError = [summary].some(
    ({ hasError, isLoading }) => hasError || isLoading
  );

  const noCount = noTWCount || loadingOrError || timestampsLoading;

  return (
    <Card
      postRef={ref}
      title="LAB_W"
      dates={dates}
      open
      noCount={noCount}
      noClose={noClose}
      refreshHandler={refreshHandler}
      download={[
        [download1Ref, 'top4Cards'],
        [download2Ref, 'LAB'],
      ]}
    >
      <Post forwardedRef={ref} id="post-lab_w" postNumber={1} postsCount={2}>
        <Summary title="ActiveCases" />
        <Summary title="CasesActive100k" />
        <Summary title="PCR" />
        <Summary title="HAT" />
      </Post>
    </Card>
  );
};

export default LAB;
