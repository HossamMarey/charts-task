import React from 'react'
import MapChart from "../charts/MapChart"

const WorldMap = ({ data }) => {
  return (
    <section className="chart__section">
      <h2> World Map </h2>
      <div className="world__map">

      </div>
      <MapChart />
    </section>
  )
}

export default WorldMap