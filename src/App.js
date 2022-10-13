
import React, {useState}  from 'react'
import axios from 'axios'


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=750cf243eb3ef9f09917f61ed547ee9d`
 
const searchLocation = (event) => {
  if (event.key === 'Enter') {
  axios.get(url).then((response) => {
    setData(response.data)
    console.log(response.data)
  })
  }
}


  return (
    <div className="app">
      <div className='Search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
        
      </div>
      <div className='container'>
        <div className='top'>
          <div className='Location'>
            <p>City</p>
          </div>
          <div className='temp'>
            <h1>TestTemp</h1>
          </div>
          <div className='Description'>
            <h2>Description</h2>
          </div>
        </div>
        <div className='bottom'>
          <div className='Feels'>
            <p className ='bold'>Example Degrees</p>
            <p>Feels like</p>
          </div>
          <div className='Humidity'>
            <p className='bold'>Example Humidity</p>
            <p>Test Humidity</p>
          </div>
          <div className = 'Wind'>
            <p className='bold'>Example Wind</p>
            <p>Windy</p>
          </div>


        </div>
      </div>
      
        
        
        
    
      
    </div>
  );
}

export default App;
