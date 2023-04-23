import React, { useMemo, useState } from 'react'
import LineChart from "../charts/LineChart";


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const label = 'Logs'

const LogsMonths = ({ data }) => {

  const [activeYear, setActiveYear] = useState(0)

  const yearsData = useMemo(() => {
    return data.map((item) => {
      const monthsData = new Array(12).fill(0);
      item.months.forEach(month => {
        monthsData[month.month - 1] = month.count;
      });

      return {
        year: item.year,
        data: monthsData
      }
    })
  }, [data])

  return (
    <section className="chart__section">
      <h2>Logs Among Months</h2>

      <div className="multi-select">
        {yearsData.map((yearData, index) => (
          <div key={yearData.year} className={`${activeYear === index ? 'active' : ''}`} onClick={() => setActiveYear(index)}>
            <h3>{yearData.year}</h3>
          </div>
        ))}
      </div>

      <LineChart data={yearsData[activeYear].data} labels={labels} label={label} />

    </section>
  )
}

export default LogsMonths