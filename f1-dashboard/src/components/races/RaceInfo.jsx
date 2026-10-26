import { FiCalendar, FiMapPin } from "react-icons/fi";
import "flag-icons/css/flag-icons.min.css";
import { countryCodes } from "../../data/countryCodes";
import { circuitAssets } from "../../data/circuitAssets";
import "../dashboard/css/NextRace.css";

export default function RaceInfo({ race, totalRounds }) {
  const flag = countryCodes[race.Circuit.Location.country];
  const image = circuitAssets[race.Circuit.circuitId]?.photo;

  return (
    <div className="next-race-card">
      <div className="next-race-header"><h2>Circuit Details</h2></div>
      <div className="next-race-info">
        {flag && <span className={`race-flag fi fi-${flag}`} role="img" aria-label={race.Circuit.Location.country} />}
        <div className="race-title-info">
          <h3>{race.raceName}</h3>
          <div className="race-circuit"><FiMapPin /><span>{race.Circuit.circuitName}</span></div>
        </div>
      </div>
      <div className="race-meta">
        <div className="race-date"><FiCalendar /><span>{race.date}</span></div>
        <span className="race-round">Round {race.round} / {totalRounds}</span>
      </div>
      {image && <div className="race-image-frame"><img className="race-image" src={image} alt={race.Circuit.circuitName} /></div>}
    </div>
  );
}
