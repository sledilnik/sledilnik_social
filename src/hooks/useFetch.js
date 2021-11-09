// https://medium.com/swlh/usefetch-a-custom-react-hook-36d5f5819d8

import { useState, useEffect } from 'react';

const useFetch = (
  initialUrl,
  initialParams = {},
  initialOptions = {},
  skip = false
) => {
  const [url, updateUrl] = useState(initialUrl);
  const [params, updateParams] = useState(initialParams);
  const [options, updateOptions] = useState(initialOptions);
  const [skipFetch, setSkipFetch] = useState(skip);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(!skip);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refetchIndex, setRefetchIndex] = useState(0);

  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const refetch = () => {
    setHasError(false);
    setSkipFetch(false);
    setRefetchIndex(prevRefetchIndex => prevRefetchIndex + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (skipFetch) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${url}?${queryString}`, options);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setHasError(true);
          setErrorMessage(result);
        }
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // setTimeout(() => fetchData(), 3000);
  }, [url, params, refetchIndex, queryString, options, skipFetch]);

  return {
    data,
    isLoading,
    hasError,
    errorMessage,
    updateUrl,
    updateParams,
    updateOptions,
    setSkip: setSkipFetch,
    refetch,
  };
};
export default useFetch;
