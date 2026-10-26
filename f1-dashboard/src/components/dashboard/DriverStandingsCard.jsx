
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { nationalityCodes } from "../../data/nationalityCodes";
import { teamAssets } from "../../data/teamAssets";
import "./css/StandingsCard.css";

export default function DriverStandingsCard({ title, data = [] }) {
  return (
    <div className="standings-card drivers">
      <div className="standings-header">
        <h2>{title}</h2>
        <Link to="/standings/drivers" className="standings-btn">
          View Full Standings
          <FiArrowRight />
        </Link>
      </div>

      <div className="standings-table">
        <div className="standings-table-header">
          <span>#</span>
          <span>Driver</span>
          <span>Team</span>
          <span className="points-column">Points</span>
        </div>

        {data.slice(0, 5).map((item) => {
          const constructor = item.Constructors?.[0];
          const team = teamAssets[constructor?.constructorId];
          const flagCode = nationalityCodes[item.Driver?.nationality];

          return (
            <div className="standings-row" key={item.Driver.driverId}>
              <span className="standing-position">
                {item.position}
              </span>

              <div className="standing-driver">
                {flagCode && (
                  <span className={`fi fi-${flagCode}`} />
                )}
                <span>
                  {item.Driver.givenName} {item.Driver.familyName}
                </span>
              </div>

              <div className="standing-team">
                {team?.logo && (
                  <img src={team.logo} alt="" />
                )}
                <span>{constructor?.name}</span>
              </div>

              <span className="standing-points">
                {item.points}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
