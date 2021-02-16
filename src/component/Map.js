import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/Map.css'

const Map = ({ center, zoom }) => {
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  )
}

export default Map
