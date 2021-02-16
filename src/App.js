import React, { useState, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  // Loads when component change
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country, // United states, United kingdom
            value: country.countryInfo.iso2, // United states, United kingdom
          }))
          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  // Handler for select
  const onCountryChange = event => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID_19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
