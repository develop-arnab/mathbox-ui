import React, { useState, useEffect } from "react";

import CTA from "../../../maths/components/CTA";
import PageTitle from "../../../maths/components/Typography/PageTitle";

import Layout from "../../../maths/containers/Layout";
import MatrixInput from "../../../maths/components/MathComponents/MatrixInput";
import Head from "next/head";
import { useRouter } from "next/router";
import InfoCard from "../../../maths/components/Cards/InfoCard";
import { Card, CardBody } from "@roketid/windmill-react-ui";

function Forms() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    console.log("PARAM ", router.query.matrices);
    switch (router.query.matrices) {
      case "cross-product":
        setSelected(1);
        setDescription(
          "Explore our cross product calculator for matrices. Effortlessly solve matrix problems and calculate the cross product, enhancing your understanding of linear algebra. Simplify complex computations with our intuitive tool."
        );
        break;
      case "determinant":
        setSelected(2);
        setDescription(
          "Uncover the secrets of matrix determinants with our user-friendly calculator. Easily calculate determinants and solve matrix equations. Empower your mathematical prowess and simplify your studies with our determinant calculator."
        );
        break;
      case "matrix-inverse":
        setSelected(3);
        setDescription(
          "Master matrix inverses effortlessly! Utilize our matrix inverse calculator to quickly calculate inverses, solving complex mathematical problems with ease. Enhance your proficiency in linear algebra with our intuitive tool."
        );
        break;
      case "rank-matrix":
        setSelected(4);
        setDescription(
          "Unlock the rank of matrices with our powerful calculator. Solve matrix problems and compute the rank effortlessly. Elevate your understanding of linear algebra and streamline your computations with our rank calculator."
        );
        break;
      case "transpose":
        setSelected(5);
        setDescription(
          "Simplify matrix operations with our transpose calculator. Easily calculate transpositions and solve matrix equations. Empower your mathematical skills and streamline your studies with our user-friendly transpose tool."
        );
        break;
      case "eigenvalues-eigenvectors":
        setSelected(6);
        setDescription(
          "Dive into the world of eigenvalues and eigenvectors with our intuitive calculator. Solve matrix problems effortlessly, calculating eigenvalues and eigenvectors with precision. Elevate your understanding of linear algebra with our expert tool."
        );
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
        router.push("inverse");
        break;
      case 4:
        router.push("rank");
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
          of Matrices
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
      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </CardBody>
      </Card>
      <CTA />
    </Layout>
  );
}

export default Forms;
