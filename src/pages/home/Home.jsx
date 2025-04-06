import DoughnutChart from "@/components/charts/DoughnutChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  // Rader, polar, vertical bar chart
  return (
    <>
      <div className="flex justify-around">
        <div className="mt-20 border border-black rounded-2xl min-w-80 pl-5 flex flex-col justify-center gap-3">
          <div>
            <h2>Income</h2>
            <h2 className="font-bold text-[var(--primary-color)] text-2xl">
              1000k
            </h2>
          </div>
          <div>
            <h2>Expense</h2>
            <h2 className="font-bold text-red-600 text-2xl">2000k</h2>
          </div>
        </div>
        <div>
          <VerticalBarChart />
        </div>
      </div>
      <div className="flex justify-between mt-20 gap-5">
        <div className="ml-20">
          <h2 className="w-50 font-bold text-3xl">
            Every <span className="text-[var(--primary-color)]">penny</span> you
            track is a step toward financial{" "}
            <span className="text-[var(--primary-color)]">freedom</span>.
          </h2>
          <Button className={"mt-5"}>+ Add Expense List</Button>
        </div>
        <div className="flex flex-row">
          <PolarAreaChart />
          <DoughnutChart />
        </div>
      </div>
    </>
  );
};

export default Home;
