import { Link } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import { countryCodes } from "../../data/countryCodes";
import { circuitAssets } from "../../data/circuitAssets";
import "../dashboard/css/UpcomingRaces.css";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function RaceCalendar({ races = [] }) {
  return (
    <div className="upcoming-races-card race-calendar-card">
      <div className="upcoming-table">
        <div className="upcoming-table-header">
          <span>Round</span><span>Date</span><span>Grand Prix</span><span>Circuit</span>
        </div>
        {races.map((race) => {
          const country = race.Circuit.Location.country;
          const flag = countryCodes[country];
          const icon = circuitAssets[race.Circuit.circuitId]?.icon;

          return (
            <div className="upcoming-row" key={race.round}>
              <span>{race.round}</span>
              <span>{race.FirstPractice?.date && `${formatDate(race.FirstPractice.date)} - `}{formatDate(race.date)}</span>
              <div className="upcoming-grand-prix">
                {flag && <span className={`race-country-flag fi fi-${flag}`} role="img" aria-label={country} />}
                <Link className="race-name-link" to={`/races/${race.round}`}>{race.raceName}</Link>
              </div>
              <div className="upcoming-circuit">
                {icon && <img className="circuit-small-icon" src={icon} alt="" />}
                <span>{race.Circuit.circuitName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
