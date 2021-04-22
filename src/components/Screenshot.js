import React from 'react';
import useFetch from '../hooks/useFetch';

const Screenshot = ({ params = { type: '', screen: '' } }) => {
  const { data, isLoading } = useFetch(
    'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot',
    params
  );

  return (
    <>
      {isLoading && <div>loading</div>}
      {!isLoading && data.body && (
        <a
          href={`data:image/jpeg;base64,${data.body}`}
          download={params.screen}
        >
          <img
            src={`data:image/jpeg;base64,${data.body}`}
            alt="card"
            style={{ maxWidth: '100%' }}
          />
        </a>
      )}
    </>
  );
};

export default Screenshot;
