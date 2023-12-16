import React, { useEffect, useState } from "react";
import PageTitle from "maths/components/Typography/PageTitle";
import Layout from "maths/containers/Layout";
import Tex2SVG from "react-hook-mathjax";
import FormulaSelector from "../../maths/components/MathComponents/FormulaSelector";
import SectionTitle from "maths/components/Typography/SectionTitle";
import { Button } from "@roketid/windmill-react-ui";
import { Card, CardBody } from "@roketid/windmill-react-ui";
interface StatsProps {
  initialVectors: number;
  initialRows: number;
  formulas?: Array<Number>;
}
const Statistics: React.FC<StatsProps> = ({
  initialVectors,
  initialRows,
  formulas
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [lastValidInput, setLastValidInput] = React.useState("");
  const [error, setError] = React.useState(null);
  const hasError = error !== null;

  const [equationCount, setEquationCount] = useState(3);
  const initialEquations = new Array(equationCount).fill(""); // Initialize equations as empty strings
  const [equations, setEquations] = useState(initialEquations);
  const [result, setResult] = useState([]);
  const [formulaId, setFormulaId] = useState<number>(13);
  const [numRows, setNumRows] = useState(initialRows);
  const [vectors, setVectors] = useState(() => {
    // Initialize vectors based on the initial number of vectors and rows
    const initialVector = Array(initialRows).fill("");
    return Array(initialVectors).fill(initialVector);
  });
  const collectEquations = async () => {
    const int_vectors = vectors.map((vector) => {
      return vector.map((str: any) => parseInt(str, 10));
    });
    console.log("Input ", int_vectors);
    try {
      // Define the API endpoint
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/calculate/`;

      // Create the request data
      const requestData = {
        formula: formulaId,
        input_values: {
          data: int_vectors
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
      console.log("Mean is  ", data);
      setResult(data.result);
    } catch (error) {
      console.error("API request error:", error);
    }
  };
  const handleSelectFormula = (selectedFormulaId: number) => {
    setFormulaId(selectedFormulaId);
  };

  const handleNumRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumRows = parseInt(e.target.value);
    setNumRows(newNumRows);
    setVectors((prevVectors) => {
      const updatedVectors = prevVectors.map((vector) => {
        const updatedVector = [...vector];
        if (newNumRows > numRows) {
          // Add rows to each vector
          for (let i = numRows; i < newNumRows; i++) {
            updatedVector.push("");
          }
        } else if (newNumRows < numRows) {
          // Remove rows from each vector
          updatedVector.splice(newNumRows);
        }
        return updatedVector;
      });
      return updatedVectors;
    });
  };
  return (
    <Layout>
      <PageTitle>Statistics</PageTitle>
      <div style={{ display: "flex" }}>
        <div>
          <FormulaSelector
            chapterId={3}
            formulaList={[13, 14, 15, 16, 17, 18, 19]}
            formulaId={formulaId}
            onSelectFormula={handleSelectFormula}
          />
        </div>
        <div>
          <div className="input-group">
            <label>Number of Rows:</label>
            <input
              type="number"
              value={numRows}
              onChange={handleNumRowsChange}
            />
          </div>
          {vectors.map((vector, vectorIdx) => (
            <div key={vectorIdx} className="vector">
              <SectionTitle>v{vectorIdx + 1}</SectionTitle>
              <div className="vector-inputs">
                {vector.map((value: any, rowIdx: any) => (
                  <input
                    className="vector-input"
                    key={rowIdx}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVectors((prevVectors) => {
                        const updatedVectors = [...prevVectors];
                        updatedVectors[vectorIdx][rowIdx] = value;
                        return updatedVectors;
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div>
            <Button layout="outline" onClick={collectEquations}>
              Calculate
            </Button>
            <Card colored className="text-white bg-purple-600">
              <CardBody>
                <p className="mb-4 font-semibold">Result</p>
                <p>{result}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
