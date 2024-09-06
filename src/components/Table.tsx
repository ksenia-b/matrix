import React, { useState } from 'react';
import { Cell } from '../types';
import { useMatrix } from '../contexts/MatrixContext';

type TableProps = {
    matrix: Cell[][];
    setMatrix: () => void;
};

const Table: React.FC<TableProps> = ({ matrix, setMatrix }) => {
    // const { setMatrix } = useMatrix();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    if (matrix.length === 0) return <p>No data available</p>;

    const numCols = matrix[0].length;

    const rowSums = matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));

    const percentiles = Array.from({ length: numCols }, (_, colIndex) => {
        const colValues = matrix.map(row => row[colIndex].amount).sort((a, b) => a - b);
        const middle = Math.floor(colValues.length / 2);
        return colValues.length % 2 === 0
            ? (colValues[middle - 1] + colValues[middle]) / 2
            : colValues[middle];
    });

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        const updatedMatrix = matrix.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex
                    ? { ...cell, amount: cell.amount + 1 }
                    : cell
            )
        );
        setMatrix(updatedMatrix);
    };

    const handleRemoveRow = (rowIndex: number) => {
        const updatedMatrix = matrix.filter((_, index) => index !== rowIndex);
        setMatrix(updatedMatrix);
    };

    const handleAddRow = () => {
        const newRow: Cell[] = Array.from({ length: numCols }, (_, colIndex) => ({
            id: Date.now() + colIndex, // Unique ID
            amount: Math.floor(Math.random() * 900) + 100, // Random number between 100 and 999
        }));
        setMatrix([...matrix, newRow]);
    };

    const handleMouseEnterSumCell = (rowIndex: number) => {
        setHoveredRow(rowIndex);
    };

    const handleMouseLeaveSumCell = () => {
        setHoveredRow(null);
    };

    const calculatePercentage = (amount: number, rowSum: number) => (
        rowSum === 0 ? 0 : (amount / rowSum) * 100
    );

    return (
        <>
            <button onClick={handleAddRow}>Add Random Row</button>
            <table className="data-table">
                <thead>
                    <tr>
                        {Array.from({ length: numCols }, (_, i) => (
                            <th key={i} scope="col">Column {i + 1}</th>
                        ))}
                        <th scope="col">Row Sum</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => {
                        const rowSum = rowSums[rowIndex];
                        return (
                            <React.Fragment key={rowIndex}>
                                <tr onMouseLeave={handleMouseLeaveSumCell}>
                                    {row.map((cell, colIndex) => (
                                        <td
                                            key={cell.id}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            style={{
                                                backgroundColor: hoveredRow === rowIndex
                                                    ? `rgba(255, 0, 0, ${calculatePercentage(cell.amount, rowSum) / 100})`
                                                    : 'inherit',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {hoveredRow === rowIndex
                                                ? `${calculatePercentage(cell.amount, rowSum).toFixed(2)}%`
                                                : cell.amount}
                                        </td>
                                    ))}
                                    <td
                                        onMouseEnter={() => handleMouseEnterSumCell(rowIndex)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {rowSum}
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveRow(rowIndex)}>Remove</button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                    <tr>
                        {percentiles.map((percentile, colIndex) => (
                            <td key={colIndex}>{percentile}</td>
                        ))}
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Table;
