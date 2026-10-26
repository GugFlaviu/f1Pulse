import { teamAssets } from "../../data/teamAssets";

export default function ResultsTable({ race }) {
  return (
    <div className="page-panel race-results-panel">
      <h2>{race.raceName}</h2>
      <p>{race.Circuit.circuitName} · {race.date}</p>
      <div className="race-results-table">
        <div className="race-results-header">
          <span>Pos</span><span>Driver</span><span>Team</span><span>Laps</span><span>Time / Status</span><span>Points</span>
        </div>
        {race.Results.map((result) => {
          const constructor = result.Constructor;
          const team = teamAssets[constructor?.constructorId];

          return (
            <div className="race-results-row" key={result.Driver.driverId}>
              <span className="result-position">{result.position}</span>
              <div className="result-driver">
                <span className="driver-team-color" style={{ backgroundColor: team?.color ?? "#8493a3" }} />
                <span>{result.Driver.givenName} {result.Driver.familyName}</span>
              </div>
              <div className="result-team">
                {team?.logo && <img src={team.logo} alt="" />}
                <span>{constructor?.name ?? "—"}</span>
              </div>
              <span>{result.laps ?? "—"}</span>
              <span>{result.Time?.time ?? result.status ?? "—"}</span>
              <span className="standing-points">{result.points}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
