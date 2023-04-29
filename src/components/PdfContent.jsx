import DataBreachMonth from "./sections/DataBreachMonth";
import DataBreachSource from "./sections/DataBreachSource";
import LogsMonths from "./sections/LogsMonths";
import LogsMalwareTypes from "./sections/LogsMalwareTypes";
import WorldMap from "./sections/WorldMap";

import React from "react";

import chartsDataJson from "../assets/data.json";

// convert json to js object
const chartsData = JSON.parse(JSON.stringify(chartsDataJson));

const PdfContent = () => {
  return (
    <div className="chart__sections">
      <DataBreachMonth data={chartsData?.result?.leaks_stats_months} />
      <DataBreachSource data={chartsData?.result?.leaks_stats_months} />
      <LogsMonths data={chartsData?.result?.logs_stats_months} />
      <LogsMalwareTypes data={chartsData?.result?.logs_stats_months} />
      <div className="span-full">
        <WorldMap />
      </div>
    </div>
  );
};

export default PdfContent;
