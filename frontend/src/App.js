import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`api/test`);
      setUsers(data);
    }
    fetchData();
  }, [users.length]);

  async function handleAddPerson() {
    const { data } = await axios.post(`api/test`, {
      name,
    });

    setUsers((prev) => [...prev, data]);
  }

  return (
    <div>
      <ul>
        {users.map((person) => (
          <li key={person._id}>{person.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddPerson}>Add</button>
    </div>
  );
}

export default App;
