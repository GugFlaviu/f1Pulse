import { useEffect, useRef, useState } from "react";
import { FiSearch, FiUser, FiUsers } from "react-icons/fi";
import "flag-icons/css/flag-icons.min.css";
import { getDrivers, getDriverChampionship, getTeamChampionship } from "../data/api";
import { nationalityCodes } from "../data/nationalityCodes";
import { teamAssets } from "../data/teamAssets";
import { driverAssets } from "../data/driverAssets";

export default function Drivers({ year }) {
  const hasFetched = useRef(false);
  const [drivers, setDrivers] = useState(null);
  const [standings, setStandings] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const driversData = await getDrivers(year);
        const standingsData = await getDriverChampionship(year, 100);
        const teamStandings = await getTeamChampionship(year, 100);
        const sortedDrivers = [...driversData].sort((a, b) => {
          const standingA = standingsData.find((item) => item.Driver.driverId === a.driverId);
          const standingB = standingsData.find((item) => item.Driver.driverId === b.driverId);
          const teamA = teamStandings.find((item) => item.Constructor.constructorId === standingA?.Constructors?.[0]?.constructorId);
          const teamB = teamStandings.find((item) => item.Constructor.constructorId === standingB?.Constructors?.[0]?.constructorId);
          const teamPositionA = Number(teamA?.position ?? 999);
          const teamPositionB = Number(teamB?.position ?? 999);

          return teamPositionA - teamPositionB
            || Number(standingA?.position ?? 999) - Number(standingB?.position ?? 999)
            || a.familyName.localeCompare(b.familyName);
        });
        setDrivers(sortedDrivers);
        setStandings(standingsData);
      } catch (error) {
        console.error(error);
        setError("Unable to load drivers. Please try again later.");
      }
    }

    loadData();
  }, [year]);

  const filteredDrivers = drivers?.filter((driver) =>
    `${driver.givenName} ${driver.familyName}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="content-page">
      <div className="page-heading">
        <div><h2>Drivers</h2><p>Drivers ordered by their teams' championship position in {year}.</p></div>
        <span className="season-badge"><FiUsers /> {drivers?.length ?? "—"} drivers</span>
      </div>
      <label className="page-search"><FiSearch /><input aria-label="Search drivers" placeholder="Search drivers..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>

      {error ? <p className="page-message" role="alert">{error}</p> : drivers === null ? (
        <p className="page-message" role="status">Loading drivers...</p>
      ) : filteredDrivers.length === 0 ? (
        <p className="page-message">{drivers.length === 0 ? "No drivers available for this season." : "No drivers match your search."}</p>
      ) : (
        <div className="profile-grid">
          {filteredDrivers.map((driver) => {
            const standing = standings.find((item) => item.Driver.driverId === driver.driverId);
            const constructor = standing?.Constructors?.[0];
            const team = teamAssets[constructor?.constructorId];
            const flag = nationalityCodes[driver.nationality];
            const photo = driverAssets[driver.driverId]?.photo;

            return (
              <article className="profile-card" key={driver.driverId} style={{ borderTopColor: team?.color ?? "#31404d" }}>
                <div className="profile-card-top">
                  <span className="driver-number">{driver.permanentNumber ? `#${driver.permanentNumber}` : driver.code ?? "—"}</span>
                  {flag && <span className={`fi fi-${flag}`} role="img" aria-label={driver.nationality} />}
                </div>
                <div className="driver-photo-frame">
                  {photo ? (
                    <img
                      className="driver-photo"
                      src={photo}
                      alt={`${driver.givenName} ${driver.familyName}`}
                      loading="lazy"
                    />
                  ) : (
                    <FiUser className="driver-photo-placeholder" role="img" aria-label="Photo not available" />
                  )}
                </div>
                <h3>{driver.givenName} {driver.familyName}</h3>
                <div className="profile-team">
                  {team?.logo && <img src={team.logo} alt="" />}
                  <span>{constructor?.name || driver.nationality || "Team not available"}</span>
                </div>
                <div className="profile-stats">
                  <div><span>Position</span><strong>{standing?.position ?? "—"}</strong></div>
                  <div><span>Points</span><strong>{standing?.points ?? "—"}</strong></div>
                  <div><span>Wins</span><strong>{standing?.wins ?? "—"}</strong></div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
