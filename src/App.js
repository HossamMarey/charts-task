import './App.css';
import DataBreachMonth from "./components/sections/DataBreachMonth";
import DataBreachSource from "./components/sections/DataBreachSource";
import LogsMalwareTypes from "./components/sections/LogsMalwareTypes";
import LogsMonths from "./components/sections/LogsMonths";
import WorldMap from "./components/sections/WorldMap";

import chartsDataJson from "./assets/data.json"

// convert json to js object
const chartsData = JSON.parse(JSON.stringify(chartsDataJson))

function App() {

  return (
    <div  >
      <h1 className="text-center"> Charts </h1>
      <div className="chart__sections">
        <DataBreachMonth data={chartsData?.result?.leaks_stats_months} />
        <DataBreachSource data={chartsData?.result?.leaks_stats_months} />
        <LogsMonths data={chartsData?.result?.logs_stats_months} />
        <LogsMalwareTypes data={chartsData?.result?.logs_stats_months} />
        <div className="span-full">
          <WorldMap />
        </div>
      </div>
    </div>
  );
}

export default App;
