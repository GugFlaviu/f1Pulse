import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiClock } from "react-icons/fi";
import RaceInfo from "../components/races/RaceInfo";
import { getRaces } from "../data/api";

export default function RaceDetails({ year }) {
  const { round } = useParams();
  const hasFetched = useRef(false);
  const [races, setRaces] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const data = await getRaces(year);
        setRaces(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load race details. Please try again later.");
      }
    }

    loadData();
  }, [year]);

  const race = races?.find((item) => item.round === round);
  const sessions = race ? [
    { name: "Practice 1", ...race.FirstPractice },
    { name: "Practice 2", ...race.SecondPractice },
    { name: "Practice 3", ...race.ThirdPractice },
    { name: "Sprint Qualifying", ...race.SprintQualifying },
    { name: "Sprint", ...race.Sprint },
    { name: "Qualifying", ...race.Qualifying },
    { name: "Race", date: race.date, time: race.time },
  ].filter((session) => session.date).sort((a, b) =>
    new Date(`${a.date}T${a.time || "00:00:00Z"}`) - new Date(`${b.date}T${b.time || "00:00:00Z"}`),
  ) : [];

  return (
    <section className="content-page">
      <Link className="page-link" to="/races"><FiArrowLeft /> Race Calendar</Link>
      {error ? <p className="page-message" role="alert">{error}</p> : races === null ? (
        <p className="page-message" role="status">Loading race details...</p>
      ) : !race ? (
        <div className="page-panel"><h2>Race not found</h2><p>This round is not part of the {year} season.</p></div>
      ) : (
        <>
          <div className="page-heading">
            <div><h2>{race.raceName}</h2><p>{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p></div>
            <span className="season-badge">Round {race.round} / {races.length}</span>
          </div>
          <div className="race-details-grid">
            <RaceInfo race={race} totalRounds={races.length} />
            <div className="page-panel">
              <h2 className="panel-icon-heading"><FiClock /> Weekend Schedule <span>UTC</span></h2>
              <div className="session-list">
                {sessions.map((session) => (
                  <div className="session-row" key={session.name}>
                    <span>{session.name}</span>
                    <time dateTime={`${session.date}T${session.time || "00:00:00Z"}`}>
                      {new Date(`${session.date}T${session.time || "00:00:00Z"}`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" })}
                      {session.time && <strong>{session.time.slice(0, 5)}</strong>}
                    </time>
                  </div>
                ))}
              </div>
              <Link className="page-button" to={`/races/${round}/results`}>Race Results <FiArrowRight /></Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
