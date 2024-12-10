import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PlayerList from "./components/PlayerList";
import NewPlayerForm from "./components/NewPlayerForm";
import PlayerDetails from "./components/PlayerDetails";
import SearchBar from "./components/SearchBar";

function App() {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    fetchPlayers(); // Fetch players on component mount
  }, []);

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
      if (response.ok) {
        await fetchPlayers(); // Refresh the list after adding a player
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const removePlayer = async (id) => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        await fetchPlayers(); // Refresh the list after successful deletion
      }
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <h1>Puppy Bowl</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar query={query} setQuery={setQuery} />
                <NewPlayerForm onAddPlayer={addPlayer} />
                <PlayerList
                  players={filteredPlayers}
                  onRemovePlayer={removePlayer}
                />
              </>
            }
          />
          <Route path="/player/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
