import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends Component {
	state = {
		movies: [],
	};

	async componentDidMount() {
		// After the component mounts grab the full list of movies from TMDB and then get the results
		// field off of the returned json object, this is a field specific to the TMDB API
		try {
			const movieRef = await fetch(
				'https://api.themoviedb.org/3/discover/movie?api_key=cd4c768de3bcea71b9e323dcdbf186a7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
			);
			const movies = await movieRef.json();
			this.setState({
				movies: movies.results,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<MovieGrid>
				{this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
			</MovieGrid>
		);
	}
}

export default MoviesList;

const MovieGrid = styled.div`
	display: grid;
	margin: 24px;
	grid-template-columns: repeat(6, 1fr);
	grid-gap: 32px;
`;
