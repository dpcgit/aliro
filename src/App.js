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
        <Map provider={this.mapTilerProvider} defaultCenter={[50.879, 4.6997]} defaultZoom={12} width={600} height={400}></Map>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      selected:''
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
  
  handleClick(e){
    console.log(e.target.id)
    this.setState({
      selected:e.target.id
    })
  }
  
  render() {
    return (
      <div>
          <input
            value={this.state.input}
            onChange={this.handleChange} />          
        <div>{this.state.results.map((el,i)=>(<a href="#" id={el.lat+"_"+el.lon} onClick={this.handleClick}>{el.display_name}<br/></a>))}</div>
      <MapFigure></MapFigure>
      </div>
    );
  }
}


export default App;
