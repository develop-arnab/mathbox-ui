// FormulaSelector.tsx
import React, { useState, useEffect } from "react";
// import "./FormulaSelector.css"; // Import the CSS file
interface FormulaSelectorProps {
  formulaId: number;
  onSelectFormula: (formulaId: number) => void;
  formulaList?: Array<Number>;
}

const FormulaSelector: React.FC<FormulaSelectorProps> = ({
  formulaId,
  onSelectFormula,
  formulaList
}) => {
  const [formulas, setformulas] = useState([]);

  useEffect(() => {
    getAllFormulas();
  }, []);

  const getAllFormulas = async () => {
    try {
      const apiUrl = "http://127.0.0.1:8000/get_formulas_by_chapter/1";

      // Make the GET request to the Django server
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("All Formulas ", data);
      setformulas(data?.formulas);
    } catch (err) {}
  };
  return (
    <div className="formula-selector">
      {formulas.map((formula: any) => {
        if (formulaList?.includes(formula.id)) {
          return (
            // eslint-disable-next-line react/jsx-key
            <button
              key={formula.id}
              className={formulaId === formula.id ? "selected" : ""}
              onClick={() => onSelectFormula(formula.id)} // Set the formula ID when clicked
            >
              {formula.name}
            </button>
          );
        }
      })}
    </div>
  );
};

export default FormulaSelector;
