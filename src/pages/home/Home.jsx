import PolarAreaChart from "@/components/charts/PolarAreaChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import React from "react";

const Home = () => {
  // Rader, polar, vertical bar chart
  return (
    <>
      <div>
        <VerticalBarChart />
      </div>
      <div>
        <PolarAreaChart />
      </div>
    </>
  );
};

export default Home;
