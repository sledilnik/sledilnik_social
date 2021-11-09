import { useRef, useState, useContext, useEffect } from 'react';
import { TimestampsContext } from './../../context/TimestampsContext';
import { DataContext } from './../../context/DataContext';
import CancelButton from '../CancelButton';
import Card from '../Card';
import Post from '../Post';
import Summary from '../Summary';
import Patients from '../Patients';
import PerAge from '../PerAge';
import InHospitals from '../InHospitals';
import Municipalities from '../Municipalities';

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
      <Post forwardedRef={ref} id="post-epi" postNumber={3}>
        <Summary title="PCR" />
        <Summary title="HAT" />
        <Summary title="ActiveCases" />
        <Summary title="CasesActive100k" />
        <Summary title="Vaccination2" />
        <Summary title="Vaccination1" />
        <Summary title="ConfirmedToDate" />
        <PerAge />
        <Patients title="Hospitalized" />
        <Patients title="OnRespiratory" />
        <Patients title="Deceased" />
        <InHospitals />
        <Municipalities icons="FB" showIcons={showIcons} what={what} />
      </Post>
    </Card>
  );
};

export default EPI;
