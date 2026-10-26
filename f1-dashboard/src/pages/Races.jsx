import { useEffect, useRef, useState } from "react";
import RaceCalendar from "../components/races/RaceCalendar";
import { getRaces } from "../data/api";

export default function Races({ year }) {
  const hasFetched = useRef(false);
  const [races, setRaces] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [now] = useState(() => new Date());

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const data = await getRaces(year);
        setRaces(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load the race calendar. Please try again later.");
      }
    }

    loadData();
  }, [year]);

  const filteredRaces = races === null ? null : races.filter((race) => {
    const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);
    if (filter === "upcoming") return raceDate > now;
    if (filter === "past") return raceDate <= now;
    return true;
  });

  return (
    <section className="content-page">
      <div className="page-heading">
        <div><h2>Race Calendar</h2><p>Explore every Grand Prix in the {year} season.</p></div>
        <span className="season-badge">{races?.length ?? "—"} races</span>
      </div>

      <div className="page-tabs" role="group" aria-label="Filter races">
        <button className={filter === "all" ? "active" : ""} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All Races</button>
        <button className={filter === "upcoming" ? "active" : ""} aria-pressed={filter === "upcoming"} onClick={() => setFilter("upcoming")}>Upcoming</button>
        <button className={filter === "past" ? "active" : ""} aria-pressed={filter === "past"} onClick={() => setFilter("past")}>Past Races</button>
      </div>

      {error ? <p className="page-message" role="alert">{error}</p> : races === null ? (
        <p className="page-message" role="status">Loading race calendar...</p>
      ) : filteredRaces.length === 0 ? (
        <p className="page-message">No races match this filter.</p>
      ) : (
        <RaceCalendar races={filteredRaces} />
      )}
    </section>
  );
}
