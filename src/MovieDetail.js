import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

// Absolute paths for the TMDB API
const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
	state = {
		movie: {},
	};

	async componentDidMount() {
		// After it mounts pull the current movie from the URL match param 'id'
		try {
			const movieRef = await fetch(
				`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=cd4c768de3bcea71b9e323dcdbf186a7&language=en-US`,
			);
			const movie = await movieRef.json();
			this.setState({
				movie,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { movie } = this.state;
		return (
			<Fragment>
				<MovieDetailHeader backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`} />
				<MovieInfo>
					<Overdrive id={movie.id} duration="350">
						<Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
					</Overdrive>
					<div>
						<Title>{movie.title}</Title>
						<BodyText>{movie.release_date}</BodyText>
						<SubTitle>Overview</SubTitle>
						<BodyText>{movie.overview}</BodyText>
					</div>
				</MovieInfo>
			</Fragment>
		);
	}
}

export default MovieDetail;

// Styled components
const MovieInfo = styled.div`
	background: #222;
	display: flex;
	text-align: left;
	padding: 2rem 10%;
	color: #fefefe;
	> div {
		margin-left: 20px;
		margin-left: 24px;
	}
	img {
		position: relative;
		top: -5rem;
	}
`;

const MovieDetailHeader = styled.div`
	height: 400px;
	width: 100%;
	display: flex;
	background: url(${props => props.backdrop}) no-repeat;
	background-size: cover;
`;

const Title = styled.h1`
	color: white;
	font-size: 24px;
	line-height: 28px;
`;

const SubTitle = styled.h2`
	color: white;
	font-size: 19px;
	line-height: 27px;
`;

const ExtraTitle = styled.h2`
	color: white;
	font-size: 16px;
	line-height: 23px;
`;

const BodyText = styled.p`
	color: #B8B8B8;
	font-size: 16px;
	line-height: 23px;
`;
