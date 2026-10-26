import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ResultsTable from "../components/races/ResultsTable";
import { getRaceResults } from "../data/api";
import NotFound from "./NotFound";

export default function RaceResults({ year }) {
  const { round } = useParams();
  const [data, setData] = useState({ round: null, race: null, error: "" });
  const validRound = /^[1-9]\d*$/.test(round);
  const loading = validRound && data.round !== round;

  useEffect(() => {
    if (!validRound) return;
    let ignore = false;

    async function loadData() {
      try {
        const race = await getRaceResults(year, round);
        if (!ignore) setData({ round, race, error: "" });
      } catch (error) {
        console.error(error);
        if (!ignore) setData({ round, race: null, error: "Unable to load race results. Please try again later." });
      }
    }

    loadData();
    return () => { ignore = true; };
  }, [year, round, validRound]);

  if (!validRound) return <NotFound />;

  return (
    <section className="content-page">
      <Link className="page-link" to={`/races/${round}`}><FiArrowLeft /> Race Details</Link>
      <div className="page-heading">
        <div><h2>Race Results</h2><p>Full classification, race times and finishing status.</p></div>
        <span className="season-badge">{year} · Round {round}</span>
      </div>
      {loading ? <p className="page-message" role="status">Loading race results...</p> : data.error ? (
        <p className="page-message" role="alert">{data.error}</p>
      ) : !data.race?.Results?.length ? (
        <p className="page-message">No results available for this race yet.</p>
      ) : <ResultsTable race={data.race} />}
    </section>
  );
}
