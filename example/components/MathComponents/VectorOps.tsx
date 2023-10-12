import React, { useState } from "react";
// import "./MatrixInput.css"; // Import your CSS file
import FormulaSelector from "./FormulaSelector";
import FunctionPlotter from "./FunctionPlotter";
import { Card, CardBody } from "@roketid/windmill-react-ui";
import { Button } from "@roketid/windmill-react-ui";
import SectionTitle from "example/components/Typography/SectionTitle";
interface VectorOpsProps {
  initialVectors: number;
  initialRows: number;
  formulas?: Array<Number>;
}

const VectorOps: React.FC<VectorOpsProps> = ({
  initialVectors,
  initialRows,
  formulas
}) => {
  const [result, setResult] = useState("");
  const [sum, setSum] = useState([]);
  const [formulaId, setFormulaId] = useState<number>(7);
  const [numVectors, setNumVectors] = useState(initialVectors);
  const [numRows, setNumRows] = useState(initialRows);
  const [xData, setxData] = useState([]);
  const [yData, setyData] = useState([]);
  const [vectors, setVectors] = useState<string[][]>(() => {
    // Initialize vectors based on the initial number of vectors and rows
    const initialVector = Array(initialRows).fill("");
    return Array(initialVectors).fill(initialVector);
  });

  const handleNumVectorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumVectors = parseInt(e.target.value);
    setNumVectors(newNumVectors);
    setVectors((prevVectors) => {
      const updatedVectors = [...prevVectors];
      if (newNumVectors > updatedVectors.length) {
        // Add vectors to the array
        for (let i = updatedVectors.length; i < newNumVectors; i++) {
          updatedVectors.push(Array(numRows).fill(""));
        }
      } else if (newNumVectors < updatedVectors.length) {
        // Remove vectors from the array
        updatedVectors.splice(newNumVectors);
      }
      return updatedVectors;
    });
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

  const calculateVectors = async () => {
    // Gather all vectors and send them for calculation
    console.log("Vectors to calculate:", vectors);
    // You can make API requests here with the vectors

    try {
      // Define the API endpoint
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/calculate/`;

      // Create the request data
      const requestData = {
        formula: formulaId, // Replace with the desired formula ID
        input_values: {
          matrix: vectors
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

      if (formulaId === 6) {
        setResult(
          `Eigen values of the given matrix are [${data.result[0].x_values}] and the Eigenvectors are \n [ ${data.result[1].y_values} ]`
        );
      } else if (formulaId === 7) {
        console.log("Request IS returning ", data.result[0].input[0]);
        setxData(data.result[0].input[0]);
        setyData(data.result[0].input[1]);
        setResult(`The Two vectors are ${data.result[1].dependence}`);
      } else if (formulaId === 8) {
        console.log("Request IS returning ", data.result[0].input[0]);
        setxData(data.result[0].input[0]);
        setyData(data.result[0].input[1]);
        setSum(data.result[1].sum);
        setResult(`Sum of the vectors is ${data.result[1].sum}`);
      } else if (formulaId === 9) {
        console.log("Request IS returning ", data.result[0].input[0]);
        setxData(data.result[0].input[0]);
        setyData(data.result[0].input[1]);
        setSum(data.result[1].sum);
        setResult(`Substraction of the vector is ${data.result[1].sum}`);
      } else if (formulaId === 10) {
        console.log("Request IS returning ", data.result[0].input[0]);
        setxData(data.result[0].input[0]);
        setyData(data.result[0].input[1]);
        setSum(data.result[1].sum);
        setResult(`Dot Product of Vectors is ${data.result[1].sum}`);
      } else if (formulaId === 11) {
        console.log("Request IS returning ", data.result[0].input[0]);
        setxData(data.result[0].input[0]);
        setyData(data.result[0].input[1]);
        setSum(data.result[1].sum);
        setResult(`Cross Product of Vectors is ${data.result[1].sum}`);
      } else {
        setResult(data.result);
      }
      //   setCalculationResult(data); // Store the calculation result in state
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleSelectFormula = (selectedFormulaId: number) => {
    setFormulaId(selectedFormulaId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        padding: 20,
        backgroundColor: "#FAE9E800"
      }}
    >
      {/* Add the FormulaSelector component */}
        <FormulaSelector
          formulaList={formulas}
          formulaId={formulaId}
          onSelectFormula={handleSelectFormula}
        />
      <div className="matrix-input-container">
        <div className="row-column-inputs">
          <div className="input-group">
            <label>Number of Vectors:</label>
            <input
              type="number"
              value={numVectors}
              onChange={handleNumVectorsChange}
            />
          </div>
          <div className="input-group">
            <label>Number of Rows:</label>
            <input
              type="number"
              value={numRows}
              onChange={handleNumRowsChange}
            />
          </div>
        </div>
        {vectors.map((vector, vectorIdx) => (
          <div key={vectorIdx} className="vector">
            <SectionTitle>v{vectorIdx + 1}</SectionTitle>
            <div className="vector-inputs">
              {vector.map((value, rowIdx) => (
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
        <div className="p-8">
          <Button layout="outline" onClick={calculateVectors}>
            Calculate
          </Button>
        </div>
        <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Result</p>
            <p>{result ? result : ""}</p>
          </CardBody>
        </Card>
        <FunctionPlotter xdata={xData} ydata={yData} result={sum} />
      </div>
    </div>
  );
};

export default VectorOps;
