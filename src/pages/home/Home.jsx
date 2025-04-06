import DoughnutChart from "@/components/charts/DoughnutChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  // Rader, polar, vertical bar chart
  return (
    <>
      <div className="flex justify-around mt-10">
        <div className="flex flex-col justify-center">
          <h2 className="w-50 font-bold text-3xl">
            Every <span className="text-[var(--primary-color)]">penny</span> you
            track is a step toward financial{" "}
            <span className="text-[var(--primary-color)]">freedom</span>.
          </h2>
          <Button className={"mt-5"}>+ Add Expense List</Button>
        </div>
        <div className="w-120">
          <VerticalBarChart />
        </div>
      </div>
      <div className="flex justify-around mt-20 gap-5">
        <div className=" border h-50 bg-white shadow rounded-2xl min-w-80 pl-5 flex flex-col justify-center gap-3">
          <div>
            <h2 className="text-gray-500">Income</h2>
            <h2 className="font-bold text-[var(--primary-color)] text-2xl">
              1000k
            </h2>
          </div>
          <div>
            <h2 className="text-gray-500">Expense</h2>
            <h2 className="font-bold text-red-600 text-2xl">2000k</h2>
          </div>
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
