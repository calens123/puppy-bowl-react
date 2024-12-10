import { useState } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList";
import NewPlayerForm from "./components/NewPlayerForm";

function App() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players"
      );
      const { data } = await response.json();
      setPlayers(data.players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const addPlayer = async (player) => {
    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        }
      );
      await fetchPlayers(); // Refresh the list
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const removePlayer = async (id) => {
    try {
      await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players/${id}`,
        { method: "DELETE" }
      );
      await fetchPlayers(); // Refresh the list
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  return (
    <div className="App">
      <h1>Puppy Bowl</h1>
      <NewPlayerForm onAddPlayer={addPlayer} />
      <PlayerList
        onRemovePlayer={removePlayer}
        onViewDetails={(id) => alert(`Player ID: ${id}`)}
      />
    </div>
  );
}

export default App;
