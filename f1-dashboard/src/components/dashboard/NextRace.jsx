import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import "./css/NextRace.css";

export default function NextRaceCard({
  raceName,
  circuitName,
  date,
  round,
  totalRounds,
  flag,
  image
}) {
  return (
    <div className="next-race-card">
      <div className="next-race-header">
        <h2>Next Race</h2>

        <Link to={`/races/${round}`} className="race-details-btn">
          View Details
          <FiArrowRight />
        </Link>
      </div>

      <div className="next-race-info">
        {flag && (
          <span
            className={`race-flag fi fi-${flag}`}
            role="img"
            aria-label={`${raceName} flag`}
          />
        )}

        <div className="race-title-info">
          <h3>{raceName}</h3>

          <div className="race-circuit">
            <FiMapPin />
            <span>{circuitName}</span>
          </div>
        </div>
      </div>

      <div className="race-meta">
        <div className="race-date">
          <FiCalendar />
          <span>{date}</span>
        </div>

        <span className="race-round">
          Round {round} / {totalRounds}
        </span>
      </div>

      {image && <div className="race-image-frame">
        <img
          className="race-image"
          src={image}
          alt={circuitName}
        />
      </div>}
    </div>
  );
}
