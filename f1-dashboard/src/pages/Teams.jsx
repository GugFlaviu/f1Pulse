import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { getTeams, getTeamChampionship } from "../data/api";
import { teamAssets } from "../data/teamAssets";

export default function Teams({ year }) {
  const hasFetched = useRef(false);
  const [teams, setTeams] = useState(null);
  const [standings, setStandings] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const teamsData = await getTeams(year);
        const standingsData = await getTeamChampionship(year, 100);
        const sortedTeams = [...teamsData].sort((a, b) => {
          const standingA = standingsData.find((item) => item.Constructor.constructorId === a.constructorId);
          const standingB = standingsData.find((item) => item.Constructor.constructorId === b.constructorId);

          return Number(standingA?.position ?? 999) - Number(standingB?.position ?? 999)
            || a.name.localeCompare(b.name);
        });
        setTeams(sortedTeams);
        setStandings(standingsData);
      } catch (error) {
        console.error(error);
        setError("Unable to load teams. Please try again later.");
      }
    }

    loadData();
  }, [year]);

  const filteredTeams = teams?.filter((team) => team.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="content-page">
      <div className="page-heading">
        <div><h2>Teams</h2><p>Constructors ordered by their championship position in {year}.</p></div>
        <span className="season-badge"><MdGroups /> {teams?.length ?? "—"} teams</span>
      </div>
      <label className="page-search"><FiSearch /><input aria-label="Search teams" placeholder="Search teams..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>

      {error ? <p className="page-message" role="alert">{error}</p> : teams === null ? (
        <p className="page-message" role="status">Loading teams...</p>
      ) : filteredTeams.length === 0 ? (
        <p className="page-message">{teams.length === 0 ? "No teams available for this season." : "No teams match your search."}</p>
      ) : (
        <div className="profile-grid">
          {filteredTeams.map((constructor) => {
            const team = teamAssets[constructor.constructorId];
            const standing = standings.find((item) => item.Constructor.constructorId === constructor.constructorId);

            return (
              <article className="profile-card" key={constructor.constructorId} style={{ borderTopColor: team?.color ?? "#31404d" }}>
                <div className="profile-card-top">
                  {team?.logo ? <img className="profile-team-logo" src={team.logo} alt="" /> : <MdGroups className="profile-team-logo" />}
                  <span className="profile-nationality">{constructor.nationality}</span>
                </div>
                <h3>{constructor.name}</h3>
                <p className="profile-description">Formula 1 Constructor</p>
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
