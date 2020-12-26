import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
 //   this.handleSubmit = this.handleSubmit.bind(this);
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
      submit: data.map((item)=>item.display_name)
    });
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.input}
            onChange={this.handleChange} />          
          <button type='submit'>Submit!</button>
        </form>
        <p>{this.state.submit}</p>
      </div>
    );
  }
}


export default App;
