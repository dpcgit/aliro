/*
// code to render leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
// end of icon rendering code fix

  /*
  async handleDirectionsClick(e){
    const directions_url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480319426370d943d7bbb79c1459a96c6f&start=8.681495,49.41461&end=8.687872,49.420318"
    const response = await fetch(directions_url);
    const data = await response.json();
    console.log("No directions yet")
    console.log(data)
    this.setState({
      directions: JSON.stringify(data,null,4)
    });
  }
*/

import React, {useRef, useState, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './App.css'

// code to fix rendering leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
// end of icon rendering code fix


function App() {
  const mapRef = useRef(null);

  const [input,setInput] = useState('');
  const [results,setResults] = useState([]);
  const [selected,setSelected] = useState([49.8419, 24.0315])
  

  const [input2,setInput2] = useState('');
  const [results2,setResults2] = useState([]);
  const [selected2,setSelected2] = useState([49.8419, 24.0315])

  const defaultZoom = 8;
  const styleMap = { "width": "75vw", "height": "75vh" };

  async function handlePlaceClick(e){
    console.log(e.target.id)    
    await setSelected(e.target.id.split("_").map((el)=>parseFloat(el)))
    console.log(selected)
    console.log('setview')    
  }

  async function handlePlaceClick2(e){
    console.log(e.target.id)    
    await setSelected2(e.target.id.split("_").map((el)=>parseFloat(el)))
    console.log(selected2)
    console.log('setview')    
  }

  async function handleInputChange(e){
    setInput(e.target.value);
    
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + e.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    setResults(data);
  }

  async function handleInputChange2(e){
    setInput2(e.target.value);
    
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + e.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    setResults2(data);
  }
  
  useEffect(() => {
    // create map
    mapRef.current = L.map('map', {
      center: selected,
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }, []);

  useEffect(() => {
    // add selected location logic
    L.marker(selected).addTo(mapRef.current);
    mapRef.current.setView(selected);
  }, [selected]);


  useEffect(() => {
    // add selected location logic
    L.marker(selected2).addTo(mapRef.current);
    mapRef.current.setView(selected2);
  }, [selected2]);

  return(
    <div>
      From
      <input
        value={input}
        onChange={handleInputChange}
      />
      <div>
          {results.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={handlePlaceClick}>{el.display_name}<br/></a>))}
      </div>
      To         
      <input
        value={input2}
        onChange={handleInputChange2}
      />
      <div>
          {results2.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={handlePlaceClick2}>{el.display_name}<br/></a>))}
      </div>
      Map
      <div id="map">        
      </div>
    </div>
  );
}

export default App;