import logof1 from "../assets/logof1.png";
import { FiSettings, FiHome, FiFlag, FiUsers, FiBarChart2 } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
export default function Sidebar() {
  return (
    <nav className="sidebar-nav" aria-label="Main navigation">
      <img alt="logo f1 pulse" className="logo-sidebar" src={logof1} />
      <NavLink to="/" end aria-label="Dashboard">
        <FiHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/races" aria-label="Races">
        <FiFlag />
        <span>Races</span>
      </NavLink>

      <NavLink to="/drivers" aria-label="Drivers">
        <FiUsers />
        <span>Drivers</span>
      </NavLink>

      <NavLink to="/teams" aria-label="Teams">
        <MdGroups />
        <span>Teams</span>
      </NavLink>

      <NavLink to="/standings" aria-label="Standings">
        <FiBarChart2 />
        <span>Standings</span>
      </NavLink>
      <NavLink to="/settings" aria-label="Settings">
        <FiSettings />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}
