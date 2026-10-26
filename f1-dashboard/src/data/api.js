
const BASE_URL = "https://api.jolpi.ca/ergast/f1";

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getRaces(year = 2026) {
  const data = await fetchData(`${year}/races.json?limit=100`);
  return data.MRData.RaceTable.Races;
}


export async function getDrivers(year = 2026) {
  const response = await fetch(
    `${BASE_URL}/${year}/last/results.json?limit=22`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch drivers");
  }

  const data = await response.json();
  return data.MRData.RaceTable.Races[0]?.Results.map((result) => result.Driver) ?? [];
}

export async function getTeams(year = 2026) {
  const data = await fetchData(`${year}/constructors.json?limit=100`);
  return data.MRData.ConstructorTable.Constructors;
}


export async function getDriverChampionship(year = 2026,amount=10) {
  const data = await fetchData(`${year}/driverstandings.json?limit=${amount}`);
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
}


export async function getTeamChampionship(year = 2026,amount=11) {
  const data = await fetchData(`${year}/constructorstandings.json?limit=${amount}`);
  return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? [];
}
export async function getNextRace(year=2026) {
  const data = await fetchData(`${year}/next.json?limit=100`);
  return data.MRData.RaceTable.Races[0] ?? null;
}

export async function getLatestRaceResults(year = 2026, amount = 5) {
  const data = await fetchData(`${year}/last/results.json?limit=${amount}`);
  return data.MRData.RaceTable.Races[0] ?? null;
}

export async function getRaceResults(year, round) {
  const data = await fetchData(`${year}/${encodeURIComponent(round)}/results.json?limit=100`);
  return data.MRData.RaceTable.Races[0] ?? null;
}

export async function getSeasons() {
  const data = await fetchData("seasons.json?limit=100");
  return data.MRData.SeasonTable.Seasons;
}

