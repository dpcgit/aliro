
import React, {useRef, useState, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './App.css'
import Cost from './components/Cost';
import {getDeployed} from './contracts/Cost';

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

  // general state variables
  const [directions,setDirections] = useState();
  const [distance,setDistance] = useState();
  const [duration,setDuration] = useState();

  const [cost_instance,setCostInstance] = useState({});

  // state variables for place 1
  const [input,setInput] = useState('');
  const [results,setResults] = useState([]);
  const [selected,setSelected] = useState([49.8419, 24.0315])
  
  //state variables for place 2
  const [input2,setInput2] = useState('');
  const [results2,setResults2] = useState([]);
  const [selected2,setSelected2] = useState([49.8419, 24.0315])

  // default options for map
  const defaultZoom = 8;
  const styleMap = { "width": "75vw", "height": "75vh" };

  // handler for place 1 click on link or place
  async function handlePlaceClick(e){
    console.log(e.target.id)    
    await setSelected(e.target.id.split("_").map((el)=>parseFloat(el)))
    console.log(selected)
    console.log('setview')    
  }

  // handler for place 2 click on link or place
  async function handlePlaceClick2(e){
    console.log(e.target.id)    
    await setSelected2(e.target.id.split("_").map((el)=>parseFloat(el)))
    console.log(selected2)
    console.log('setview')    
  }


  // handler for input change, geolocation request, place 1
  async function handleInputChange(e){
    setInput(e.target.value);
    
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + e.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    setResults(data);
  }

  // handler for input change, geolocation request, place 2
  async function handleInputChange2(e){
    setInput2(e.target.value);
    
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + e.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    setResults2(data);
  }
  
  //handler for directions test button
  async function handleDirectionsClick(){
    const api_key = "5b3ce3597851110001cf62480319426370d943d7bbb79c1459a96c6f"
    const directions_url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480319426370d943d7bbb79c1459a96c6f&start=${selected[1]},${selected[0]}&end=${selected2[1]},${selected2[0]}`;
    const response = await fetch(directions_url);
    const data = await response.json();
    console.log(data)
    setDirections(data)
    const distance_got = data.features[0]["properties"]["segments"][0]["steps"][0]["distance"];
    setDistance(distance_got);
    const duration_got = data.features[0]["properties"]["segments"][0]["steps"][0]["duration"];
    setDuration(duration_got);
    console.log("Distance: ", distance_got);
    console.log("Duration: ", duration_got);
  };

  //effect to get contract instance
  useEffect(()=>{
    const getGetContractInstance = async () => {
      const cost = await getDeployed();
      console.log('cost instance: ',cost);
      setCostInstance(cost);
    }

    getGetContractInstance();

  }, []);

  // efect to create map
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
  
  // efect to change map view to selected place 1
  useEffect(() => {
    // add selected location logic
    L.marker(selected).addTo(mapRef.current);
    mapRef.current.setView(selected);
  }, [selected]);

  // efect to change map view to selected place 2
  useEffect(() => {
    // add selected location logic
    L.marker(selected2).addTo(mapRef.current);
    mapRef.current.setView(selected2);
  }, [selected2]);

  // effect to add directions to map
  useEffect(() => {
    L.geoJSON(directions).addTo(mapRef.current);
    mapRef.current.setView(selected2);
  }, [directions]);
  
  

  return(
    <div>

      <Cost contract={cost_instance}></Cost>
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
      <button onClick={handleDirectionsClick}>Get directions</button>
  {/*<pre>{JSON.stringify(directions,null,4)}</pre>*/}
      Map
      <div id="map">        
      </div>
    </div>
  );
}

export default App;