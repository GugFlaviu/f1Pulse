import { teamAssets } from "../../data/teamAssets";
import "../dashboard/css/StandingsCard.css";

export default function TeamStandingsTable({ data = [] }) {
  return (
    <div className="standings-card teams">
      <div className="standings-header"><h2>Teams' Championship</h2></div>
      <div className="standings-table">
        <div className="standings-table-header"><span>#</span><span>Team</span><span className="points-column">Points</span></div>
        {data.map((item) => {
          const constructor = item.Constructor;
          const team = teamAssets[constructor.constructorId];

          return (
            <div className="standings-row" key={constructor.constructorId}>
              <span className="standing-position">{item.position}</span>
              <div className="standing-team">
                {team?.logo && <img src={team.logo} alt="" />}
                <span>{constructor.name}</span>
              </div>
              <span className="standing-points">{item.points}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
