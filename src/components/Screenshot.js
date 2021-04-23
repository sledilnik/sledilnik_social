import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const Screenshot = ({ params = { type: '', screen: '' }, noSkip }) => {
  const [value, setValue] = useLocalStorage(null, params.screen);
  const { data, isLoading, setSkip, updateParams } = useFetch(
    'https://325sfff4r2.execute-api.eu-central-1.amazonaws.com/sledilnikScreenshot',
    params,
    {},
    !!value && !noSkip
  );

  const href = noSkip ? data?.body : value || data?.body;

  useEffect(() => {
    if (href && !noSkip) {
      setValue(href);
      setSkip(true);
    }
    noSkip && updateParams(params);
  }, [href, params, noSkip, setValue, setSkip, updateParams]);

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
