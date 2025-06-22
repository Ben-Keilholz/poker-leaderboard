import React, { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/YOUR_SHEET_ID/YOUR_TAB_NAME")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const netA = Number(a.totalWinnings) - Number(a.totalBuyIns);
          const netB = Number(b.totalWinnings) - Number(b.totalBuyIns);
          return netB - netA;
        });
        setPlayers(sorted);
      })
      .catch((err) => console.error("Failed to load sheet data:", err));
  }, []);

  return (
    <div
      className="min-h-screen bg-repeat bg-top p-6"
      style={{ backgroundImage: "url('/images/your-background.jpg')" }} // optional
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow">
        Poker Leaderboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => {
          const net =
            Number(player.totalWinnings) - Number(player.totalBuyIns);
          const netColor = net >= 0 ? "text-green-600" : "text-red-600";

          let rankDisplay;
          if (index === 0) {
            rankDisplay = (
              <img
                src="/images/gold-medal.png"
                alt="Gold Medal"
                className="w-8 h-8"
              />
            );
          } else if (index === 1) {
            rankDisplay = (
              <img
                src="/images/silver-medal.png"
                alt="Silver Medal"
                className="w-8 h-8"
              />
            );
          } else if (index === 2) {
            rankDisplay = (
              <img
                src="/images/bronze-medal.png"
                alt="Bronze Medal"
                className="w-8 h-8"
              />
            );
          } else {
            rankDisplay = (
              <div className="text-sm font-semibold text-gray-700">
                #{index + 1}
              </div>
            );
          }

          return (
            <div
              key={player.name}
              className="relative bg-white bg-opacity-90 border-2 border-black rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="absolute top-2 left-2">{rankDisplay}</div>

              <img
                src={player.imageUrl}
                alt={player.name}
                style={{ width: "50px", height: "50px" }}
                className="rounded-full object-cover border mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{player.name}</h2>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Buy-Ins:
                  </span>
                  <span>${Number(player.totalBuyIns).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Winnings:
                  </span>
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
