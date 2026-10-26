
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { teamAssets } from "../../data/teamAssets";
import "./css/StandingsCard.css";

export default function TeamStandingsCard({ title, data = [] }) {
  return (
    <div className="standings-card teams">
      <div className="standings-header">
        <h2>{title}</h2>
        <Link to="/standings/teams" className="standings-btn">
          View Full Standings
          <FiArrowRight />
        </Link>
      </div>

      <div className="standings-table">
        <div className="standings-table-header">
          <span>#</span>
          <span>Team</span>
          <span className="points-column">Points</span>
        </div>

        {data.slice(0, 5).map((item) => {
          const constructor = item.Constructor;
          const team = teamAssets[constructor?.constructorId];

          return (
            <div className="standings-row" key={constructor.constructorId}>
              <span className="standing-position">
                {item.position}
              </span>

              <div className="standing-team">
                {team?.logo && (
                  <img src={team.logo} alt="" />
                )}
                <span>{constructor.name}</span>
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
