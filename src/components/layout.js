import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer.js';
import { META_DESCRIPTION, MY_NAME } from '../constants';
import styled, { createGlobalStyle } from 'styled-components';
import appleSmall from '../assets/img/apple-icon-76x76.png';
import appleMedium from '../assets/img/apple-icon-120x120.png';
import appleLarge from '../assets/img/apple-icon-152x152.png';
import androidIcon from '../assets/img/android-icon-192x192.png';
import favicon from '../assets/img/favicon-32x32.png';
import colors from '../styled/colors';

import './layout.css';

const GlobalLayoutStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html {
		font-size: 62.5%;
	}
	
	h1, h2, h3, h4, h5, h6, button {
		font-family: 'Roboto Slab', serif;
	}
	
	body {
		font-family: 'Source Sans Pro', sans-serif;
	}
	
	h1 {
		font-size: 4rem;;
		margin-top: 0;
	}
	
	h2 {
		font-size: 3.5rem;
		margin-top: 0;
	}
	
	h3 {
		font-size: 2.8rem;
		margin-top: 0;
	}
	
	p {
		font-size: 1.6rem;
		margin-top: 0;
	}
	
	* {
		line-height: 1.5;
	}
	
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.3;
	}
	
	.about-main {
		padding: 60px 20px;
	}
	
	p {
		font-size: 1.8rem;
	}
	
	.blog-category {
		text-align: center;
		font-size: 3rem;
	}
	
	.blog-single {
		position: relative;
	}
	
	.blog-single h1 {
		margin-top: 0;
	}
	
	.about-main ul {
		font-size: 1.8rem;
	}
	
	small {
		font-size: 1.2rem;
	}
	
	@media (min-width: 768px) {
		pre {
			font-size: 85%;
		}
	}
	
	pre {
		padding: 16px;
		overflow: auto;
		font-size: 70%;
		line-height: 1.45;
		background-color: #f7f7f7;
		border-radius: 3px;
	}
	
	header,
	footer {
		flex-grow: 0;
	}
	
	main {
		flex-grow: 1;
	}
	
	.disclaimer-block {
		background: #FF851B;
		color: white;
		white-space: normal;
	}
	
	a {
		color: ${colors.PRIMARY};
		transition: color 0.5s ease-out, border-color 0.25s ease-out;
		text-decoration: none;
		border-bottom: 1px solid ${colors.PRIMARY};
		
		&:hover, 
		&:focus {
			border-bottom: 1px solid transparent;
			color: ${colors.PRIMARY_GRADIENT_LIGHT};
		}
	}
	
	.pagination {
		display: flex;
		width: 25%;
		margin: 0 auto;
		font-size: 1.6rem;
		padding-top: 40px;
	}
	
	.pagination li {
		list-style: none;
	}
	
	.pagination__next {
		margin-left: auto;
	}
`;

const StyledLayout = styled.div`
	margin: 0;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;

	${props => {
		console.log(props);
		return (
			props.isHome &&
			`
		color: white;
		background-color: ${colors.PRIMARY};
	`
		);
	}}

	.block-header {
		font-size: 2.5rem;
	}

	.title {
		font-size: 3.5rem;
	}
`;

export default class Layout extends React.Component {
	static propTypes = {
		slug: PropTypes.string.isRequired
	};

	render() {
		return (
			<StyledLayout
				className={`layout ${this.props.slug}`}
				isHome={this.props.isHome}
			>
				<Helmet
					title={`${MY_NAME} | Front End Developer`}
					meta={[
						{
							name: 'description',
							content: META_DESCRIPTION.HOME
						},
						{
							name: 'google-site-verification',
							content:
								'JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM'
						}
					]}
				>
					<meta name="referrer" content="origin" />
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href={appleSmall}
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href={appleMedium}
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href={appleLarge}
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href={androidIcon}
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href={favicon}
					/>
				</Helmet>
				<GlobalLayoutStyle />
				<Header isHome={this.props.slug === 'home'} />
				<main>{this.props.children}</main>
				<Footer />
			</StyledLayout>
		);
	}
}
