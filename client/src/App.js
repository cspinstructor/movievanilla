import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// const ShowMovies = props => {
//   let { movies } = props;

//   return (
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <th>Delete</th>
//             <th>Title</th>
//             <th>Year</th>
//             <th>Genre</th>
//             <th>Actors</th>
//             <th>Plot</th>
//             <th>Poster</th>
//           </tr>
//           {movies.map(movie => {
//             return (
//               <tr key={movie.title}>
//                 <td>
//                   <button
//                     onClick={() => {
//                       props.doDelete(movie.title);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 <td>{movie.title}</td>
//                 <td>{movie.year}</td>
//                 <td>{movie.genre}</td>
//                 <td>{movie.actors}</td>
//                 <td>{movie.plot}</td>
//                 <td>
//                   <img src={movie.poster} />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      movies: [],
      error: undefined
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllMovies();
  }

  onSubmit(e) {
    e.preventDefault();
    const query = `/getmovie?title=${this.state.title}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        if (result.data === 'Not found') {
          alert('Movie not found');
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('onSubmit axios Error: ', error);
      });
  }

  onChange(e) {
    this.setState({ title: e.target.value });
  }

  doDelete(title) {
    const query = `/deletemovie?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  getAllMovies() {
    axios
      .get('/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  render() {
    var data = this.state.movies;
    data = data.reverse();
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} />
          <p />
          <button>Submit</button>
        </form>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Delete</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Actors</th>
                <th>Plot</th>
                <th>Poster</th>
              </tr>
              {this.state.movies.map(movie => {
                return (
                  <tr key={movie.title}>
                    <td>
                      <button
                        onClick={() => {
                          this.doDelete(movie.title);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.actors}</td>
                    <td>{movie.plot}</td>
                    <td>
                      <img src={movie.poster} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
