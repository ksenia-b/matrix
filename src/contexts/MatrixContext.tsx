import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Cell } from '../types';

interface MatrixContextType {
    matrix: Cell[][];
    setMatrix: (matrix: Cell[][]) => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [matrix, setMatrix] = useState<Cell[][]>([]);

    return (
        <MatrixContext.Provider value={{ matrix, setMatrix }}>
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = (): MatrixContextType => {
    const context = useContext(MatrixContext);
    if (context === undefined) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};
