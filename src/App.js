import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps'

class MapFigure extends React.Component{
  constructor(props) {
   super(props);
   this.mapTilerProvider = this.mapTilerProvider.bind(this);
  };

  mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;    //<--- tile provider url, should provide colorful map from openstreet
  }
  
  render(){
    return(
      <div>
        <Map provider={this.mapTilerProvider} defaultCenter={this.props.coordinates} center={this.props.coordinates}  defaultZoom={12} width={600} height={400}>
        <Marker 
          anchor={this.props.coordinates}
          color='black'
          payload={1} 
          onClick={({ event, anchor, payload }) => {
            console.log('Clicked marker nr: ', payload)
          }}
        />
        <Marker 
          anchor={this.props.coordinates_2}
          color='black'
          payload={1} 
          onClick={({ event, anchor, payload }) => {
            console.log('Clicked marker nr: ', payload)
          }}
        />
        </Map>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_1: '',
      results_1: [],
      selected_1:[50.879, 4.6997],
      input_2:'',
      results_2:[],
      selected_2:[],
      directions:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleDirectionsClick = this.handleDirectionsClick.bind(this);
  }
  
  async handleChange(event) {
    this.setState({
      input_1: event.target.value,
    });
  
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + event.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    this.setState({
      results_1: data
    });
  };

  async handleChange2(event) {
    this.setState({
      input_2: event.target.value,
    });
  
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + event.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    this.setState({
      results_2: data
    });
  };
  
  async handleClick(e){
    console.log(e.target.id)    
    await this.setState({
      selected_1:e.target.id.split("_").map((el)=>parseFloat(el))
    })
    console.log(this.state.selected_1)
  }

  async handleClick2(e){
    console.log(e.target.id)    
    await this.setState({
      selected_2:e.target.id.split("_").map((el)=>parseFloat(el))
    })
    console.log(this.state.selected_2)
  }
  
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
  render() {
    return (
      <div>From
          <input
            value={this.state.input_1}
            onChange={this.handleChange} />          
        <div>
          {this.state.results_1.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={this.handleClick}>{el.display_name}<br/></a>))}
        </div>To
        <input
          value={this.state.input_2}
            onChange={this.handleChange2}/>
        <div>
        {this.state.results_2.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={this.handleClick2}>{el.display_name}<br/></a>))}
        </div>
      <MapFigure coordinates={this.state.selected_1} coordinates_2={this.state.selected_2}></MapFigure>
      <button type='button' onClick={this.handleDirectionsClick}>Get directions</button>
    <pre>{this.state.directions}</pre>
      </div>        
    );
  }
}


export default App;
