// MatrixInput.tsx
import React, { useState, useEffect } from "react";
// import "./MatrixInput.css"; // Import your CSS file
import FormulaSelector from "./FormulaSelector";
import { Card, CardBody } from "@roketid/windmill-react-ui";
import { Button } from "@roketid/windmill-react-ui";
import SectionTitle from "maths/components/Typography/SectionTitle";
interface MatrixInputProps {
  initialRows: number;
  initialColumns: number;
  formulas?: Array<Number>;
  selected?: String;
  updateFormula?: any;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  initialRows,
  initialColumns,
  formulas,
  selected,
  updateFormula
}) => {
  const [result, setResult] = useState("");
  const [formulaId, setFormulaId] = useState<number>(Number(selected));
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [matrix, setMatrix] = useState<string[][]>(() => {
    // Initialize the matrix based on the initial rows and columns
    return [...Array(initialRows)].map(() => Array(initialColumns).fill(""));
  });

  useEffect(() => {
    setFormulaId(Number(selected));
  }, [selected]);
  const [calculationResult, setCalculationResult] = useState<any>(null); // Store the calculation result
  const handleSelectFormula = (selectedFormulaId: number) => {
    setFormulaId(selectedFormulaId);
    updateFormula(selectedFormulaId);
  };

  const handleInputChange = (rowIdx: number, colIdx: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[rowIdx][colIdx] = value;
    setMatrix(newMatrix);
  };

  const handleRowInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRowCount = parseInt(e.target.value);
    setRows(newRowCount);
    setMatrix((prevMatrix) => {
      const updatedMatrix = [...prevMatrix];
      if (newRowCount > rows) {
        // Add rows to the matrix
        for (let i = rows; i < newRowCount; i++) {
          updatedMatrix.push(Array(columns).fill(""));
        }
      } else if (newRowCount < rows) {
        // Remove rows from the matrix
        updatedMatrix.splice(newRowCount);
      }
      return updatedMatrix;
    });
  };

  const handleColumnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumnCount = parseInt(e.target.value);
    setColumns(newColumnCount);
    setMatrix((prevMatrix) => {
      const updatedMatrix = prevMatrix.map((row) => {
        const newRow = [...row];
        if (newColumnCount > columns) {
          // Add columns to the matrix
          for (let i = columns; i < newColumnCount; i++) {
            newRow.push("");
          }
        } else if (newColumnCount < columns) {
          // Remove columns from the matrix
          newRow.splice(newColumnCount);
        }
        return newRow;
      });
      return updatedMatrix;
    });
  };

  const calculateMatrix = async () => {
    try {
      // Define the API endpoint
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/calculate/`;

      // Create the request data
      const requestData = {
        formula: formulaId, // Replace with the desired formula ID
        input_values: {
          matrix: matrix
        }
      };
      console.log("Request IS ", requestData);
      // Make the POST request to the Django server
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Request IS returning ", data);
      if (formulaId === 6) {
        setResult(
          `Eigen values of the given matrix are [${data.result[0].x_values}] and the Eigenvectors are \n [ ${data.result[1].y_values} ]`
        );
      } else {
        setResult(data.result);
      }
      //   setCalculationResult(data); // Store the calculation result in state
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  useEffect(() => {
    // You can access the calculation result here whenever it changes
    console.log("Calculation result:", calculationResult);
  }, [calculationResult]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 1100,
        padding: 20,
        backgroundColor: "#FAE9E800"
      }}
    >
      {/* Add the FormulaSelector component */}
      <div style={{ flex: 1 }}>
        <FormulaSelector
          chapterId={1}
          formulaList={formulas}
          formulaId={formulaId}
          onSelectFormula={handleSelectFormula}
        />
      </div>
      <div className="matrix-input-container">
        <div className="row-column-inputs">
          <div className="input-group">
            <label>Rows:</label>
            <input type="number" value={rows} onChange={handleRowInputChange} />
          </div>
          <div className="input-group">
            <label>Columns:</label>
            <input
              type="number"
              value={columns}
              onChange={handleColumnInputChange}
            />
          </div>
        </div>
        <table className="matrix-table">
          <tbody>
            {matrix.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(rowIdx, colIdx, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ margin: 10 }}>
          <button onClick={calculateMatrix}>Calculate</button>{" "}
        </div>
        <div className="p-8">
          <Button layout="outline" onClick={calculateMatrix}>
            Calculate
          </Button>
        </div>
        <div style={{ margin: 10 }}>
          <label>Result : {result} </label>
        </div>
        <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Result</p>
            <p>{result}</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default MatrixInput;
