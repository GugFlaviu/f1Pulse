import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import { countryCodes } from "../../data/countryCodes";
import { circuitAssets } from "../../data/circuitAssets";
import "./css/UpcomingRaces.css";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function UpcomingRaces({ races = null }) {
  return (
    <div className="upcoming-races-card">
      <div className="upcoming-races-header">
        <h2>Upcoming Races</h2>

        <Link to="/races" className="upcoming-calendar-btn">
          View Calendar
          <FiArrowRight />
        </Link>
      </div>

      <div className="upcoming-table">
        <div className="upcoming-table-header">
          <span>Round</span>
          <span>Date</span>
          <span>Grand Prix</span>
          <span>Circuit</span>
        </div>

        {races === null ? (
          <p className="upcoming-status" role="status">
            Loading upcoming races...
          </p>
        ) : races.length === 0 ? (
          <p className="upcoming-status" role="status">
            No upcoming races this season.
          </p>
        ) : (
          races.map((race) => {
            const country = race.Circuit.Location.country;
            const flag = countryCodes[country];
            const circuitIcon = circuitAssets[race.Circuit.circuitId]?.icon;

            return (
              <div className="upcoming-row" key={race.round}>
                <span>{race.round}</span>

                <span>
                  {race.FirstPractice?.date &&
                    `${formatDate(race.FirstPractice.date)} - `}
                  {formatDate(race.date)}
                </span>

                <div className="upcoming-grand-prix">
                  {flag && (
                    <span
                      className={`race-country-flag fi fi-${flag}`}
                      role="img"
                      aria-label={country}
                    />
                  )}
                  <span>{race.raceName}</span>
                </div>

                <div className="upcoming-circuit">
                  {circuitIcon && (
                    <img
                      className="circuit-small-icon"
                      src={circuitIcon}
                      alt=""
                    />
                  )}
                  <span>{race.Circuit.circuitName}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
