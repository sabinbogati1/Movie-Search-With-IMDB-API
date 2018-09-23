import React, { Component } from 'react';
import "./App.css";
import MovieRow from "./MovieRow";
import axios from "axios";


class App extends Component {
  constructor(props){
      super(props);

      this.state={
          movieData:[],
      }
      
  }


  componentDidMount(){
     this.getMovieData("marvel");
  }

  getMovieData(keyword){
    axios.get("https://api.themoviedb.org/3/search/movie?query="+keyword+"&api_key=07f3e2012e94eb6476c1d30ac1707629")
    .then(response=>{
      this.setState({
        movieData:response.data.results
      });
      
    }).catch(error=>{
      console.log("Error is here :: ", error);
    })
  }

  displayMovieRow(){
    return this.state.movieData.map((data)=>{
      return <MovieRow  key={data.id} id={data.id} title={data.title} poster_path ={data.poster_path}  overview={data.overview} />
    })
   
  }

  handleOnChange(e){
      this.getMovieData(e.target.value);
  }

  render() {
    return (
     <div>
        <table className="titleBar">
        <tbody>
              <tr>
                  <td>
                        <img alt="imdb_logo" width= "50" src="imdb.ico" />
                  </td>
        <td width="8" />
                  <td>
                     <h1> Movies DB Search</h1> 
                  </td>
              </tr>
              </tbody>
        </table>

        <input className="searchInput" placeholder="Enter search term" onChange={this.handleOnChange.bind(this)} />

     {this.displayMovieRow()}
       

     </div>
    );
  }
}

export default App;
