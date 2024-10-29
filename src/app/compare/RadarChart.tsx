"use client";
import { type Nation } from "~/server/actions/nations";
import { useECharts } from "@kbox-labs/react-echarts";
import { type UseEChartsOptions } from "@kbox-labs/react-echarts";
import { startTransition, useEffect, useRef, useState } from "react";
import { stringToRGBA } from "~/lib/utils";

function getChartOption(
  nations: Nation[],
  radarCenter: [string, string] = ["50%", "50%"],
  radarRadius = "70%",
): UseEChartsOptions {
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
      radius: radarRadius,
      scale: true,
      center: radarCenter,
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

  return option;
}

export default function RadarChart({ nations }: { nations: Nation[] }) {
  const radarRadius = useRef<string>("70%");
  const [ref, ecInstance] = useECharts<HTMLDivElement>(
    getChartOption(nations, undefined, radarRadius.current),
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function onResize() {
      startTransition(() => {
        setScreenWidth(window.innerWidth);
      });
    }

    window.addEventListener("resize", onResize);

    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    ecInstance?.clear();
    ecInstance?.setOption(getChartOption(nations));
  }, [nations]);

  useEffect(() => {
    if (screenWidth < 545) radarRadius.current = "55%";
    else if (screenWidth < 705) radarRadius.current = "60%";
    else radarRadius.current = "70%";
    ecInstance?.resize();
  }, [screenWidth]);

  return (
    <div
      className="mx-auto aspect-[10/10] w-full sm:aspect-[10/6] md:aspect-[10/5]"
      ref={ref}
    ></div>
  );
}
