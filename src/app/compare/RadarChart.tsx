"use client";
import { type Nation } from "~/server/actions/nations";
import { EChart, useECharts } from "@kbox-labs/react-echarts";
import { type UseEChartsOptions } from "@kbox-labs/react-echarts";
import { useEffect } from "react";

const option: UseEChartsOptions = {
  textStyle: {
    fontFamily: "sans-serif, mono",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    type: "scroll",
    bottom: 1,
    data: ["a", "b"],
  },
  radar: {
    radius: "70%",
    scale: false,
    indicator: [
      { name: "Pembangunan\nManusia", max: 400, axisType: "value" },
      { name: "Persepsi\nKorupsi", max: 400, axisType: "value" },
      { name: "Supremasi\nHukum", max: 400, axisType: "value" },
      { name: "Demokrasi", max: 400, axisType: "value" },
    ],
  },
  series: [
    {
      areaStyle: {
        color: "rgba(12,54,12,0.2)",
      },
      tooltip: {
        enterable: true,
      },
      type: "radar",
      symbol: "none",
      lineStyle: {
        width: 1,
      },
      data: [
        {
          value: [100, 340, 250, 270],
          name: "a",
        },
      ],
    },
    {
      areaStyle: {
        color: "rgba(54,123,230,0.2)",
      },
      tooltip: {
        enterable: true,
      },
      type: "radar",
      symbol: "none",
      lineStyle: {
        width: 1,
      },
      data: [
        {
          value: [321, 231, 123, 392],
          name: "b",
        },
      ],
    },
  ],
};

export default function RadarChart({ nations }: { nations: Nation[] }) {
  const [ref, ecInstance] = useECharts<HTMLDivElement>(option);

  // update chart size on every rerender
  useEffect(() => {
    function onResize() {
      ecInstance?.resize();
    }

    window.addEventListener("resize", onResize);

    return () => {
      removeEventListener("resize", onResize);
    };
  });

  return <div className="mx-auto aspect-[10/5] w-full" ref={ref}></div>;
}
