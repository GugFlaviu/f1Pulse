import "flag-icons/css/flag-icons.min.css";
import { nationalityCodes } from "../../data/nationalityCodes";
import { teamAssets } from "../../data/teamAssets";
import "../dashboard/css/StandingsCard.css";

export default function DriverStandingsTable({ data = [] }) {
  return (
    <div className="standings-card drivers">
      <div className="standings-header"><h2>Drivers' Championship</h2></div>
      <div className="standings-table">
        <div className="standings-table-header"><span>#</span><span>Driver</span><span>Team</span><span className="points-column">Points</span></div>
        {data.map((item) => {
          const constructor = item.Constructors?.[0];
          const team = teamAssets[constructor?.constructorId];
          const flag = nationalityCodes[item.Driver.nationality];

          return (
            <div className="standings-row" key={item.Driver.driverId}>
              <span className="standing-position">{item.position}</span>
              <div className="standing-driver">
                {flag && <span className={`fi fi-${flag}`} role="img" aria-label={item.Driver.nationality} />}
                <span>{item.Driver.givenName} {item.Driver.familyName}</span>
              </div>
              <div className="standing-team">
                {team?.logo && <img src={team.logo} alt="" />}
                <span>{constructor?.name ?? "—"}</span>
              </div>
              <span className="standing-points">{item.points}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
