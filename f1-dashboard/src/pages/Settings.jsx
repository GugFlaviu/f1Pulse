import { useEffect, useRef, useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { getSeasons } from "../data/api";

export default function Settings({ year, setYear }) {
  const hasFetched = useRef(false);
  const [seasons, setSeasons] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const data = await getSeasons();
        setSeasons(data.filter((item) => Number(item.season) >= 2000 && Number(item.season) <= new Date().getFullYear()).reverse());
      } catch (error) {
        console.error(error);
        setError("Unable to load available seasons. Please try again later.");
      }
    }

    loadData();
  }, []);

  return (
    <section className="content-page">
      <div className="page-heading">
        <div><h2>Settings</h2><p>Choose the season shown throughout F1 Pulse.</p></div>
        <span className="season-badge">{year} Season</span>
      </div>
      <div className="settings-grid">
        <div className="page-panel">
          <h2 className="panel-icon-heading"><FiCalendar /> Season Preferences</h2>
          <p>Select a season to update the dashboard, races, drivers, teams and standings.</p>
          <label className="settings-label" htmlFor="season">Season</label>
          <div className="settings-select-wrapper">
            <select id="season" className="settings-select" value={year} disabled={seasons === null || seasons.length === 0} onChange={(event) => setYear(Number(event.target.value))}>
              {!seasons?.some((item) => Number(item.season) === year) && <option value={year}>{year}</option>}
              {seasons?.map((item) => <option key={item.season} value={item.season}>{item.season}</option>)}
            </select>
            <FiChevronDown className="settings-select-arrow" aria-hidden="true" />
          </div>
          {error ? <p role="alert">{error}</p> : seasons === null ? <p role="status">Loading available seasons...</p> : <p className="settings-note">Your selection is saved automatically in this browser.</p>}
          <button className="page-button" onClick={() => setYear(new Date().getFullYear())}>Use Current Season</button>
        </div>
      </div>
    </section>
  );
}
