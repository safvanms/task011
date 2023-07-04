import React, { useState, useEffect } from 'react'
import './container.css'
import axios from 'axios'

export default function Container() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [currentCountry, setCurrentCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/countries')
        setCountries(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])


  const handleCountryClick = (country) => {
    setSelectedCountry(country)
    setSelectedState(null)
    fetchStates(country)
    setCurrentCountry(country)
  }

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/countries/${countryCode}`,
      )
      setStates(response.data.states)
    } catch (error) {
      console.error(error)
    }
  }

  const handleStateClick = (state) => {
    setSelectedState(state)
    fetchCities(state)
  }

  const fetchCities = async (stateCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/countries/${currentCountry}`,
      )
      setCities(response.data.states[stateCode - 1].cities)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="container">
      <div className="country-table">
        <span>
        <div className='table-heading'>Coutry</div>
          {countries.map((country) => (
            <div className='content' onClick={() => handleCountryClick(country.id)} key={country.id}>
              {country.countryName}
            </div>
          ))}
        </span>

        <span>
          <div className='table-heading'>State</div>
          {selectedCountry  &&
            states.map((state) => (
              <div className='content' key={state.id} onClick={() => handleStateClick(state.id)}>
                {state.name}
              </div>
            ))}
        </span>

        <span>
        <div className='table-heading'>Cities</div>
          {selectedState&&cities.map((city) => (
            <div className='content' key={city} >
              {city}
            </div>
          ))}
        </span>
      </div>
    </div>
  )
}
