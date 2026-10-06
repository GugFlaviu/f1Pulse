import "./Topbar.css";
import { FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
export default function Topbar() {
  const d = new Date();
  let year = d.getFullYear();
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
        <span>{year}</span> Season Dashboard
      </h1>
      <div className="topbar-time">
        {<FiClock />}
        <strong>{currentDate}</strong>
        <strong>{currentTime}</strong>
      </div>
    </div>
  );
}
