import { useEffect, useState } from "react";

function PlayerList({ onRemovePlayer, onViewDetails }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players"
        );
        const { data } = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    fetchPlayers();
  }, []);

  return (
    <div id="all-players-container">
      {players.map((player) => (
        <div className="player-card" key={player.id}>
          <h2>{player.name}</h2>
          <img src={player.imageUrl} alt={player.name} />
          <p>Breed: {player.breed}</p>
          <button onClick={() => onViewDetails(player.id)}>See Details</button>
          <button onClick={() => onRemovePlayer(player.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;
