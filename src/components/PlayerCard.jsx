import React from "react";
import { useNavigate } from "react-router-dom";

const PlayerCard = ({ player }) => {
  const navigate = useNavigate();

  return (
    <div className="player-card">
      <img src={player.imageUrl} alt={player.name} className="player-image" />
      <h3>{player.name}</h3>
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <button onClick={() => navigate(`/player/${player.id}`)}>
        See Details
      </button>
    </div>
  );
};

export default PlayerCard;
