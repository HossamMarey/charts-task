import React, { useMemo } from 'react';

import { ComposableMap, Geographies, Geography, Marker, } from "react-simple-maps";

import mapData from './features.json'

// convert mapData to js object
const mapDataObj = JSON.parse(JSON.stringify(mapData))

const getCordsByCountryCode = (countryCode) => {
  const countriesData = mapDataObj.objects.world.geometries
  const country = countriesData.find(country => country.id === countryCode.toUpperCase())
  if (!country) return null

  const { arcs, type } = country
  let currentAcs = null
  const mid = Math.floor(arcs.length / 2)
  if (type === "Polygon") {
    // return middle el of arcs array
    currentAcs = arcs[mid]


  } else if (type === "MultiPolygon") {
    const middleArcs = arcs[mid][Math.floor(arcs[0].length / 2)]
    currentAcs = middleArcs
  }

  const allArcs = mapDataObj.arcs
  const allCords = currentAcs.map(arc => allArcs[arc])

  // [x] , [y]
  const xArray = []
  const yArray = []

  allCords.forEach(crd => {
    crd.forEach(c => {
      xArray.push(c[0])
      yArray.push(c[1])
    })
  });

  const x = xArray.reduce((a, b) => a + b, 0) / xArray.length
  const y = yArray.reduce((a, b) => a + b, 0) / yArray.length

  if (!x || !y) return null

  console.log('arc********* allCords', countryCode, [x, y])

  return [x, y]
  // return cords[0] || cords[Math.floor(cords.length / 2)]
}

const MarkerPin = ({ coordinates, value }) => (
  <>
    <Marker coordinates={coordinates}>
      <circle r={3} fill="#785ed9" stroke="rgba(121, 94, 217, 0.3)" strokeWidth={3} />
    </Marker>
    {/* <Annotation subject={coordinates} dx={5} dy={-5}>
      <text>{value}</text>
    </Annotation> */}
  </>
);

const MapChart = () => {

  const egyptCords = useMemo(() => getCordsByCountryCode("EGY"), [])
  const DjiboutiCords = useMemo(() => getCordsByCountryCode("DJI"), [])

  return (
    <div className="world__map">
      <ComposableMap>
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {/* Egypt pin  */}
        {egyptCords && <MarkerPin coordinates={egyptCords} value={10} />}
        {/* DjiboutiCords */}
        {DjiboutiCords && <MarkerPin coordinates={DjiboutiCords} value={20} />}




      </ComposableMap>
    </div>
  );
};

export default MapChart;
