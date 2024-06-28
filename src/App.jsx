import React, { useState } from 'react';
import './PathApp.css';

function calculateGridPaths(X, Y) {
  let gridArray = Array.from({ length: X }, () => Array(Y).fill(0));
  for (let i = 0; i < X; i++) {
    gridArray[i][0] = 1;
  }
  for (let j = 0; j < Y; j++) {
    gridArray[0][j] = 1;
  }
  for (let i = 1; i < X; i++) {
    for (let j = 1; j < Y; j++) {
      gridArray[i][j] = gridArray[i - 1][j] + gridArray[i][j - 1];
    }
  }
  return gridArray;
}

function GridDisplay({ grid }) {
  return (
    <div className="gridContainer">
      {grid.map((row, i) => (
        <div key={i} className="gridRow">
          {row.map((cell, j) => (
            <div key={j} className={`gridCell ${i === grid.length - 1 && j === row.length - 1 ? 'finalCell' : ''}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PathApp() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [grid, setGrid] = useState(calculateGridPaths(3, 3));

  const handleGridChange = () => {
    const newRows = Math.max(1, rows); // Ensure rows is at least 1
    const newColumns = Math.max(1, columns); // Ensure columns is at least 1
    setGrid(calculateGridPaths(newRows, newColumns));
  };

  const handleRowsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setRows(value);
    setGrid(calculateGridPaths(value, columns));
  };

  const handleColumnsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setColumns(value);
    setGrid(calculateGridPaths(rows, value));
  };

  return (
    <div className="pathApp">
      <h1>Grid Path Calculator</h1>
      <div className="inputControls">
        <label>
          Rows:
          <input type="number" value={rows} onChange={handleRowsChange} />
        </label>
        <label>
          Columns:
          <input type="number" value={columns} onChange={handleColumnsChange} />
        </label>
        <button onClick={handleGridChange}>Calculate</button>
      </div>
      <div className="pathNumber">Number of paths to the last cell: {grid[rows - 1][columns - 1]}</div>
      <GridDisplay grid={grid} />
    </div>
  );
}

export default PathApp;
