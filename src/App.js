import logo from './logo.svg';
import './App.css';
import React from 'react';


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
      </div>
    );
  }
}


export default App;
