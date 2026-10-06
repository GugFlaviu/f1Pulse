import logof1 from "../assets/logof1.png";
import { FiHome, FiFlag, FiUsers, FiBarChart2 } from "react-icons/fi";
import { MdGroups } from "react-icons/md";

import "./Sidebar.css";
export default function Sidebar() {
  return (
    <nav className="sidebar-nav">
      <img alt="logo f1 pulse" className="logo-sidebar" src={logof1} />
      <a href="#" className="active">
        <FiHome />
        <span>Dashboard</span>
      </a>

      <a href="#">
        <FiFlag />
        <span>Races</span>
      </a>

      <a href="#">
        <FiUsers />
        <span>Drivers</span>
      </a>

      <a href="#">
        <MdGroups />
        <span>Teams</span>
      </a>

      <a href="#">
        <FiBarChart2 />
        <span>Telemetry</span>
      </a>
    </nav>
  );
}
