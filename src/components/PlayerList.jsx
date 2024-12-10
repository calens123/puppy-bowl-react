import React from "react";
import PlayerCard from "./PlayerCard";

const PlayerList = ({ players, onRemovePlayer }) => {
  return (
    <div className="player-list">
      {players.length > 0 ? (
        players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onRemovePlayer={onRemovePlayer}
          />
        ))
      ) : (
        <p>No players found.</p>
      )}
    </div>
  );
};

export default PlayerList;
