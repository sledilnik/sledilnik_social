import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import useFetch from '../hooks/useFetch';
import url from '../dict/rjvUrlDict';
import { addDays, format } from 'date-fns';
import Error from './shared/Error';

import './RJV.css';

const getISODateFrom = num => addDays(new Date(), num).toISOString();
const getISODate = date => format(date, 'yyyy-MM-dd');

const dateParams = ['from', 'to', 'toDate'];
const createIncludes = arr => key => arr.includes(key);
const getIsDateParam = createIncludes(dateParams);

const getParams = (params = {}) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    const isDateParam = getIsDateParam(key);
    acc[key] = isDateParam ? getISODateFrom(value) : value;
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
  SCHOOLS: 'schools',
  SCHOOL_STATUS: 'school-status',
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
  const [params, setParams] = useState(getParams(url[path].params));
  const [data, setData] = useState({});
  const [showApi, setShowApi] = useState(true);

  const {
    data: fetchedData,
    isLoading,
    hasError,
    updateUrl,
    updateParams: updateFetchParams,
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
    setParams(getParams(url[event.target.value].params));
    updateFetchParams(getParams(url[event.target.value].params));
    updateUrl(url[event.target.value].url);
    setPath(event.target.value);
  };

  const onRefreshClickHandler = () => refetch();

  const onDateChangeHandler = event => {
    const { value } = event.target;
    const name = event.target.name.replace('date-', '');
    const date = value ? new Date(value) : new Date();
    setParams(prev => ({ ...prev, [name]: getISODate(date) }));
    if (!value) {
      event.target.value = getISODate(date);
    }
  };

  const onIdChangeHandler = event => {
    const { value, name } = event.target;
    setParams(prev => ({ ...prev, [name]: value }));
    updateFetchParams(prev => ({ ...prev, [name]: value }));
  };

  const onUpdateClickHandler = event => {
    updateFetchParams(params);
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
  const onEdit = edit => setData(edit.updated_src);
  const onAdd = add => setData(add.updated_src);
  const onDelete = del => setData(del.updated_src);

  const onSaveClick = () => {
    const downloadFile = async (fileName, data) => {
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + '.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const dotIndex = name.lastIndexOf('.');
    let filename = dotIndex !== -1 ? name.slice(0, dotIndex) : name;
    filename += `_${Date.parse(new Date())}`;
    downloadFile(filename, data);
  };

  return (
    <div
      className="post"
      style={{
        margin: '8px 0',
        padding: '16px 0',
        minHeight: '200px',
        minWidth: '80%',
        fontSize: '0.9em',
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
        <div style={{ margin: '8px', fontSize: '0.9em' }}>
          <input
            type="radio"
            id="api"
            name="json-option"
            value="api"
            defaultChecked={showApi}
            onClick={() => setShowApi(true)}
            style={{ margin: '0 8px' }}
          />
          <label htmlFor="api">API</label>
          <input
            type="radio"
            id="pick-file"
            name="json-option"
            value="file"
            onClick={() => setShowApi(false)}
            style={{ margin: '0 8px' }}
          />
          <label htmlFor="pick-file">Datoteka</label>
        </div>
        {showApi && (
          <div style={{ margin: '8px', fontSize: '0.9em' }}>
            <label htmlFor="path">path</label>
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
              <option value="SCHOOLS">schools</option>
              <option value="SCHOOL_STATUS">school-status</option>
            </select>
            <button
              id="refresh"
              className="btn"
              style={{ margin: '0 8px' }}
              onClick={onRefreshClickHandler}
            >
              osveži
            </button>
            {params.id && (
              <>
                <label htmlFor="id">id</label>
                <select
                  name="id"
                  id="id"
                  onChange={onIdChangeHandler}
                  style={{ margin: '0 8px' }}
                  defaultValue={params.id}
                >
                  <option value="711">711</option>
                  <option value="1198">1198</option>
                </select>
              </>
            )}
            {params.from && (
              <>
                <label htmlFor="date-from">from</label>
                <input
                  type="date"
                  name="date-from"
                  id="date-from"
                  style={{ margin: '0 8px' }}
                  defaultValue={params.from.toString().slice(0, 10)}
                  min="2020-02-24"
                  max={getISODateFrom(0).slice(0, 10)}
                  onChange={onDateChangeHandler}
                />
              </>
            )}
            {params.to && (
              <>
                <label htmlFor="date-to">to</label>
                <input
                  type="date"
                  name="date-to"
                  id="date-to"
                  style={{ margin: '0 8px' }}
                  defaultValue={params.to.toString().slice(0, 10)}
                  min="2020-02-24"
                  max={getISODateFrom(0).slice(0, 10)}
                  onChange={onDateChangeHandler}
                />
              </>
            )}
            {params.toDate && (
              <>
                <label htmlFor="date-toDate">toDate</label>
                <input
                  type="date"
                  name="date-toDate"
                  id="date-toDate"
                  style={{ margin: '0 8px' }}
                  defaultValue={params.toDate.toString().slice(0, 10)}
                  min="2020-02-24"
                  max={getISODateFrom(0).slice(0, 10)}
                  onChange={onDateChangeHandler}
                />
              </>
            )}
            {Object.keys(params).length !== 0 && !params.id && (
              <button
                id="update"
                className="btn"
                style={{ margin: '0 8px' }}
                onClick={onUpdateClickHandler}
              >
                posodobi
              </button>
            )}
          </div>
        )}
        {!showApi && (
          <div className="file-input">
            <input
              type="file"
              name="file"
              id="file"
              className="file"
              accept=".json"
              onChange={onFileChangeHandler}
            />
            <label htmlFor="file" className="btn">
              Izberi JSON datoteko
            </label>{' '}
            <button className="btn" onClick={onSaveClick}>
              Shrani
            </button>
          </div>
        )}
      </div>
      {fetchedData !== null && (
        <Error hasError={hasError} hasData={!isLoading && fetchedData !== null}>
          <div id="RJV">
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
