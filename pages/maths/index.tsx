import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";

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
      <PageTitle>Dashboard</PageTitle>
    </Layout>
  );
}

export default Dashboard;
