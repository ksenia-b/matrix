import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Cell from './types';

const App: React.FC = () => {
  const [matrix, setMatrix] = useState < Cell[][] > ([]);
  const [M, setM] = useState < number > (0);
  const [N, setN] = useState < number > (0);

  const generateMatrix = (M: number, N: number) => {
    const newMatrix: Cell[][] = [];
    let id = 0;

    for (let i = 0; i < M; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < N; j++) {
        row.push({
          id: id++,
          amount: Math.floor(Math.random() * 900) + 100,
        });
      }
      newMatrix.push(row);
    }

    setMatrix(newMatrix);
  };

  // Handler for generating matrix based on input values
  const handleGenerate = () => {
    if (M >= 0 && M <= 100 && N >= 0 && N <= 100) {
      generateMatrix(M, N);
    }
  };

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
    </>
  );
};

export default App;
