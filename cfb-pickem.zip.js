/**
 * Full CFB Pick'em App Auto-Build
 * - Bankroll system
 * - Risk per pick
 * - Leaderboard
 * - Username profiles
 * - Demo data files
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

const dirs = [
  "app",
  "app/dashboard",
  "app/leaderboard",
  "app/username",
  "components",
  "context",
  "data"
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
});

/* ROOT LAYOUT */

fs.writeFileSync(
  path.join(root, "app", "layout.jsx"),
  `
export const metadata = {
  title: "CFB Pick'em",
  description: "College Football Pick'em with bankroll and leaderboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui",
          background: "#0b1020",
          color: "#f5f5f5"
        }}
      >
        <header
          style={{
            padding: "1rem 1.5rem",
            background: "#111827",
            borderBottom: "1px solid #1f2937",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                background: "#1d4ed8",
                fontWeight: 700,
                fontSize: "0.9rem"
              }}
            >
              $
            </span>
            <div>
              <div style={{ fontWeight: 600 }}>CFB Pick'em</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                Bankroll • Picks • Leaderboard
              </div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: "0.75rem", fontSize: "0.85rem" }}>
            <a href="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>
              Home
            </a>
            <a href="/dashboard" style={{ color: "#e5e7eb", textDecoration: "none" }}>
              Dashboard
            </a>
            <a href="/leaderboard" style={{ color: "#e5e7eb", textDecoration: "none" }}>
              Leaderboard
            </a>
          </nav>
        </header>
        <main style={{ padding: "1.5rem" }}>{children}</main>
      </body>
    </html>
  );
}
`.trim()
);

/* HOME PAGE */

fs.writeFileSync(
  path.join(root, "app", "page.jsx"),
  `
export default function Home() {
  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>
        College Football Pick'em
      </h1>
      <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
        Build a bankroll, make weekly picks, and climb the leaderboard.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "0.75rem"
        }}
      >
        <a
          href="/dashboard"
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            background: "#111827",
            textDecoration: "none",
            color: "#e5e7eb"
          }}
        >
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Dashboard</h2>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            Enter a username, set your bankroll, and make picks with risk per game.
          </p>
        </a>

        <a
          href="/leaderboard"
          style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            background: "#111827",
            textDecoration: "none",
            color: "#e5e7eb"
          }}
        >
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Leaderboard</h2>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            See how bankrolls stack up across users and sessions.
          </p>
        </a>
      </div>

      <div
        style={{
          marginTop: "1.25rem",
          padding: "0.75rem 1rem",
          borderRadius: "0.75rem",
          border: "1px dashed #374151",
          background: "#020617"
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
          This is a demo shell: bankroll, picks, and leaderboard are stored in simple
          in-memory data files. You can later swap in a real database or API.
        </p>
      </div>
    </section>
  );
}
`.trim()
);

/* DATA: GAMES */

fs.writeFileSync(
  path.join(root, "data", "games.js"),
  `
export const games = [
  {
    id: 1,
    week: 1,
    home: "Alabama",
    away: "Georgia",
    spread: -3.5,
    kickoff: "Sat 3:30 PM"
  },
  {
    id: 2,
    week: 1,
    home: "Ohio State",
    away: "Michigan",
    spread: -2.5,
    kickoff: "Sat 7:00 PM"
  },
  {
    id: 3,
    week: 1,
    home: "Texas",
    away: "Oklahoma",
    spread: -1.5,
    kickoff: "Sat 12:00 PM"
  },
  {
    id: 4,
    week: 1,
    home: "LSU",
    away: "Florida State",
    spread: -4.0,
    kickoff: "Sun 7:30 PM"
  },
  {
    id: 5,
    week: 1,
    home: "USC",
    away: "Notre Dame",
    spread: -6.5,
    kickoff: "Sat 10:30 PM"
  }
];
`.trim()
);

/* DATA: USERS (FAKE STORAGE) */

fs.writeFileSync(
  path.join(root, "data", "users.js"),
  `
export const users = [
  {
    username: "demo",
    bankroll: 1000,
    wins: 3,
    losses: 1
  }
];
`.trim()
);

