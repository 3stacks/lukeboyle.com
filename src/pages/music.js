import React from "react";
import Helmet from "react-helmet";
import Layout from '../components/layout';
import portfolioItems from '../data/portfolio-items';
import styled from 'styled-components';
import {MaxWidthContainer} from '../styled/utils';
import {bp} from '../styled/mixins';
import {LinkButton} from "../components/button";
import artistData from '../data/artists.json';
import albumData from '../data/albums.json';

const ArtistList = styled.ol`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	margin: 0;
	padding: 0;
	
	${bp(450, `
		grid-template-columns: 1fr 1fr;
	`)}
	
	${bp(700, `
		grid-template-columns: 1fr 1fr 1fr;
	`)}
	
	${bp(920, `
		grid-template-columns: 1fr 1fr 1fr 1fr;
	`)}
	
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.artist-name {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		padding-top: 1rem;
	}
	
	.play-count {
		margin: 0;
		font-size: 1.6rem;
	}
`;

const MainHeader = styled.h1`
	text-align: center;
	font-size: 3rem;
	margin-bottom: 20px;
`;

export default class Portfolio extends React.Component {
	render() {
		return (
			<Layout slug="music">
				<Helmet
					title="Music | Luke Boyle"
				/>
				<div>
					<MainHeader>
						Who I've been listening to
					</MainHeader>
					<MaxWidthContainer>
						<ArtistList>
							{artistData.map(artist => {
								const imageToShow = artist.image.find(image => image.size === 'large') || artist.image[0];
								const imageSrc = imageToShow['#text'];
								return (
									<li key={artist.mbid}>
										<div className="image-wrapper">
											<img src={imageSrc} alt=""/>
										</div>
										<h2 className="artist-name">
											{artist.name}
										</h2>
										<p className="play-count">
											{artist.playcount} plays
										</p>
									</li>
								);
							})}
						</ArtistList>
					</MaxWidthContainer>
					<MainHeader>
						My most played albums
					</MainHeader>
					<MaxWidthContainer>
						<ArtistList>
							{albumData.map(album => {
								const imageToShow = album.image.find(image => image.size === 'large') || album.image[0];
								const imageSrc = imageToShow['#text'];
								return (
									<li key={album.mbid}>
										<div className="image-wrapper">
											<img src={imageSrc} alt=""/>
										</div>
										<h2 className="artist-name">
											{album.name}
										</h2>
										<p className="play-count">
											{album.playcount} plays
										</p>
									</li>
								);
							})}
						</ArtistList>
					</MaxWidthContainer>
				</div>
			</Layout>
		)
	}
}
