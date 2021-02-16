import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'

import InfoBox from './component/InfoBox'
import Map from './component/Map'
import Table from './component/Table'
import LineGraph from './component/LineGraph'

import 'leaflet/dist/leaflet.css'
import { sortData } from './utils/utils'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapcenter] = useState({ lat: 34.80746, lng: -40.4796 })

  // Loads when component change
  // Gets all the countries
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  // Loads when component change
  // Menu selection List countries
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country, // United states, United kingdom
            value: country.countryInfo.iso2, // United states, United kingdom
          }))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  // Handler for select
  const onCountryChange = async event => {
    const countryCode = event.target.value

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : ` https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }

  console.log('COUNTRY INFO>>>', countryInfo)

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            title='Coronavirus Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
