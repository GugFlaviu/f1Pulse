import "./css/Dashboard.css";
import {
  getRaces,
  getDrivers,
  getTeams,
  getDriverChampionship,
  getTeamChampionship,
  getLatestRaceResults,
} from "../../data/api";
import { FiCalendar, FiUsers, FiAward } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import StatCard from "./StatCard";
import NextRace from "./NextRace";
import DriverStandingsCard from "./DriverStandingsCard";
import TeamStandingsCard from "./TeamStandingsCard";
import UpcomingRaces from "./UpcomingRaces";
import LatestRaceResults from "./LatestRaceResults";
import { countryCodes } from "../../data/countryCodes";
import { circuitAssets } from "../../data/circuitAssets";

export default function Dashboard({ year = 2026 }) {
  const hasFetched = useRef(false);

  const [races, setRaces] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [driversChampionship, setDriversChampionship] = useState(null);
  const [teamsStanding, setTeamsStanding] = useState(null);
  const [currentChampion, setCurrentChampion] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [upcomingRaces, setUpcomingRaces] = useState(null);
  const [latestRace, setLatestRace] = useState(null);
  const [latestResultsLoading, setLatestResultsLoading] = useState(true);
  const [latestResultsError, setLatestResultsError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const racesData = await getRaces(year);
        const driversData = await getDrivers(year);
        const teamsData = await getTeams(year);
        const standings = await getDriverChampionship(year);
        const teamStandings = await getTeamChampionship(year);
        const now = new Date();
        const upcomingRacesv2 = racesData
          .filter(
            (race) =>
              new Date(`${race.date}T${race.time || "00:00:00Z"}`) > now,
          )
          .slice(0, 5);
        setRaces(racesData);
        setDrivers(driversData);
        setTeams(teamsData);
        setDriversChampionship(standings);
        setTeamsStanding(teamStandings);
        setCurrentChampion(standings[0] ?? null);
        setNextRace(upcomingRacesv2[0] ?? null);
        setUpcomingRaces(upcomingRacesv2);
      } catch (error) {
        console.error(error);
        setError("Unable to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    async function loadLatestResults() {
      try {
        const latestRaceData = await getLatestRaceResults(year);
        setLatestRace(latestRaceData);
      } catch (error) {
        console.error(error);
        setLatestResultsError("Unable to load latest race results.");
      } finally {
        setLatestResultsLoading(false);
      }
    }

    loadData();
    loadLatestResults();
  }, [year]);

  if (error) {
    return <section className="content-page"><p className="page-message" role="alert">{error}</p></section>;
  }
  return (
    <div className="dashboard">
      <section className="dashboard-stats">
        <StatCard
          title="Total Races"
          number={races.length}
          paragraph={`in ${year} season`}
          icon={<FiCalendar />}
        />

        <StatCard
          title="Total Drivers"
          number={drivers.length}
          paragraph="on the grid"
          icon={<FiUsers />}
        />

        <StatCard
          title="Total Teams"
          number={teams.length}
          paragraph="competing"
          icon={<MdGroups />}
        />

        <StatCard
          title="Championship Leader"
          number={
            currentChampion?.Driver
              ? `${currentChampion.Driver.givenName} ${currentChampion.Driver.familyName}`
              : loading ? "Loading..." : "—"
          }
          paragraph={
            currentChampion
              ? `${currentChampion.points} points`
              : loading ? "Loading standings..." : "No standings available"
          }
          icon={<FiAward />}
        />
      </section>

      <section className="dashboard-main-grid">
        {nextRace ? (
          <NextRace
            raceName={nextRace.raceName}
            circuitName={nextRace.Circuit.circuitName}
            date={nextRace.date}
            round={nextRace.round}
            totalRounds={races.length}
            flag={countryCodes[nextRace.Circuit.Location.country]}
            image={circuitAssets[nextRace.Circuit.circuitId]?.photo ?? ""}
          />
        ) : (
          <p role="status">{loading ? "Loading next race..." : `No upcoming races in ${year}.`}</p>
        )}

        {driversChampionship ? (
          <DriverStandingsCard
            title="Drivers' Championship"
            data={driversChampionship}
          />
        ) : (
          <p>Loading drivers' championship...</p>
        )}

        {teamsStanding ? (
          <TeamStandingsCard title="Teams' Championship" data={teamsStanding} />
        ) : (
          <p>Loading teams' championship...</p>
        )}
      </section>

      <section className="dashboard-bottom-grid">
        <UpcomingRaces races={upcomingRaces} />
        <LatestRaceResults
          race={latestRace}
          loading={latestResultsLoading}
          error={latestResultsError}
        />
      </section>
    </div>
  );
}
