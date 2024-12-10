import { useState } from "react";

function NewPlayerForm({ onAddPlayer }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !breed || !imageUrl) {
      alert("All fields are required!");
      return;
    }
    const newPlayer = { name, breed, imageUrl };
    await onAddPlayer(newPlayer);
    setName("");
    setBreed("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Breed:
        <input value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default NewPlayerForm;
