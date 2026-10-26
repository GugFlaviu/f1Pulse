<div align="center">
  <img src="src/assets/logof1.png" alt="F1 Pulse" width="300" />

  <h1>F1 Pulse</h1>

  <p>Formula 1 seasons, races, drivers and standings — all in one dashboard.</p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
  ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
</div>

---

## About

**F1 Pulse** is a React application for exploring Formula 1 seasons from **2000 to the present**.

Powered by the **Jolpica F1 API**, it brings together race calendars, driver information, team statistics and championship standings.

The interface features a dark theme with red accents, country flags, team logos and locally stored driver portraits.

## Live Demo

🏎️ **[Explore F1 Pulse](https://f1dashboardgugflaviu.netlify.app/)**

## Features

- **Dashboard** — season statistics, the next race, championship leaders and recent results.
- **Race Calendar** — browse the season and filter upcoming or past races.
- **Race Details** — circuit information, photographs and weekend schedules in UTC.
- **Full Race Results** — finishing positions, drivers, teams, laps, times and points.
- **Drivers** — portraits, search and statistics, ordered by their teams’ championship positions.
- **Teams** — logos, search and statistics, ordered by the constructors’ standings.
- **Championship Standings** — complete driver and constructor classifications.
- **Settings** — select a season from 2000 onwards, with your preference saved automatically in the browser.
- **Responsive Layout** — adapted navigation and layouts for desktop and mobile screens.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Components and state management |
| Vite | Development server and production builds |
| React Router | Client-side navigation |
| CSS | Styling and responsive layouts |
| React Icons | Interface icons |
| Flag Icons | Country flags |
| Jolpica F1 API | Formula 1 data |
| ESLint | Code linting |

The application uses functional components, `useState`, `useEffect`, props and `fetch` requests.

## Getting Started

### Prerequisites

Make sure **Node.js** and **npm** are installed.

### Install dependencies

Run the following command from the project directory:

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Project Structure

```text
src/
├── assets/
│   ├── circuits/       # Circuit photographs and icons
│   ├── drivers/        # Driver portraits
│   └── teams/          # Team logos
├── components/
│   ├── dashboard/      # Dashboard components
│   ├── races/          # Calendar, race details and results
│   └── standings/      # Full championship tables
├── data/
│   ├── api.js          # API request functions
│   ├── circuitAssets.js
│   ├── driverAssets.js
│   └── teamAssets.js
├── pages/              # Application pages and their styles
├── App.jsx             # Routes and selected season
└── main.jsx            # Application entry point
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Dashboard |
| `/races` | Race calendar |
| `/races/:round` | Race details |
| `/races/:round/results` | Full race results |
| `/drivers` | Drivers |
| `/teams` | Teams |
| `/standings/drivers` | Driver standings |
| `/standings/teams` | Constructor standings |
| `/settings` | Settings |

## Data and Visual Assets

Formula 1 data is provided by the [Jolpica F1 API](https://github.com/jolpica/jolpica-f1).

Driver portraits and team logos are stored locally. The bundled driver portraits are from the 2026 season. Drivers without an available portrait use a fallback icon.

Image sources are documented in:

- [Driver portrait sources](src/assets/drivers/SOURCES.md)
- [Team logo sources](src/assets/teams/SOURCES.md)

---

<div align="center">
  <strong>F1 Pulse — follow the season, explore every race.</strong>
</div>