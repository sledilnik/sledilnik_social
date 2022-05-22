import { useRef, useState, useContext, useEffect } from 'react';
import { TimestampsContext } from 'context/TimestampsContext';
import { DataContext } from 'context/DataContext';
import CancelButton from 'components/Shared/CancelButton';

import Card from 'components/Shared/Card';
import * as Data from 'components/Data';
import Post from './Shared/Post';

const EPI = ({ noTWCount, noClose }) => {
  const ref = useRef();
  const settingsRef = useRef();
  const [showIcons, setShowIcons] = useState(true);
  const [what, setWhat] = useState('weeklyGrowth');
  const [showSettings, setShowSettings] = useState(false);
  const { stats, labTests, cases, patients, munActive } =
    useContext(TimestampsContext);

  const dates = {
    stats: stats.data,
    'lab-tests': labTests.data,
    cases: cases.data,
    patients: patients.data,
    'municipalities-active': munActive.data,
  };

  const dataHooks = useContext(DataContext);
  const showSettingsHandler = () => setShowSettings(prev => !prev);
  useEffect(() => {
    settingsRef.current.onclick = showSettingsHandler;
  }, []);

  const refreshHandler = () => {
    stats.refetch();
    labTests.refetch();
    cases.refetch();
    patients.refetch();
    munActive.refetch();
    dataHooks.stats.refetch();
    dataHooks.summary.refetch();
    dataHooks.patients.refetch();
    dataHooks.hospitalsList.refetch();
    dataHooks.municipalities.refetch();
  };

  const timestampsLoading = [stats, labTests, cases, patients, munActive].some(
    ({ isLoading }) => isLoading
  );

  const loadingOrError = [...Object.values(dataHooks)].some(
    ({ hasError, isLoading }) => hasError || isLoading
  );

  const noCount = noTWCount || loadingOrError || timestampsLoading;

  const showIconsHandler = event => setShowIcons(event.target.checked);

  const onWhatChangeHandler = event => setWhat(event.target.value);

  const whatTranslate =
    what === 'weeklyGrowth' ? 'tedenski prirast' : '15d trend';

  const settingsOutput = [`po krajih: ${whatTranslate}`];

  return (
    <Card
      postRef={ref}
      title="EPI"
      dates={dates}
      open
      noCount={noCount}
      noClose={noClose}
      refreshHandler={refreshHandler}
      settingsRef={settingsRef}
      settingsOutput={settingsOutput}
    >
      {showSettings && (
        <div className="settings-container">
          <h3>Nastavitve</h3>
          <CancelButton handleClick={showSettingsHandler} position="" black />
          <div className="settings">
            <details open={true}>
              <summary>
                <h4>Po krajih</h4>
              </summary>
              <div className="settings-options">
                <label htmlFor="show-icons">Ikone</label>
                <input
                  name="show-icons"
                  type="checkbox"
                  checked={showIcons}
                  onChange={showIconsHandler}
                  className="settings-btn"
                />
                {showIcons && (
                  <>
                    <label htmlFor="what">Trend</label>
                    <select
                      name="what"
                      onChange={onWhatChangeHandler}
                      value={what}
                      className="settings-btn"
                    >
                      <option value="weeklyGrowth">Tedenski prirast</option>
                      <option value="trend15">15d trend</option>
                    </select>
                  </>
                )}
              </div>
            </details>
          </div>
        </div>
      )}
      <Post forwardedRef={ref} id="post-epi" postsCount={2} postNumber={2}>
        <Data.Summary title="PCR" />
        <Data.Summary title="HAT" />
        <Data.Summary title="ActiveCases" />
        <Data.Summary title="CasesActive100k" />
        <Data.Summary title="Vaccination2" />
        <Data.Summary title="Vaccination1" />
        <Data.Summary title="ConfirmedToDate" />
        <Data.PerAge />
        <Data.InHospitals />
        <Data.Municipalities icons="FB" showIcons={showIcons} what={what} />
      </Post>
    </Card>
  );
};

export default EPI;
