// VectorFormulaSelector.tsx
import React from "react";
import "./FormulaSelector.css"; // Import the CSS file
interface VectorFormulaSelectorProps {
  formulaId: number;
  onSelectFormula: (formulaId: number) => void;
}

const VectorFormulaSelector: React.FC<VectorFormulaSelectorProps> = ({
  formulaId,
  onSelectFormula
}) => {
  return (
    <div className="formula-selector">
      <button
        className={formulaId === 1 ? "selected" : ""}
        onClick={() => onSelectFormula(1)} // Set the formula ID when clicked
      >
        Cross Product of Matrices
      </button>
      <button
        className={formulaId === 2 ? "selected" : ""}
        onClick={() => onSelectFormula(2)} // Set the formula ID when clicked
      >
        Determinant of a Matrix
      </button>
      <button
        className={formulaId === 3 ? "selected" : ""}
        onClick={() => onSelectFormula(3)} // Set the formula ID when clicked
      >
        Inverse of a Matrix
      </button>
      <button
        className={formulaId === 4 ? "selected" : ""}
        onClick={() => onSelectFormula(4)} // Set the formula ID when clicked
      >
        Rank of a Matrix
      </button>
      <button
        className={formulaId === 5 ? "selected" : ""}
        onClick={() => onSelectFormula(5)} // Set the formula ID when clicked
      >
        Transpose of a Matrix
      </button>
      <button
        className={formulaId === 6 ? "selected" : ""}
        onClick={() => onSelectFormula(6)} // Set the formula ID when clicked
      >
        Eigenvalues and Eigenvectors of a Matrix
      </button>
    </div>
  );
};

export default VectorFormulaSelector;
