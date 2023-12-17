import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import SectionTitle from "maths/components/Typography/SectionTitle";
import CTA from "maths/components/CTA";
import InfoCard from "maths/components/Cards/InfoCard";
import ChartCard from "maths/components/Chart/ChartCard";
import ChartLegend from "maths/components/Chart/ChartLegend";
import PageTitle from "maths/components/Typography/PageTitle";
import RoundIcon from "maths/components/RoundIcon";
import Layout from "maths/containers/Layout";
import response, { ITableData } from "utils/demo/tableData";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "icons";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination
} from "@roketid/windmill-react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends
} from "utils/demo/chartsData";
// import InfoCard from "../../maths/components/Cards/InfoCard";
import { Card, CardBody } from "@roketid/windmill-react-ui";
import Head from "next/head";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import MatrixInput from "maths/components/MathComponents/MatrixInput";

function Dashboard() {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p: number) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <Layout>
      <Head>
        <title>Math Calculator</title>
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
      <PageTitle>Dashboard</PageTitle>

      <SectionTitle>Solve Math Problems</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Matrices"
          value="Cross Product , Determinant , Inverse , Rank, Transpose, Eigen Values and Eigen Vectors of a Matrix"
        >
          {/* <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          /> */}
        </InfoCard>

        <InfoCard
          title="Vectors"
          value="Add Substract Multiply Cross Product Dot Product"
        >
          {/* <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          /> */}
        </InfoCard>

        <InfoCard
          title="Linear Equations"
          value="Solve Linear Equations and System of Linear Equations"
        >
          {/* <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          /> */}
        </InfoCard>

        <InfoCard title="Statistics " value="Mean Median Mode">
          {/* <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          /> */}
        </InfoCard>
      </div>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Unlock the power of matrix mathematics with our all-in-one
            calculator suite. From computing determinants to calculating the
            cross product, finding matrix inverses, determining ranks,
            performing transpositions, and unveiling eigenvalues and
            eigenvectors – our intuitive tools simplify complex linear algebra
            operations. Whether you are a student tackling coursework or a
            professional navigating intricate mathematical landscapes, our
            comprehensive calculator suite empowers you to effortlessly solve
            matrix problems and elevate your understanding of fundamental
            concepts. Streamline your studies, enhance your proficiency, and
            conquer a myriad of mathematical queries with precision. Dive into a
            world where matrix computations become a breeze, and mathematical
            mastery is at your fingertips. Explore, calculate, and conquer the
            realm of matrices with ease.
          </p>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Dashboard;
