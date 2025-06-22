import React from "react";
import players from "./data/players";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Poker Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => {
          const net = player.totalWinnings - player.totalBuyIns;
          const netColor = net >= 0 ? "text-green-600" : "text-red-600";

          return (
            <div key={player.name} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
              <img
                src={player.imageUrl}
                alt={player.name}
                style={{ width: "100px", height: "100px" }}
                className="rounded-full object-cover border"
              />
              <div>
                <h2 className="text-xl font-semibold">{player.name}</h2>
                <p className="text-sm">Buy-Ins: ${player.totalBuyIns.toLocaleString()}</p>
                <p className="text-sm">Winnings: ${player.totalWinnings.toLocaleString()}</p>
                <p className={`text-sm font-bold ${netColor}`}>Net: ${net.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