/* CONTEXT: PICKS + BANKROLL */

fs.writeFileSync(
  path.join(root, "context", "PicksContext.js"),
  `
"use client";

import { createContext, useContext, useState } from "react";
import { games } from "../data/games";

const PicksContext = createContext(null);

export function PicksProvider({ children }) {
  const [username, setUsername] = useState("");
  const [bankroll, setBankroll] = useState(1000);
  const [riskPerGame, setRiskPerGame] = useState(50);
  const [picks, setPicks] = useState({});
  const [week, setWeek] = useState(1);

  const currentGames = games.filter(g => g.week === week);

  const makePick = (gameId, side) => {
    if (!username) {
      alert("Enter a username before making picks.");
      return;
    }
    if (riskPerGame <= 0) {
      alert("Set a positive risk amount.");
      return;
    }
    if (riskPerGame > bankroll) {
      alert("Risk exceeds current bankroll.");
      return;
    }

    setPicks(prev => ({
      ...prev,
      [gameId]: { side, risk: riskPerGame }
    }));

    setBankroll(prev => prev - riskPerGame);
  };

  const resetWeek = () => {
    setPicks({});
  };

  const value = {
    username,
    setUsername,
    bankroll,
    setBankroll,
    riskPerGame,
    setRiskPerGame,
    picks,
    makePick,
    week,
    setWeek,
    currentGames,
    resetWeek
  };

  return (
    <PicksContext.Provider value={value}>{children}</PicksContext.Provider>
  );
}

export function usePicks() {
  const ctx = useContext(PicksContext);
  if (!ctx) {
    throw new Error("usePicks must be used within PicksProvider");
  }
  return ctx;
}
`.trim()
);

/* COMPONENT: GAME CARD */

fs.writeFileSync(
  path.join(root, "components", "GameCard.jsx"),
  `
"use client";

import { usePicks } from "../context/PicksContext";

export default function GameCard({ game }) {
  const { picks, makePick } = usePicks();
  const pick = picks[game.id];

  const isHome = pick?.side === "home";
  const isAway = pick?.side === "away";

  return (
    <div
      style={{
        borderRadius: "0.75rem",
        border: "1px solid #1f2937",
        padding: "0.75rem 1rem",
        background: "#020617",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.9rem" }}>
            {game.away} @ {game.home}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            Kickoff: {game.kickoff}
          </div>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
          Spread: {game.spread > 0 ? "+" : ""}
          {game.spread}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
        <button
          onClick={() => makePick(game.id, "home")}
          style={{
            flex: 1,
            padding: "0.4rem 0.6rem",
            borderRadius: "0.5rem",
            border: "1px solid #1f2937",
            background: isHome ? "#1d4ed8" : "#111827",
            color: isHome ? "#e5e7eb" : "#9ca3af",
            fontSize: "0.8rem"
          }}
        >
          {game.home}
        </button>
        <button
          onClick={() => makePick(game.id, "away")}
          style={{
            flex: 1,
            padding: "0.4rem 0.6rem",
            borderRadius: "0.5rem",
            border: "1px solid #1f2937",
            background: isAway ? "#1d4ed8" : "#111827",
            color: isAway ? "#e5e7eb" : "#9ca3af",
            fontSize: "0.8rem"
          }}
        >
          {game.away}
        </button>
      </div>

      {pick && (
        <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
          Pick: {pick.side === "home" ? game.home : game.away} • Risk: $
          {pick.risk}
        </div>
      )}
    </div>
  );
}
`.trim()
);

/* DASHBOARD PAGE */

