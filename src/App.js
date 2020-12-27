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
      selected_2:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  async handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  
    const api_url="http://nominatim.openstreetmap.org/search?format=json&limit=5&q=" + event.target.value;
    const response = await fetch(api_url);   
    const data = await response.json();
    console.log(data);
    
    this.setState({
      results: data
    });
  };
  
  async handleClick(e){
    console.log(e.target.id)    
    await this.setState({
      selected:e.target.id.split("_").map((el)=>parseFloat(el))
    })
    console.log(this.state.selected)
  }
  
  render() {
    return (
      <div>
          <input
            value={this.state.input}
            onChange={this.handleChange} />          
        <div>{this.state.results.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={this.handleClick}>{el.display_name}<br/></a>))}</div>
      <MapFigure coordinates={this.state.selected}></MapFigure>
      </div>
    );
  }
}


export default App;
