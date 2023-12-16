import React, { useState, useEffect } from "react";

import CTA from "../../../maths/components/CTA";
import PageTitle from "../../../maths/components/Typography/PageTitle";

import Layout from "../../../maths/containers/Layout";
import MatrixInput from "../../../maths/components/MathComponents/MatrixInput";
import Head from "next/head";
import { useRouter } from "next/router";
function Forms() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    console.log("PARAM ", router.query.matrices);
    switch (router.query.matrices) {
      case "cross-product":
        setSelected(1);
        break;
      case "determinant":
        setSelected(2);
        break;
      case "matrix-inverse":
        setSelected(3);
        break;
      case "rank-matrix":
        setSelected(4);
        break;
      case "transpose":
        setSelected(5);
        break;
      case "eigenvalues-eigenvectors":
        setSelected(6);
        break;
      default:
        setSelected(1);
    }
  }, [router]);

  const updateFormula = (id) => {
    switch (id) {
      case 1:
        router.push("cross-product");
        break;
      case 2:
        router.push("determinant");
        break;
      case 3:
        router.push("matrix-inverse");
        break;
      case 4:
        router.push("rank-matrix");
        break;
      case 5:
        router.push("transpose");
        break;
      case 6:
        router.push("eigenvalues-eigenvectors");
        break;
      default:
        router.push("cross-product");
    }
  };
  return (
    <Layout>
      <Head>
        <title>
          {router.query.matrices
            ?.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          | Solve Matrices
        </title>
        <meta
          name="description"
          content="Explore comprehensive solutions for matrix problems on our site. Learn the intricacies of Cross Product, Dot Product, Inverse, Transpose, and Determinant. Unravel the mysteries of matrix rank, eigenvalues, and eigenvectors with expert guidance."
        />
        <meta
          name="keywords"
          content="Matrix algebra , Cross Product , Dot Product , Matrix Inverse , Matrix Transpose , Determinant of a Matrix , Matrix Rank , Eigenvalues and Eigenvectors , Linear algebra solutions , Matrix operations"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shelltunes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PageTitle>Matrices</PageTitle>
      <MatrixInput
        updateFormula={updateFormula}
        selected={selected}
        formulas={[1, 2, 3, 4, 5, 6]}
        initialRows={2}
        initialColumns={1}
      />
      <CTA />
    </Layout>
  );
}

export default Forms;
