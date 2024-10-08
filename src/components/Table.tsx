import React, { useState } from 'react';
import { Cell } from '../types';

type TableProps = {
    matrix: Cell[][];
    setMatrix: () => void;
};

const Table: React.FC<TableProps> = ({ matrix, setMatrix }) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    const [highlightedCells, setHighlightedCells] = useState<Set<number>>(
        new Set()
    );
    const [isCellHovered, setIsCellHovered] = useState<boolean>(false)


    if (matrix.length === 0) return <p>No data available</p>;

    const numCols = matrix[0].length;

    const rowSums = matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));

    const columnAverages = Array.from({ length: numCols }, (_, colIndex) => {
        const colValues = matrix.map(row => row[colIndex].amount);
        const sum = colValues.reduce((total, value) => total + value, 0);
        return sum / colValues.length;
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
            id: Date.now() + colIndex,
            amount: Math.floor(Math.random() * 900) + 100,
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

    const handleMouseLeave = () => {
        setHoveredValue(null);
        setHighlightedCells(new Set());
        setIsCellHovered(false)
    };

    const onCellHover = (rowIndex, colIndex) => {
        const hoveredAmount = matrix[rowIndex][colIndex].amount;
        setHoveredValue(hoveredAmount);

        const allCells = matrix.flat();
        const sortedCells = allCells
            .map(cell => ({ ...cell, diff: Math.abs(cell.amount - hoveredAmount) }))
            .sort((a, b) => a.diff - b.diff)
            .slice(0, 5);

        const highlightedIds = new Set(sortedCells.map(cell => cell.id));
        setHighlightedCells(highlightedIds);
        setIsCellHovered(true);
    }

    return (
        <div >
            <button onClick={handleAddRow}>Add Random Row</button>
            <table className="data-table">
                <thead>
                    <tr>
                        {Array.from({ length: numCols }, (_, i) => (
                            <th key={i} scope="col">Column {i + 1}</th>
                        ))}
                        <th scope="col">Column Sum</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => {
                        const rowSum = rowSums[rowIndex];
                        return (
                            <tr onMouseLeave={handleMouseLeaveSumCell} key={rowIndex}>
                                {row.map((cell, colIndex) => {
                                    const rowHoverStyles = hoveredRow === rowIndex
                                        ? `rgba(255, 0, 0, ${calculatePercentage(cell.amount, rowSum) / 100})`
                                        : 'inherit';

                                    const cellHoverStyles = highlightedCells.has(cell.id)
                                        ? 'yellow'
                                        : 'inherit';

                                    const tdStyle = {
                                        backgroundColor: isCellHovered ? cellHoverStyles : rowHoverStyles
                                    }

                                    return (
                                        <td
                                            key={cell.id}
                                            onMouseEnter={() => onCellHover(rowIndex, colIndex)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            style={tdStyle}

                                        >
                                            {hoveredRow === rowIndex
                                                ? `${calculatePercentage(cell.amount, rowSum).toFixed(2)}%`
                                                : cell.amount}
                                        </td>
                                    )
                                })}
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
                        );
                    })}
                    <tr>
                        <td colSpan={numCols + 2} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Average
                        </td>
                    </tr>
                    <tr>
                        {columnAverages.map((average, colIndex) => (
                            <td key={colIndex}>{average.toFixed(2)}</td>
                        ))}
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
