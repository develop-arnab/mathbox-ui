import React, { useEffect, useState } from "react";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import Tex2SVG from "react-hook-mathjax";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Button } from "@roketid/windmill-react-ui";
const getErrorFromHTML = (html: any) =>
  html.children[1].firstChild.firstChild.attributes["data-mjx-error"].value;
//@ts-ignore
function EquationInput({ equation, onChange, onRemove }) {
  const [inputValue, setInputValue] = useState(equation);
  const [lastValidInput, setLastValidInput] = useState(equation);
  const [error, setError] = useState(null);
  const hasError = error !== null;

  return (
    <>
      {typeof window !== "undefined" && (
        <div>
          <h3>Latex Input</h3>
          <input
            className={`${hasError ? "error" : ""} w-72`}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(null);

              // Update the equation in the parent component
              onChange(e.target.value); // This is missing in your current code
            }}
            placeholder="Enter equation"
          />
          <div className="text-white">
            <Tex2SVG
              className="tex"
              tabIndex={-1}
              latex={hasError ? lastValidInput : inputValue}
              onSuccess={() =>
                setLastValidInput(hasError ? lastValidInput : inputValue)
              }
              onError={(html) => setError(getErrorFromHTML(html))}
            />
            {hasError && <div>hint: {error}</div>}
            <button onClick={onRemove}>Remove</button>
          </div>
        </div>
      )}
    </>
  );
}

function Charts() {
  Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [inputValue, setInputValue] = React.useState("");
  const [lastValidInput, setLastValidInput] = React.useState("");
  const [error, setError] = React.useState(null);
  const hasError = error !== null;

  const [equationCount, setEquationCount] = useState(3);
  const initialEquations = new Array(equationCount).fill(""); // Initialize equations as empty strings
  const [equations, setEquations] = useState(initialEquations);
  const addEquation = () => {
    setEquations([...equations, ""]);
    setEquationCount(equationCount + 1);
  };
  const removeEquation = (index: any) => {
    if (equations.length > 1) {
      const updatedEquations = [...equations];
      updatedEquations.splice(index, 1);
      setEquations(updatedEquations);
      setEquationCount(equationCount - 1);
    }
  };
  const handleEquationChange = (index: any, equation: any) => {
    if (equation !== undefined) {
      const updatedEquations = [...equations];
      updatedEquations[index] = equation;
      setEquations(updatedEquations);
    }
  };
  const collectEquations = () => {
    const nonEmptyEquations = equations.filter((eq) => eq.trim() !== "");
    console.log("Collected Equations:", nonEmptyEquations);
    // You can call your conversion function here
    const { coefficients, constants } =
      convertEquationsToCoefficients(nonEmptyEquations);
    console.log("COFS ", coefficients, "CONS ", constants);
  };

  function convertEquationsToCoefficients(equations: any) {
    const coefficients: any = [];
    const constants: any = [];

    equations.forEach((equation: any) => {
      if (equation.trim() === "") {
        // Skip empty strings
        return;
      }

      // Remove spaces and split the equation by '='
      const parts = equation.replace(/\s/g, "").split("=");

      if (parts.length === 2) {
        // Split the left and right sides of the equation
        const leftSide = parts[0];
        const rightSide = parts[1];

        // Parse the left side to extract coefficients
        const leftSideCoefficients = leftSide
          .split(/[+\-]/) // Split by '+' or '-'
          .filter((part: any) => part !== "") // Remove empty parts
          .map((part: any) => {
            // Extract the coefficient and variable name (e.g., '2x')
            const match = part.match(/^([-+]?\d*)?([a-z])?$/);
            const coefficient = match[1] ? parseInt(match[1]) : 1; // Default to 1 if coefficient is not specified
            return coefficient;
          });

        // Parse the right side to extract the constant
        const constant = parseInt(rightSide);

        coefficients.push(leftSideCoefficients);
        constants.push(constant);
      }
    });

    return {
      coefficients,
      constants
    };
  }

  return (
    <Layout>
      <PageTitle>Systems of Linear Equations</PageTitle>
      <div>
        <input
          type="number"
          value={equationCount}
          onChange={(e) => {
            const count = parseInt(e.target.value);
            setEquationCount(count);
            setEquations(Array(count).fill(""));
          }}
        />

        {/* <button onClick={addEquation}>Add Equation</button> */}
        {equations.map((equation, index) => (
          <EquationInput
            key={index}
            equation={equation}
            onRemove={() => removeEquation(index)}
            onChange={(newEquation: any) =>
              handleEquationChange(index, newEquation)
            }
          />
        ))}

        <Button layout="outline" onClick={collectEquations}>
          Calculate
        </Button>
      </div>
    </Layout>
  );
}

export default Charts;
