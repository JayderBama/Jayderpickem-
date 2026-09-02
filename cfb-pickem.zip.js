/**
 * Auto-build CFB Pick'em App
 * Generates Next.js app structure, pages, and basic components.
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

// Ensure folders exist
const dirs = [
  "app",
  "app/dashboard",
  "app/username",
  "components",
  "context",
  "data"
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
});

// Root layout (required by Next.js)
fs.writeFileSync(
  path.join(root, "app", "layout.jsx"),
  `
export const metadata = {
  title: "CFB Pick'em",
  description: "College Football Pick'em App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui" }}>
        <header style={{ padding: "1rem", background: "#1a73e8", color: "#fff" }}>
          <h1>CFB Pick'em</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
`.trim()
);

// Write homepage
fs.writeFileSync(
  path.join(root, "app", "page.jsx"),
  `
export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>CFB Pick'em</h1>
      <p>Welcome! Use the dashboard to make your weekly college football picks.</p>
      <a href="/dashboard" style={{ display: "inline-block", marginTop: "1rem" }}>
        Go to Dashboard
      </a>
    </main>
  );
}
`.trim()
);

// Write dashboard page
fs.writeFileSync(
  path.join(root, "app", "dashboard", "page.jsx"),
  `
"use client";

import { useState } from "react";

const initialGames = [
  { id: 1, home: "Alabama", away: "Georgia" },
  { id: 2, home: "Ohio State", away: "Michigan" },
  { id: 3, home: "Texas", away: "Oklahoma" }
];

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [picks, setPicks] = useState({});

  const handlePick = (gameId, team) => {
    setPicks(prev => ({ ...prev, [gameId]: team }));
  };

  const handleSave = () => {
    if (!username) {
      alert("Enter a username before saving picks.");
      return;
    }
    console.log("Saved picks for", username, picks);
    alert("Picks saved! (Demo only)");
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>CFB Pick'em Dashboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </div>

      <section>
        <h2>Games</h2>
        {initialGames.map(game => (
          <div
            key={game.id}
            style={{
              border: "1px solid #ccc",
              padding: "0.75rem",
              marginBottom: "0.5rem"
            }}
          >
            <div>
              {game.away} at {game.home}
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <button
                onClick={() => handlePick(game.id, game.home)}
                style={{
                  marginRight: "0.5rem",
                  background:
                    picks[game.id] === game.home ? "#0070f3" : "#eee",
                  color: picks[game.id] === game.home ? "#fff" : "#000"
                }}
              >
                {game.home}
              </button>
              <button
                onClick={() => handlePick(game.id, game.away)}
                style={{
                  background:
                    picks[game.id] === game.away ? "#0070f3" : "#eee",
                  color: picks[game.id] === game.away ? "#fff" : "#000"
                }}
              >
                {game.away}
              </button>
            </div>
          </div>
        ))}
      </section>

      <button
        onClick={handleSave}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Save Picks
      </button>
    </main>
  );
}
`.trim()
);

// Write username page
fs.writeFileSync(
  path.join(root, "app", "username", "page.jsx"),
  `
export default function UsernamePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Username Page</h1>
      <p>This route can later show a user's picks and record.</p>
    </main>
  );
}
`.trim()
);

// Basic data file
fs.writeFileSync(
  path.join(root, "data", "
