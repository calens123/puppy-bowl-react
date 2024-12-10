import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players"
        );
        const data = await response.json();
        if (data.success) {
          setPlayers(data.data.players);
        } else {
          console.error("Error fetching players:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <p>Loading players...</p>;

  return (
    <div className="player-list">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;
