import DoughnutChart from "@/components/charts/DoughnutChart";
import PolarAreaChart from "@/components/charts/PolarAreaChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import { Button } from "@/components/ui/button";
import { ActiveContext } from "@/context/ActiveContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const { setActive } = useContext(ActiveContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-around mt-10">
        <div className="flex flex-col justify-center">
          <h2 className="w-50 font-bold text-3xl">
            Every <span className="text-[var(--primary-color)]">penny</span> you
            track is a step toward financial{" "}
            <span className="text-[var(--primary-color)]">freedom</span>.
          </h2>
          <Button
            className={"mt-5"}
            onClick={() => {
              setActive("Expenses");
              navigate("/expenses");
            }}
          >
            + Add Expense List
          </Button>
        </div>
        <div className="w-120">
          <VerticalBarChart />
        </div>
      </div>
      <div className="flex justify-around mt-20 gap-5">
        {/* <div className=" border h-50 bg-white shadow rounded-2xl min-w-80 pl-5 flex flex-col justify-center gap-3">
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
        </div> */}
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-xs h-50 flex justify-center flex-col"
        >
          <CarouselContent className="-mt-1 h-[200px] gap-1">
            <CarouselItem className="md:basis-1/2">
              <div className="flex items-center flex-col border-white p-3 rounded-2xl shadow bg-white">
                <h2 className="text-gray-500">Income</h2>
                <h2 className="font-bold text-[var(--primary-color)] text-2xl">
                  1000k
                </h2>
              </div>
            </CarouselItem>

            <CarouselItem className="pt-1 md:basis-1/2">
              <div className="flex items-center flex-col border-white p-3 rounded-2xl shadow bg-white">
                <h2 className="text-gray-500">Expense</h2>
                <h2 className="font-bold text-red-600 text-2xl">100k</h2>
              </div>
            </CarouselItem>
            <CarouselItem className="pt-1 md:basis-1/2">
              <div className="flex items-center flex-col border-white p-3 rounded-2xl shadow bg-white">
                <h2 className="text-gray-500">Debt</h2>
                <h2 className="font-bold text-2xl">0k</h2>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex flex-row">
          <PolarAreaChart />
          <DoughnutChart />
        </div>
      </div>
    </>
  );
};

export default Home;
