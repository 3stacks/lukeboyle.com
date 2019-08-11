import React from "react";
import axios from 'axios';
import Helmet from "react-helmet";
import Layout from '../components/layout';
import {Link} from 'gatsby';
import portfolioItems from '../data/portfolio-items';
import styled from 'styled-components';
import {MaxWidthContainer} from '../styled/utils';
import {bp} from '../styled/mixins';
import {LinkButton} from "../components/button";
import artistData from '../data/artists.json';
import albumData from '../data/albums.json';
import postData from '../data/music-posts.json';

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

const MainHeader = styled.h2`
	text-align: center;
	font-size: 3rem;
	margin-bottom: 20px;
`;

const BodyWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	padding-top: 20px;
	
	.left {
		align-self: start;
		
		${bp(1000, `
			position: sticky;
			top: -1px;
		`)}
	
		h2 {
			text-align: center;
			
			${bp(1000, `
				text-align: left;
				font-size: 2.8rem;
			`)}
			
			${bp(1027, `
				font-size: 3rem;
			`)}
		}
	}
	
	${bp(1000, `
		grid-template-columns: 1fr 3fr;
	`)}
	
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: center;
		
		${bp(1000, `
			text-align: left;
		`)}
	}
	
	li {
		font-size: 1.8rem;
		margin-bottom: 15px;
	}
`;

export default class Portfolio extends React.Component {
	state = {
		artistData: [],
		albumData: []
	};

	componentDidMount = async () => {
		try {
			const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=3month&user=lookboil&api_key=${process.env.GATSBY_LAST_FM_API_KEY}&format=json`);

			console.log(response.data.topartists.artist.slice(0, 12), null, '\t');
		} catch (e) {
			console.error(e);
		}
	};

	render() {
		return (
			<Layout slug="music">
				<Helmet
					title="Music | Luke Boyle"
				/>
				<MaxWidthContainer>
					<BodyWrapper>
						<div className="left">
							<MainHeader>
								Recent posts
							</MainHeader>
							<ul>
								{postData.map(post => {
									return (
										<li key={post.fileName}>
											<Link to={`/${post.path.replace('.md', '')}`}>
												{post.postTitle}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
						<div>
							<MainHeader>
								Who I've been listening to
							</MainHeader>
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
							<MainHeader>
								My most played albums
							</MainHeader>
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
						</div>
					</BodyWrapper>
				</MaxWidthContainer>
			</Layout>
		)
	}
}
