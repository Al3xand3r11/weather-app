
import React, {useState}  from 'react'
import axios from 'axios'
import OneStar from './OneStar.png'
import TwoStar from './TwoStar.png'
import ThreeStar from './ThreeStar.png'
import FourStar from './FourStar.png'
import FiveStar from './FiveStar.png'
import HalfStar from './HalfStar.png'
import OneHalf from './OneHalf.png'
import TwoHalf from './TwoHalf.png'
import ThreeHalf from './ThreeHalf.png'
import FourHalf from './FourHalf.png'
import Zero from './Zero.png'


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=750cf243eb3ef9f09917f61ed547ee9d`
 
const searchLocation = (event) => {
  if (event.key === 'Enter') {
  axios.get(url).then((response) => {
    setData(response.data)
    console.log(response.data)
  })
  setLocation('');
  }
}
let backgroundImage;
// The start of the if statements for each value to determine on the scale what type of day it is.
let tempNum, descNum, windNum, humidNum;
// make value for temp
let temp = data.main ? data.main.temp.toFixed() : null
if (temp>=100 || temp <= 60){
  tempNum = 1;
}

else if((temp>= 61 && temp <= 70) || (temp <100 && temp >=85) ){
  tempNum = 3;
}

else if (temp <85 && temp >70){
  tempNum = 5;
}
// make value for description
let desc = data.weather ? data.weather[0].main : null
console.log(desc);
if (desc === 'Rain' || desc === 'Snow'){
  descNum = 0;
  //backgroundImage = Rain;
}
else if (desc === 'Clear' || desc === 'Haze'){
  descNum = 5;
  //backgroundImage = Clear;
}
else if (desc === 'Clouds' || desc === 'Mist'){
  descNum = 3;
  //backgroundImage = Clouds;
}
// make value for wind
let wind = data.wind ? data.wind.speed.toFixed() : null
if (wind <= 10){
  windNum = 5;
}

else if (wind > 10){
  windNum = 3;
}
// make value for humidity
let humid = data.main ? data.main.humidity : null
if (humid > 70){
  humidNum = 3;
}
else{
  humidNum = 5;
}
let dayRating;
let finalNum;
let shortdesc;
// final calculation that finds average and says what day it is
if (descNum !== 0){
finalNum = ((tempNum + windNum + humidNum + descNum) / 4 );
}
else if (descNum === 0 ){
  finalNum = 0;
  
}
if (finalNum === 0){
  dayRating = Zero;
  shortdesc = "It's raining outside. Stay home today, watch some film and try again tomorrow!";
}
else if (finalNum === .5){
  dayRating = HalfStar;
  shortdesc = "If I were you I wouldn't go out there. The weather is pretty bad and the game system is calling your name!";
}
else if (finalNum === 1){
  dayRating = OneStar;
  shortdesc = "There's always tomorrow";
}
else if (finalNum === 1.5){
  dayRating = OneHalf;
  shortdesc = "It doesn't get much worse than this";
}
else if (finalNum === 2){
  dayRating = TwoStar
  shortdesc = "Are you dedicated?";
}
else if (finalNum === 2.5){
  dayRating = TwoHalf;
  shortdesc = "Unless you're trying to make your schools team, you can sit this one out ";
}
else if (finalNum === 3){
  dayRating = ThreeStar
  shortdesc = "Beggers can't be choosers, get outside!";
}
else if (finalNum === 3.5){
  dayRating = ThreeHalf;
  shortdesc = "It could be worse";
}
else if (finalNum ===4){
  dayRating = FourStar
  shortdesc = "Great day to hoop, could be better but you can't complain";
}
else if (finalNum === 4.5){
  dayRating = FourHalf;
  shortdesc = "A near perfect day to call up some friends and work on your game. Take advantage!";
}
else if (finalNum === 5){
  dayRating = FiveStar
  shortdesc = "It doesn't get any better than this. I'm surprised you're not outside already!";
}

console.log(finalNum)
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
      
        



        {data.name !== undefined &&
        <div className='container'>
          <div className='top'>
          <div className='Location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            <h1>{temp}°F</h1>
            
          </div>
          <div className='Description'>
            
            <p>{desc}</p>
          </div>
          <div className = 'Stars'>
            <img src = {dayRating} alt= ''></img>
            <p>{shortdesc}</p>
          </div>
          </div>
          <div className='bottom'>
          <div className='Feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels like</p>
          </div>
          <div className='Humidity'>
            <p className='bold'>{humid}%</p>
            <p>Humidity</p>
          </div>
          <div className = 'Wind'>
            <p className='bold'>{wind}MPH</p>
            <p>Wind</p>
          </div>
          </div>
          </div>
        }
        


        
     
      
        
        
        
    
      
    </div>
  );


}

export default App;
