import React from 'react';
import { Cell } from '../types';
import { useMatrix } from '../contexts/MatrixContext';


type TableProps = {
    matrix: Cell[][];
};

const Table: React.FC<TableProps> = ({ matrix }) => {
    const { setMatrix } = useMatrix();
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
        const updatedMatrix = [...matrix];
        updatedMatrix[rowIndex][colIndex].amount += 1;
        setMatrix(updatedMatrix);
    };

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {Array.from({ length: numCols }, (_, i) => (
                        <th key={i} scope="col">Column {i + 1}</th>
                    ))}
                    <th scope="col">Row Sum</th>
                </tr>
            </thead>
            <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map(cell => (
                            <td key={cell.id} onClick={() => handleCellClick(rowIndex, colIndex)}>{cell.amount}</td>
                        ))}
                        <td>{rowSums[rowIndex]}</td>
                    </tr>
                ))}
                <tr>
                    {percentiles.map((percentile, colIndex) => (
                        <td key={colIndex}>{percentile}</td>
                    ))}
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
