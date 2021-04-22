import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const Screenshot = ({ params = { type: '', screen: '' } }) => {
  const [value, setValue] = useLocalStorage(null, params.screen);
  const { data, isLoading, setSkip } = useFetch(
    'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot',
    params,
    {},
    !!value
  );

  const href = value || data?.body;

  useEffect(() => {
    if (href) {
      setValue(href);
      setSkip(true);
    }
  });

  return (
    <>
      {isLoading && <div>loading</div>}
      {!isLoading && href && (
        <a href={`data:image/jpeg;base64,${href}`} download={params.screen}>
          <img
            src={`data:image/jpeg;base64,${href}`}
            alt={'card-' + params.screen}
          />
        </a>
      )}
    </>
  );
};

export default Screenshot;
