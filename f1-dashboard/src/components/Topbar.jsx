import "./Topbar.css";
import { FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Topbar({ year }) {
  const { pathname } = useLocation();
  const pageTitles = {
    races: "Races",
    drivers: "Drivers",
    teams: "Teams",
    standings: "Standings",
    settings: "Settings",
  };
  const title = pathname === "/"
    ? "Season Dashboard"
    : pathname.endsWith("/results")
      ? "Race Results"
      : pageTitles[pathname.split("/")[1]] ?? "Page Not Found";
  const [time, setTime] = useState(new Date());
  const currentTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  
  });
  const currentDate = time.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="topbar">
      <h1 className="topbar-title">
        <span>{year}</span> {title}
      </h1>
      <div className="topbar-time">
        {<FiClock />}
        <strong>{currentDate}</strong>
        <strong>{currentTime}</strong>
      </div>
    </div>
  );
}
