import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/dashboard/Dashboard";
import Races from "./pages/Races";
import RaceDetails from "./pages/RaceDetails";
import RaceResults from "./pages/RaceResults";
import Drivers from "./pages/Drivers";
import Teams from "./pages/Teams";
import Standings from "./pages/Standings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./App.css";
import "./pages/css/Pages.css";

function App() {
  const [year, setYear] = useState(() => {
    try {
      const savedYear = Number(localStorage.getItem("f1-season"));
      if (Number.isInteger(savedYear) && savedYear >= 2000 && savedYear <= new Date().getFullYear()) {
        return savedYear;
      }
    } catch (error) {
      console.error(error);
    }
    return new Date().getFullYear();
  });

  useEffect(() => {
    try {
      localStorage.setItem("f1-season", String(year));
    } catch (error) {
      console.error(error);
    }
  }, [year]);

  return (
    <div className="main-content">
      <Sidebar />
      <Topbar year={year} />
      <Routes>
        <Route path="/" element={<Dashboard key={year} year={year} />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/races" element={<Races key={year} year={year} />} />
        <Route path="/races/:round" element={<RaceDetails key={year} year={year} />} />
        <Route path="/races/:round/results" element={<RaceResults key={year} year={year} />} />
        <Route path="/drivers" element={<Drivers key={year} year={year} />} />
        <Route path="/teams" element={<Teams key={year} year={year} />} />
        <Route path="/standings" element={<Navigate to="/standings/drivers" replace />} />
        <Route path="/standings/:type" element={<Standings key={year} year={year} />} />
        <Route path="/settings" element={<Settings year={year} setYear={setYear} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
