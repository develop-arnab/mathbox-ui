import React from "react";

import CTA from "example/components/CTA";
import PageTitle from "example/components/Typography/PageTitle";

import Layout from "example/containers/Layout";
import MatrixInput from "example/components/MathComponents/MatrixInput";

function Forms() {
  return (
    <Layout>
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
