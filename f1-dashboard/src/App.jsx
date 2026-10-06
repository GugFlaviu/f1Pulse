import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./App.css";

function App() {
  return (
    <div className="main-content">
      {" "}
      <Sidebar />
      <Topbar />
    </div>
  );
}

export default App;
