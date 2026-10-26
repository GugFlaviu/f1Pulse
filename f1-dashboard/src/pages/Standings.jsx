import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DriverStandingsTable from "../components/standings/DriverStandingsTable";
import TeamStandingsTable from "../components/standings/TeamStandingsTable";
import { getDriverChampionship, getTeamChampionship } from "../data/api";
import NotFound from "./NotFound";

export default function Standings({ year }) {
  const { type } = useParams();
  const validType = type === "drivers" || type === "teams";
  const hasFetched = useRef(false);
  const [drivers, setDrivers] = useState(null);
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!validType || hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const driverStandings = await getDriverChampionship(year, 100);
        const teamStandings = await getTeamChampionship(year, 100);
        setDrivers(driverStandings);
        setTeams(teamStandings);
      } catch (error) {
        console.error(error);
        setError("Unable to load championship standings. Please try again later.");
      }
    }

    loadData();
  }, [year, validType]);

  if (!validType) return <NotFound />;
  const data = type === "drivers" ? drivers : teams;

  return (
    <section className="content-page">
      <div className="page-heading">
        <div><h2>Championship Standings</h2><p>Full driver and constructor classifications for {year}.</p></div>
        <span className="season-badge">{year} Season</span>
      </div>
      <nav className="page-tabs" aria-label="Championship standings">
        <NavLink to="/standings/drivers">Drivers</NavLink>
        <NavLink to="/standings/teams">Teams</NavLink>
      </nav>

      {error ? <p className="page-message" role="alert">{error}</p> : data === null ? (
        <p className="page-message" role="status">Loading championship standings...</p>
      ) : data.length === 0 ? (
        <p className="page-message">No championship standings available for this season.</p>
      ) : type === "drivers" ? (
        <DriverStandingsTable data={drivers} />
      ) : (
        <TeamStandingsTable data={teams} />
      )}
    </section>
  );
}
