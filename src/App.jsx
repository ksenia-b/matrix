import { useState } from 'react';
import './App.css'
import Table from "./Table.tsx";

function App() {
  const [M, setM] = useState < number > (0);
  const [N, setN] = useState < number > (0);

  const handleGenerate = () => {
  }

  return (
    <>
      <div>
        <input
          type="number"
          value={M}
          onChange={(e) => setM(parseInt(e.target.value, 10))}
          placeholder="Rows"
        />
        <input
          type="number"
          value={N}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
          placeholder="Columns"
        />
        <button onClick={handleGenerate}>Generate Matrix</button>
        <Table matrix={matrix} />
      </div>

      <Table />
    </>
  )
}

export default App
