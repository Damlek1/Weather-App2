import React, {useEffect, useState} from 'react';
import './App.css';
import Input from './components/Input'
import axios from 'axios'

function App() {


  const [degrees, setDegrees] = useState(null)
  const [locaton, setLocation] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [country, setCountry] = useState('')
  const [dataFetched, setDataFetched] = useState(false)


  const fetchData = async (e) => {
    e.preventDefault()

    try{

      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      const data = await res.data


      setDegrees(data.main.temp)
      setLocation(data.name)
      setDesc(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)


      setDataFetched(true)


      console.log(data)
    }catch(err){
      alert('Please enter a valid location')
    }

  }

  const defaultDataFetched = async () => {
    if(!dataFetched){
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      const data = await res.data


      setDegrees(data.main.temp)
      setLocation(data.name)
      setDesc(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)


    }

  }

  useEffect(() => {
       defaultDataFetched()
  }, [])



  return (
    <div className="app">
      <div className='weather'>
        <Input text={(e) => setUserLocation(e.target.value)} submit={fetchData} func={fetchData} />
      <div className='weather_display'>
        <h3 className='weather_location'>Weather in {locaton}</h3>
        <div className=''>
          <h1 className='weather_degree'>{degrees} °C</h1>
        </div>
        <div className='weather_desc'>
          <div>
            <div className='weather_desc_head'>
               <span className='weather_icon'>
               <img src={`http://openweathermap.org/img/w/${icon}.png`} alt='' />
               </span>
               <h3>{desc}</h3>
            </div>
            <h3>Humidity: {humidity}%</h3>
            <h3>Wind Speed: {wind} m/s</h3>
          </div>
          <div className='weather_country'>
            <h3>{country}</h3>
            <h2 className='weather_date'>{Date()}</h2>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
