import React from "react";

import CTA from "maths/components/CTA";
import PageTitle from "maths/components/Typography/PageTitle";

import Layout from "maths/containers/Layout";
import MatrixInput from "maths/components/MathComponents/MatrixInput";
import Head from "next/head";
function Forms() {
  return (
    <Layout>
      <Head>
        <title>Solve Matix Problems</title>
        <meta name="description" content="This is a description of my page." />
        <meta name="keywords" content="my, page, keywords" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="My Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PageTitle>Matrices</PageTitle>
      <MatrixInput
        formulas={[1, 2, 3, 4, 5, 6]}
        initialRows={2}
        initialColumns={1}
      />
      <CTA />
    </Layout>
  );
}

export default Forms;