fs.writeFileSync(
  path.join(root, "app", "dashboard", "page.jsx"),
  `
"use client";

import { PicksProvider, usePicks } from "../../context/PicksContext";
import GameCard from "../../components/GameCard";

function DashboardInner() {
  const {
    username,
    setUsername,
    bankroll,
    setBankroll,
    riskPerGame,
    setRiskPerGame,
    week,
    setWeek,
    currentGames,
    resetWeek
  } = usePicks();

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h1 style={{ fontSize: "1.5rem" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem"
        }}
      >
        <div
          style={{
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "0.75rem 1rem",
            background: "#020617"
          }}
        >
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>User & Bankroll</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem" }}>
              Username
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem"
                }}
              />
            </label>

            <label style={{ fontSize: "0.8rem" }}>
              Bankroll ($)
              <input
                type="number"
                value={bankroll}
                onChange={e => setBankroll(Number(e.target.value || 0))}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem"
                }}
              />
            </label>

            <label style={{ fontSize: "0.8rem" }}>
              Risk per game ($)
              <input
                type="number"
                value={riskPerGame}
                onChange={e => setRiskPerGame(Number(e.target.value || 0))}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem"
                }}
              />
            </label>

            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.8rem",
                color: "#9ca3af"
              }}
            >
              Current bankroll: <strong>${bankroll}</strong>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "0.75rem 1rem",
            background: "#020617"
          }}
        >
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Week & Controls</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.8rem" }}>
              Week
              <input
                type="number"
                value={week}
                onChange={e => setWeek(Number(e.target.value || 1))}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem"
                }}
              />
            </label>

            <button
              onClick={resetWeek}
              style={{
                marginTop: "0.5rem",
                padding: "0.4rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #374151",
                background: "#111827",
                color: "#e5e7eb",
                fontSize: "0.8rem"
              }}
            >
              Clear picks for this week
            </button>

            <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
              Week selection filters the game list. In this demo, all games are Week 1.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Games</h2>
        {currentGames.length === 0 ? (
          <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            No games found for this week.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "0.75rem"
            }}
          >
            {currentGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <PicksProvider>
      <DashboardInner />
    </PicksProvider>
  );
}
`.trim()
);

/* LEADERBOARD PAGE */

fs.writeFileSync(
  path.join(root, "app", "leaderboard", "page.jsx"),
  `
import { users } from "../../data/users";

export default function LeaderboardPage() {
  const sorted = [...users].sort((a, b) => b.bankroll - a.bankroll);

  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h1 style={{ fontSize: "1.5rem" }}>Leaderboard</h1>
      <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
        Demo leaderboard using static user data. You can later wire this to a real
        database or API.
      </p>

      <div
        style={{
          borderRadius: "0.75rem",
          border: "1px solid #1f2937",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            padding: "0.5rem 0.75rem",
            background: "#020617",
            fontSize: "0.8rem",
            color: "#9ca3af"
          }}
        >
          <div>User</div>
          <div style={{ textAlign: "right" }}>Bankroll</div>
          <div style={{ textAlign: "right" }}>Record</div>
        </div>
        {sorted.map((u, idx) => (
          <div
            key={u.username + idx}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "0.5rem 0.75rem",
              background: idx % 2 === 0 ? "#020617" : "#030712",
              fontSize: "0.8rem"
            }}
          >
            <div>{u.username}</div>
            <div style={{ textAlign: "right" }}>${u.bankroll}</div>
            <div style={{ textAlign: "right" }}>
              {u.wins}-{u.losses}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`.trim()
);

/* USERNAME PAGE (PROFILE SHELL) */

fs.writeFileSync(
  path.join(root, "app", "username", "page.jsx"),
  `
export default function UsernamePage() {
  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h1 style={{ fontSize: "1.5rem" }}>User Profile (Demo)</h1>
      <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
        This route can later show a specific user's picks, bankroll history, and
        weekly performance. For now, it's a placeholder shell.
      </p>
    </section>
  );
}
`.trim()
);

/* SIMPLE HEADER COMPONENT (OPTIONAL USE) */

fs.writeFileSync(
  path.join(root, "components", "Header.jsx"),
  `
export default function Header() {
  return (
    <header
      style={{
        padding: "1rem",
        borderBottom: "1px solid #1f2937",
        background: "#020617"
      }}
    >
      <h1>CFB Pick'em</h1>
    </header>
  );
}
`.trim()
);

console.log("Full upgraded CFB Pick'em app structure generated.");
