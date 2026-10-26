<div align="center">
  <img src="src/assets/logof1.png" alt="F1 Pulse" width="300" />

  <h1>F1 Pulse</h1>

  <p>Sezoane, curse, piloți și clasamente Formula 1, într-un singur dashboard.</p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
  ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
</div>

---

## Despre proiect

**F1 Pulse** este o aplicație React pentru explorarea sezoanelor Formula 1, începând cu anul **2000**.

Aplicația folosește date din **Jolpica F1 API** și oferă un dashboard cu informații despre sezonul selectat, calendarul curselor, piloți, echipe și clasamente.

Interfața păstrează un design întunecat, cu accente roșii, steaguri, sigle și fotografii locale ale piloților.

## Funcționalități

- **Dashboard** — statistici despre sezon, următoarea cursă, clasamente și ultimele rezultate.
- **Calendar** — lista curselor, cu filtre pentru curse viitoare și trecute.
- **Detaliile cursei** — circuit, fotografie, dată și programul sesiunilor în UTC.
- **Rezultate complete** — poziții, piloți, echipe, tururi, timpi și puncte.
- **Piloți** — fotografii, căutare și statistici, cu cardurile ordonate după clasamentul echipelor.
- **Echipe** — sigle, căutare și statistici, în ordinea clasamentului constructorilor.
- **Clasamente** — clasificările complete pentru piloți și constructori.
- **Setări** — selectarea sezonului din 2000 până în prezent, cu salvare automată în browser.

## Tehnologii

| Tehnologie | Utilizare |
| --- | --- |
| React | Componente și gestionarea stării |
| Vite | Server de dezvoltare și build |
| React Router | Navigarea între pagini |
| CSS | Design și adaptare la dimensiunea ecranului |
| React Icons | Iconuri pentru interfață |
| Flag Icons | Steagurile țărilor |
| Jolpica F1 API | Date despre Formula 1 |

Codul folosește componente funcționale, `useState`, `useEffect`, props și requesturi cu `fetch`.

## Instalare și pornire

Ai nevoie de **Node.js** și **npm** instalate.

Din directorul proiectului, instalează dependențele:

```bash
npm install
```

Pornește serverul de dezvoltare:

```bash
npm run dev
```

Deschide în browser adresa afișată în terminal.

## Comenzi disponibile

| Comandă | Descriere |
| --- | --- |
| `npm run dev` | Pornește serverul de dezvoltare |
| `npm run build` | Generează versiunea pentru producție |
| `npm run preview` | Afișează local versiunea compilată |
| `npm run lint` | Verifică regulile ESLint |

## Structura proiectului

```text
src/
├── assets/
│   ├── circuits/       # Fotografii și iconuri ale circuitelor
│   ├── drivers/        # Portrete ale piloților
│   └── teams/          # Siglele echipelor
├── components/
│   ├── dashboard/      # Componentele dashboardului
│   ├── races/          # Calendar, detalii și rezultate
│   └── standings/      # Tabelele clasamentelor complete
├── data/
│   ├── api.js          # Funcțiile pentru requesturile API
│   ├── circuitAssets.js
│   ├── driverAssets.js
│   └── teamAssets.js
├── pages/              # Paginile aplicației și stilurile lor
├── App.jsx             # Rutele și sezonul selectat
└── main.jsx            # Inițializarea aplicației
```

## Pagini și rute

| Rută | Pagină |
| --- | --- |
| `/` | Dashboard |
| `/races` | Calendarul curselor |
| `/races/:round` | Detaliile unei curse |
| `/races/:round/results` | Rezultatele unei curse |
| `/drivers` | Piloți |
| `/teams` | Echipe |
| `/standings/drivers` | Clasamentul piloților |
| `/standings/teams` | Clasamentul constructorilor |
| `/settings` | Setări |

## Date și resurse vizuale

Datele sunt preluate din [Jolpica F1 API](https://github.com/jolpica/jolpica-f1).

Fotografiile disponibile ale piloților și siglele echipelor sunt păstrate local. Pentru piloții fără fotografie disponibilă, aplicația afișează o pictogramă implicită.

Sursele imaginilor sunt documentate în:

- [Fotografiile piloților](src/assets/drivers/SOURCES.md)
- [Siglele echipelor](src/assets/teams/SOURCES.md)

---

<div align="center">
  <strong>F1 Pulse — urmărește sezonul, explorează fiecare cursă.</strong>
</div>