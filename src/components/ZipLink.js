import JSZip from 'jszip';
import FileSaver from 'file-saver';
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import './ZipLink.css';

function ZipLink() {
  const testsToday = useLocalStorage(null, 'testsToday');
  const testsTodayHAT = useLocalStorage(null, 'testsTodayHAT');
  const casesActive = useLocalStorage(null, 'casesActive');
  const hospitalizedCurrent = useLocalStorage(null, 'hospitalizedCurrent');
  const icuCurrent = useLocalStorage(null, 'icuCurrent');
  const deceasedToDate = useLocalStorage(null, 'deceasedToDate');
  const casesAvg7Days = useLocalStorage(null, 'casesAvg7Days');
  const vaccinationSummary = useLocalStorage(null, 'vaccinationSummary');
  const Patients = useLocalStorage(null, 'Patients');
  const IcuPatients = useLocalStorage(null, 'IcuPatients');
  const Municipalities = useLocalStorage(null, 'Municipalities');
  const HOS = useLocalStorage(null, 'HOS');
  const LAB = useLocalStorage(null, 'LAB');
  const ALL = useLocalStorage(null, 'ALL');
  const Map_weeklyGrowth = useLocalStorage(null, 'Map_weeklyGrowth');

  const screenshotsStateHooks = {
    testsToday,
    testsTodayHAT,
    casesActive,
    hospitalizedCurrent,
    icuCurrent,
    deceasedToDate,
    casesAvg7Days,
    vaccinationSummary,
    Patients,
    IcuPatients,
    Municipalities,
    HOS,
    LAB,
    ALL,
    Map_weeklyGrowth,
  };

  const onClickHandler = async () => {
    const zip = new JSZip();

    for (let [key, item] of Object.entries(screenshotsStateHooks)) {
      zip.file(key + '.png', item[0], { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });

    FileSaver.saveAs(content, 'screenshots.zip');
  };

  return (
    <button className="ZipLink" onClick={onClickHandler}>
      DOWNLOAD
    </button>
  );
}

export default ZipLink;
