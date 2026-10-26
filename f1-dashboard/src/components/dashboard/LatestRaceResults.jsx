import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { teamAssets } from "../../data/teamAssets";
import "./css/LatestRaceResults.css";

export default function LatestRaceResults({
  race = null,
  loading = false,
  error = "",
}) {
  const results = race?.Results ?? [];
  const raceSummary = race
    ? `${race.raceName} · Round ${race.round} · ${new Date(race.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })}`
    : "Previous Grand Prix";

  return (
    <div className="latest-results-card">
      <div className="latest-results-header">
        <div className="latest-race-summary">
          <h2>Latest Race Results</h2>
          <p title={raceSummary}>{raceSummary}</p>
        </div>

        {race?.round && results.length > 0 ? (
          <Link to={`/races/${race.round}/results`} className="results-btn">
            Full Results
            <FiArrowRight />
          </Link>
        ) : (
          <button className="results-btn" disabled>
            Full Results
            <FiArrowRight />
          </button>
        )}
      </div>

      <div className="results-table">
        <div className="results-table-header">
          <span>Pos</span>
          <span>Driver</span>
          <span>Team</span>
          <span className="result-time-column">Time / Gap</span>
        </div>

        {loading ? (
          <p className="results-status" role="status">
            Loading latest race results...
          </p>
        ) : error ? (
          <p className="results-status" role="alert">
            {error}
          </p>
        ) : results.length === 0 ? (
          <p className="results-status" role="status">
            No race results available for this season.
          </p>
        ) : (
          results.slice(0, 5).map((result) => {
            const constructor = result.Constructor;
            const team = teamAssets[constructor?.constructorId];

            return (
              <div className="result-row" key={result.Driver.driverId}>
                <span className="result-position">{result.position}</span>

                <div className="result-driver">
                  <span
                    className="driver-team-color"
                    style={{ backgroundColor: team?.color ?? "#8493a3" }}
                  />
                  <span>
                    {result.Driver.givenName} {result.Driver.familyName}
                  </span>
                </div>

                <div className="result-team">
                  {team?.logo && <img src={team.logo} alt="" />}
                  <span>{constructor?.name ?? "—"}</span>
                </div>

                <span className="result-time">
                  {result.Time?.time ?? result.status ?? "—"}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
