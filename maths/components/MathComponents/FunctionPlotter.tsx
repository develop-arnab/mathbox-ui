// @ts-nocheck
import React, { useState } from "react";
// import Plot from "react-plotly.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartCard from "maths/components/Chart/ChartCard";
import ChartLegend from "maths/components/Chart/ChartLegend";
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends
} from "utils/demo/chartsData";
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
type Props = {
  xdata?: Array<number>;
  ydata?: Array<number>;
  result?: Array<number>;
};

export default function FunctionPlotter(props: Props) {
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
  const [message, setMessage] = useState("");

  const lineData = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Organic",
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: props.xdata,
          fill: false
        },
        {
          label: "Paid",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: props.ydata
        }
      ]
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month"
          }
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value"
          }
        }
      }
    },
    legend: {
      display: false
    }
  };
  // const [xdata, setXdata] = useState([]);
  // const [ydata, setYdata] = useState([]);
  // const handleMessageChange = (e: any) => {
  //   setMessage(e.target.value);
  // };

  // const handleSendMessage = () => {
  //   // Implement your send message logic here
  //   console.log("Sending message:", message);
  //   setMessage(""); // Clear the input field after sending

  //   const inputFunction = message;
  //   fetch("http://127.0.0.1:8000/plot_function/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ function: inputFunction })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response data (coordinates and plot image)
  //       const xValues = data.x_values;
  //       const yValues = data.y_values;
  //       const plotImage = data.plot_image;
  //       // Use the data to plot the graph or display the image
  //       console.log("RESPONSE IS ", data);
  //       setXdata(xValues);
  //       setYdata(yValues);
  //     })
  //     .catch((error) => {
  //       console.error("API request error:", error);
  //     });
  // };

  return (
    <div>
      <div>
        {/* <input
          type="text"
          placeholder="Type your message..."
          value={message}
          // onChange={handleMessageChange}
        /> */}
        {/* <button
        // onClick={handleSendMessage}
        >
          Send
        </button> */}
      </div>
      {/* <Plot
        data={[
          {
            x: [0, props.xdata[0]],
            y: [0, props.xdata[1]],

            type: "scatter",

            mode: "lines+markers",

            marker: { color: "red" }
          },

          {
            type: "scatter",
            mode: 'lines+markers',
            x:[0, props.ydata[0]],
            y:[0, props.ydata[1]],
            marker: { color: "green" }
          },
          {
            type: "scatter",
            mode: 'lines+markers',
            x:[0, props.result[0]],
            y:[0, props.result[1]],
            marker: { color: "pink" }
          }
        ]}
        layout={{ width: 720, height: 540, title: "A Fancy Plot" }}
      /> */}

      {/* <Plot
        data={[
          {
            x:  [0, 1, 2],
            y: [0, 2, 3],
            z : [0, 3, 1],
            
            type: 'mesh3d',

            // mode: "lines+markers",

            marker: { color: "red" }
            
          },

          // {
          //   type: "scatter",
          //   mode: 'lines+markers',
          //   x:[0, props.ydata[0]],
          //   y:[0, props.ydata[1]],
          //   marker: { color: "green" }
          // },
          // {
          //   type: "scatter",
          //   mode: 'lines+markers',
          //   x:[0, props.result[0]],
          //   y:[0, props.result[1]],
          //   marker: { color: "pink" }
          // }
        ]}
        layout={{ width: 720, height: 540, title: "A Fancy Plot" }}
      />  */}
      <ChartCard title="Lines">
        <Line {...lineData} />
        <ChartLegend legends={lineLegends} />
      </ChartCard>
    </div>
  );
}
