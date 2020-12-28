import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import withListLoading from "./components/withListLoading";

function App() {
  const ListLoading = withListLoading(List);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState(null);
  const [municipalities, setMunicipalities] = useState(null);
  const [hospitalsList, setHospitalsList] = useState(null);
  const [error, setError] = useState(false);
  const [labTests, setLabTests] = useState(false);
  const [summary, setSummary] = useState(false);

  useEffect(() => {
    setLoading(true);
    // const timer = setTimeout(() => { // timer
    const nDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 18)
    ).toISOString();
    Promise.all([
      fetch(`https://api.sledilnik.org/api/stats?from=${nDaysAgo}`) // apis
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch(() => Promise.reject()),
      fetch(`https://api.sledilnik.org/api/patients?from=${nDaysAgo}`)
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch(() => Promise.reject()),
      fetch(`https://api.sledilnik.org/api/municipalities?from=${nDaysAgo}`)
        .then((res) => res.json())
        .then((data) => setMunicipalities(data))
        .catch(() => Promise.reject()),
      fetch(`https://api.sledilnik.org/api/hospitals-list`)
        .then((res) => res.json())
        .then((data) => setHospitalsList(data))
        .catch(() => Promise.reject()),
      fetch(`https://api.sledilnik.org/api/lab-tests?from=${nDaysAgo}`)
        .then((res) => res.json())
        .then((data) => setLabTests(data))
        .catch(() => Promise.reject()),
        .then((res) => res.json())
        .then((data) => setSummary(data))
        .catch(() => Promise.reject()),
    ])
      .catch(() => setError(true))
      .finally(() => setLoading(false)); // show data
    // }, 800);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {error ? console.log(error) : ""}
      <div className="top"></div>
      <div className="container">
        <h1>Sledilnik Social</h1>
        <ListLoading
          isLoading={loading}
          stats={stats}
          municipalities={municipalities}
          patients={patients}
          hospitalsList={hospitalsList}
          labTests={labTests}
          summary={summary}
        />
      </div>
      <footer>
        <br /> <br />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="logoCenter"
        >
          <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
        </svg>
        <br /> <br />
      </footer>
    </div>
  );
}
export default App;
