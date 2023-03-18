
import React from 'react';
import './App.css';
import { Component } from 'react';
import axios from 'axios';


class movieWeb extends Component{

  constructor(props) {
    super(props);
    this.state = {
      query:'',
      data: null,
      error: null,
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get('https://www.omdbapi.com/?apikey=45f0782a&s=war')
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          isLoading: false
        });
      });
   
  }
  handleInputChange = event =>{
    const query=event.target.value;
    console.log(query)
    this.setState({query,isLoading:true});

    axios.get(`https://www.omdbapi.com/?apikey=45f0782a&t=${query}`).then(response=>{
      this.setState({
        data:response.data,
        isLoading:false
      });
    }).catch(error=>{
      this.setState({
        error: error,
        isLoading: false

      })
    })
  }
  

  render() {
    const { data, error, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading data...</p>;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <div className='searchMovie'>
          <input type='text' placeholder='Search movie' ></input>
          <button onClick={this.handleInputChange}>Search</button>
        </div>
        <div className='movies_list'>
          {data.Search.map(item => (
            <div className='poster_div' key={item.imdbID}>
              <img src={item.Poster} alt={`${item.Title} poster`}/>
              <h4 key={item.imdbID}>{item.Title}</h4>
              <h5>{item.Year}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default movieWeb;
