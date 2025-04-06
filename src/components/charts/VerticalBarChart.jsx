import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const myData1 = [100, 200, 150, 300, 250, 400, 350]; // Example data
const myData2 = [50, 100, 200, 180, 130, 170, 160];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: myData1,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Expense",
      data: myData2,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const VerticalBarChart = () => {
  return (
    <div className="w-120 mt-5">
      <Bar options={options} data={data} />
    </div>
  );
};

export default VerticalBarChart;
