import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import { Cell } from './types';

const App: React.FC = () => {
  const [matrix, setMatrix] = useState < Cell[][] > ([]);
  const [M, setM] = useState < number > (0);
  const [N, setN] = useState < number > (0);
  const [error, setError] = useState < string | null > (null);

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

  const handleGenerate = () => {
    if (M > 0 && M <= 100 && N > 0 && N <= 100) {
      setError(null);
      generateMatrix(M, N);
    } else {
      setError('Please enter valid numbers for rows and columns (1-100).');
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
        {error && <p className="error">{error}</p>}
        <Table matrix={matrix} />
      </div>
    </>
  );
};

export default App;
