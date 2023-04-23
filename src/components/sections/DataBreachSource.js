import React, { useMemo, useState } from 'react'
import BarChart from "../charts/BarChart";



const labels = ['Yahoo', 'LinkedIn', 'Sony', 'IBM', 'Myfitnesspal', 'Ferrari'];
const label = 'Source'

const cartData = [40, 88, 54, 24, 18, 32]
const DataBreachSource = () => {


  return (
    <section className="chart__section">
      <h2>Data Breach Source</h2>


      <BarChart data={cartData} labels={labels} label={label} />

    </section>
  )
}

export default DataBreachSource