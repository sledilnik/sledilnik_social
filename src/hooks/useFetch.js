// https://medium.com/swlh/usefetch-a-custom-react-hook-36d5f5819d8

import { useState, useEffect } from 'react';

const isDev = process.env.NODE_ENV === 'development';

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
    const controller = new AbortController();
    const fetchData = async controller => {
      if (skipFetch) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${url}?${queryString}`, {
          ...options,
          signal: controller.signal,
        });
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setHasError(true);
          setErrorMessage(result);
        }
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === 'AbortError' &&
          !isDev
        ) {
          console.log(err);
          setHasError(true);
          setErrorMessage(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(controller);
    return () => controller.abort();
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
