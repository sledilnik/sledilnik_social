import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import useFetch from '../hooks/useFetch';
import url from '../dict/rjvUrlDict';
import { addDays, format } from 'date-fns';
import Error from './shared/Error';

const getISODateFrom = num => addDays(new Date(), num).toISOString();
const getISODate = date => format(date, 'yyyy-MM-dd');

const getParams = params => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    acc[key] = getISODateFrom(value);
    return acc;
  }, {});
};

const pathTranslateDict = {
  HOSPITALS_LIST: 'hospitals-list',
  LAB_TESTS: 'lab-tests',
  SUMMARY: 'summary',
  STATS: 'stats',
  PATIENTS: 'patients',
  MUN: 'municipalities',
};

const getPathTranslate = path => {
  return pathTranslateDict[path] || path;
};

const codeStyle = {
  background: 'lightgrey',
  padding: '0 8px',
  fontSize: '0.9em',
  borderRadius: '10px',
};

function RJV() {
  const [path, setPath] = useState('SUMMARY');
  const [name, setName] = useState(getPathTranslate(path));
  const params = getParams(url[path].params);
  const [dates, setDates] = useState({ ...params });
  const [data, setData] = useState({});

  const {
    data: fetchedData,
    isLoading,
    hasError,
    updateUrl,
    updateParams,
    refetch,
  } = useFetch(url[path].url, params);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    setName(getPathTranslate(path));
  }, [path]);

  // API inputs & buttons
  const onSelectChangeHandler = event => {
    setDates(getParams(url[event.target.value].params));
    updateParams(getParams(url[event.target.value].params));
    updateUrl(url[event.target.value].url);
    setPath(event.target.value);
  };

  const onRefreshClickHandler = () => refetch();

  const onDateChange = event => {
    const name = event.target.name.replace('date-', '');
    const date = new Date(event.target.value);
    setDates(prev => ({ ...prev, [name]: getISODate(new Date(date)) }));
  };

  const onUpdateClickHandler = event => {
    updateParams(dates);
  };

  // FILE input
  const onFileChangeHandler = async event => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    const handleFileRead = file => {
      const content = fileReader.result;
      setData(JSON.parse(content));
      setName(file.name);
    };

    fileReader.onloadend = () => handleFileRead(file);
    fileReader.readAsText(file);
  };

  // RJV
  const onEdit = edit => console.log({ edit });
  const onAdd = add => console.log({ add });
  const onDelete = del => console.log({ del });

  return (
    <div
      className="post"
      style={{
        margin: '8px 0',
        padding: '16px 0',
        minHeight: '200px',
        minWidth: '80%',
      }}
    >
      <div>
        <section style={{ margin: '8px', fontSize: '0.9em' }}>
          Keyboard Shortcuts <br /> To edit a value, try{' '}
          <code style={codeStyle}>ctrl/cmd + click</code> enter edit mode <br />{' '}
          When editing a value, try{' '}
          <code style={codeStyle}>ctrl/cmd + Enter</code> to submit changes{' '}
          <br /> When editing a value, try <code style={codeStyle}>Escape</code>{' '}
          key to cancel <br /> When adding a new key, try{' '}
          <code style={codeStyle}>Enter</code> to submit <br /> When adding a
          new key, try <code style={codeStyle}>Escape</code> to cancel
        </section>
        <label htmlFor="path">/api/</label>
        <select
          name="path"
          id="path"
          onChange={onSelectChangeHandler}
          style={{ margin: '0 8px' }}
        >
          <option value="SUMMARY">summary</option>
          <option value="PATIENTS">patients</option>
          <option value="LAB_TESTS">lab-tests</option>
          <option value="STATS">stats</option>
          <option value="MUN">municipalities</option>
          <option value="HOSPITALS_LIST">hospitals-list</option>
        </select>
        <button
          id="refresh"
          className="btn"
          style={{ margin: '0 8px' }}
          onClick={onRefreshClickHandler}
        >
          osveži
        </button>
        {dates.from && (
          <>
            <label htmlFor="date-from">from</label>
            <input
              type="date"
              name="date-from"
              id="date-from"
              style={{ margin: '0 8px' }}
              defaultValue={dates.from.toString().slice(0, 10)}
              min="2020-02-24"
              max={getISODateFrom(0).slice(0, 10)}
              onChange={onDateChange}
            />
          </>
        )}
        {dates.to && (
          <>
            <label htmlFor="date-to">to</label>
            <input
              type="date"
              name="date-to"
              id="date-to"
              style={{ margin: '0 8px' }}
              defaultValue={dates.to.toString().slice(0, 10)}
              min="2020-02-24"
              max={getISODateFrom(0).slice(0, 10)}
              onChange={onDateChange}
            />
          </>
        )}
        {dates.toDate && (
          <>
            <label htmlFor="date-toDate">toDate</label>
            <input
              type="date"
              name="date-toDate"
              id="date-toDate"
              style={{ margin: '0 8px' }}
              defaultValue={dates.toDate.toString().slice(0, 10)}
              min="2020-02-24"
              max={getISODateFrom(0).slice(0, 10)}
              onChange={onDateChange}
            />
          </>
        )}
        {Object.keys(dates).length !== 0 && (
          <button
            id="update"
            className="btn"
            style={{ margin: '0 8px' }}
            onClick={onUpdateClickHandler}
          >
            posodobi
          </button>
        )}
        ali{' '}
        <input
          type="file"
          name="file-upload"
          id="file-upload"
          accept=".json"
          onChange={onFileChangeHandler}
          style={{ margin: '0 8px' }}
        />
      </div>
      {fetchedData !== null && (
        <Error hasError={hasError} hasData={!isLoading && fetchedData !== null}>
          <div>
            <ReactJson
              src={data}
              name={name}
              theme="monokai"
              collapsed={2}
              onEdit={onEdit}
              onAdd={onAdd}
              onDelete={onDelete}
              style={{ margin: '8px', padding: '8px' }}
            />
          </div>
        </Error>
      )}
    </div>
  );
}

export default RJV;
