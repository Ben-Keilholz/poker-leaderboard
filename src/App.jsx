import React, { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/16Qpc9Uv54GUV5tZYU9Z6bSzqKFCqKHFUrkC8WAnImUU/Sheet1")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Failed to load sheet data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Poker Leaderboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => {
          const net =
            Number(player.totalWinnings) - Number(player.totalBuyIns);
          const netColor = net >= 0 ? "text-green-600" : "text-red-600";

          return (
            <div
              key={player.name}
              className="bg-white border-2 border-black rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={player.imageUrl}
                alt={player.name}
                style={{ width: "50px", height: "50px" }}
                className="rounded-full object-cover border mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{player.name}</h2>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Buy-Ins:</span>
                  <span>${Number(player.totalBuyIns).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Winnings:</span>
                  <span>${Number(player.totalWinnings).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-2 text-lg font-semibold">
                  <span>Net:</span>
                  <span className={netColor}>
                    ${net.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
