import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="content-page">
      <div className="page-panel">
        <span className="season-badge">404</span>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link className="page-link" to="/"><FiArrowLeft /> Back to Dashboard</Link>
      </div>
    </section>
  );
}
