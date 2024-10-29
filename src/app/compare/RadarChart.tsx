"use client";
import { type Nation } from "~/server/actions/nations";
import { useECharts } from "@kbox-labs/react-echarts";
import { type UseEChartsOptions } from "@kbox-labs/react-echarts";
import { useEffect, useState } from "react";
import { stringToRGBA } from "~/lib/utils";

function getChartOption(nations: Nation[]): UseEChartsOptions {
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
      data: nations.map((nation) => ({
        name: nation.name,
        itemStyle: {
          color: stringToRGBA(nation.name, "1.0"),
        },
      })),
    },
    radar: {
      radius: "70%",
      scale: false,
      indicator: [
        { name: "Pembangunan\nManusia", max: 1, axisType: "value" },
        { name: "Persepsi\nKorupsi", max: 100, axisType: "value" },
        { name: "Supremasi\nHukum", max: 1, axisType: "value" },
        { name: "Demokrasi", max: 10, axisType: "value" },
      ],
    },
    series: nations.map((nation) => ({
      areaStyle: {
        color: stringToRGBA(nation.name, "0.2"),
      },
      tooltip: {
        enterable: true,
        borderColor: stringToRGBA(nation.name, "1.0"),
      },
      type: "radar",
      symbol: "none",
      lineStyle: {
        color: stringToRGBA(nation.name, "1.0"),
        width: 1,
      },
      data: [
        {
          value: [
            parseFloat(nation.humanDevelopmentIndex?.replace(",", ".") || "0"),
            parseFloat(nation.corruptionIndex?.split(" ")?.[0] || "0"),
            parseFloat(
              nation.RuleOfLawIndex?.split(" ")?.[0]?.replace(",", ".") || "0",
            ),
            parseFloat(nation?.democracyIndex || "0"),
          ],
          name: nation.name,
        },
      ],
    })),
  };
  /*   console.log("🚀 ~ getChartOption ~ option:", option); */

  return option;
}

export default function RadarChart({ nations }: { nations: Nation[] }) {
  const [ref, ecInstance] = useECharts<HTMLDivElement>(getChartOption(nations));
  const [screenWidth, setScreenWidth] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function onResize() {
      setScreenWidth({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", onResize);

    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    ecInstance?.clear();
    ecInstance?.setOption(getChartOption(nations));
    console.log("🚀 ~ useEffect ~ nations:", nations);
  }, [nations]);

  return <div className="mx-auto aspect-[10/5] w-full" ref={ref}></div>;
}
