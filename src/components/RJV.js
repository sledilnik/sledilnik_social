import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import useFetch from '../hooks/useFetch';
import url from '../dict/rjvUrlDict';
import { addDays, format } from 'date-fns';
import Error from './shared/Error';

import './RJV.css';

const DATA_COLLECT_START_DATE = '2020-02-24';

const getISODateFrom = num => addDays(new Date(), num).toISOString();
const getISODate = date => format(date, 'yyyy-MM-dd');

const createIncludes = arr => key => arr.includes(key);

const dateParams = ['from', 'to', 'toDate'];
const getIsDateParam = createIncludes(dateParams);
const selectParams = ['id'];
const selectParamsOptions = { id: [711, 1198] };

const getParams = (params = {}) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    const isDateParam = getIsDateParam(key);
    acc[key] = isDateParam ? getISODateFrom(value) : value;
    return acc;
  }, {});
};

const pathTranslateDict = {
  SUMMARY: 'summary',
  LAB_TESTS: 'lab-tests',
  PATIENTS: 'patients',
  STATS: 'stats',
  MUN: 'municipalities',
  SCHOOLS: 'schools',
  SCHOOL_STATUS: 'school-status',
  HOSPITALS_LIST: 'hospitals-list',
};

const getPathTranslate = path => pathTranslateDict[path] || path;

function RJV() {
  const [path, setPath] = useState('SUMMARY');
  const [name, setName] = useState(getPathTranslate(path));
  const [params, setParams] = useState(getParams(url[path].params));
  const [data, setData] = useState({});
  const [showApi, setShowApi] = useState(true);

  const {
    data: fetchedData,
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

  // API inputs & buttons handlers
  const onPathChangeHandler = event => {
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

  // FILE input handlers
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

  // RJV handlers
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

  const selectPathOptions = Object.entries(pathTranslateDict).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    )
  );

  const SelectInput = ({ id, onChange, defaultValue, children }) => {
    return (
      <>
        <label htmlFor="path">{id}</label>
        <select
          name={id}
          id={id}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {children}
        </select>
      </>
    );
  };

  const ApiFileRadio = ({
    id,
    value,
    defaultChecked,
    onClick,
    onChange,
    labelText,
  }) => (
    <>
      <input
        type="radio"
        id={id}
        name="json-option"
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={id}>{labelText ? labelText : id.toUpperCase()}</label>
    </>
  );

  const DateInput = ({ id, defaultValue }) => {
    return (
      <>
        <label htmlFor={id}>{id}</label>
        <input
          type="date"
          name={id}
          id={id}
          defaultValue={defaultValue.toString().slice(0, 10)}
          min={DATA_COLLECT_START_DATE}
          max={getISODateFrom(0).slice(0, 10)}
          onChange={onDateChangeHandler}
        />
      </>
    );
  };

  const dateInputs = dateParams.map(item =>
    params[item] ? (
      <DateInput key={item} id={item} defaultValue={params[item]} />
    ) : null
  );

  const selectParamsChangeHandlersDict = { id: onIdChangeHandler };

  const selectInputs = selectParams.map(item => {
    const options = selectParamsOptions[item].map(value => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
    return params[item] ? (
      <SelectInput
        key={item}
        id={item}
        defaultValue={params[item]}
        onChange={selectParamsChangeHandlersDict[item]}
      >
        {options}
      </SelectInput>
    ) : null;
  });

  const onApiFileRadioChangeHandler = event => {
    if (event.target.id === 'api' && name !== getPathTranslate(path)) {
      setName(getPathTranslate(path));
      refetch();
    }
  };

  const Help = () => (
    <section>
      Keyboard Shortcuts <br /> To edit a value, try{' '}
      <code>ctrl/cmd + click</code> enter edit mode <br /> When editing a value,
      try <code>ctrl/cmd + Enter</code> to submit changes <br /> When editing a
      value, try <code>Escape</code> key to cancel <br /> When adding a new key,
      try <code>Enter</code> to submit <br /> When adding a new key, try{' '}
      <code>Escape</code> to cancel
    </section>
  );

  const ApiFileRadioContainer = () => (
    <div>
      <ApiFileRadio
        id="api"
        value="api"
        defaultChecked={showApi}
        onChange={onApiFileRadioChangeHandler}
        onClick={() => setShowApi(true)}
      />
      <ApiFileRadio
        id="pick-file"
        value="pick-file"
        defaultChecked={!showApi}
        onChange={onApiFileRadioChangeHandler}
        onClick={() => setShowApi(false)}
      />
    </div>
  );

  const ApiInputs = () => (
    <div>
      <SelectInput id="path" onChange={onPathChangeHandler} defaultValue={path}>
        {selectPathOptions}
      </SelectInput>
      <button id="refresh" className="btn" onClick={onRefreshClickHandler}>
        osveži
      </button>
      {selectInputs}
      {dateInputs}
      {Object.keys(params).length !== 0 && !params.id && (
        <button id="update" className="btn" onClick={onUpdateClickHandler}>
          posodobi
        </button>
      )}
    </div>
  );

  const FileInputs = () => (
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
      </label>
      <button className="btn" onClick={onSaveClick}>
        Shrani
      </button>
    </div>
  );

  return (
    <div className="RJV post">
      <div id="rjv-options" className="rjv-options-container">
        <Help />
        <ApiFileRadioContainer />
        {showApi ? <ApiInputs /> : <FileInputs />}
      </div>
      <Error hasError={hasError} hasData={!!data}>
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
    </div>
  );
}

export default RJV;
