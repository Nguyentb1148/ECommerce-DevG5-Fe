import React from 'react'
import ReactApexChart from "react-apexcharts";

const UserDashboard = () => {
  const options = {
    chart: {
      height: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const series = [
    {
      name: "New users",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#1A56DB",
    },
  ];
  return (
    <div className="min-[370px]:w-[350px] min-[420px]:w-[390px] md:w-[480px] lg:w-[360px] xl:w-[600px] rounded-lg shadow bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-gray-400">
            Users this week
          </p>
          <h5 className="leading-none text-3xl font-bold text-white pb-2">
            32.4k
          </h5>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      {/* ApexCharts Area */}
      <div id="area-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={70}
          width="100%"
        />
      </div>

    </div>
  )
}

export default UserDashboard