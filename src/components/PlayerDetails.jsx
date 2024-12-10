import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players/${id}`
        );
        const data = await response.json();
        if (data.success) {
          setPlayer(data.data.player);
        } else {
          console.error("Error fetching player details:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [id]);

  if (loading) return <p>Loading player details...</p>;
  if (!player) return <p>Player not found!</p>;

  return (
    <div className="player-details">
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={player.imageUrl} alt={player.name} />
      <h2>{player.name}</h2>
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <p>Team ID: {player.teamId}</p>
    </div>
  );
};

export default PlayerDetails;
