import React from 'react'
// import useMap from reactleaflet
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import { showDataOnMap } from '../../utils/utils'

import '../../styles/Map.css'

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* Loop through countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
