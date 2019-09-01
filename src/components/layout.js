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

const GlobalLayoutStyle = createGlobalStyle`
	/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}
	
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
	
	.site-main {
		padding-bottom: 60px;
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
	
	.blog-single .blog-header {
		background-color: transparent !important;
		background-attachment: fixed !important;
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
		color: #34495e;
		transition: color 0.5s ease-out, border-color 0.25s ease-out;
		text-decoration: none;
		border-bottom: 1px solid #34495e;
		
		&:hover, 
		&:focus {
			border-bottom: 1px solid transparent;
			color: #46637f;
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
	
	.blog-page {
		max-width: 700px;
	}
`;

const StyledLayout = styled.div`
	margin: 0;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;

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
			<StyledLayout className={`layout ${this.props.slug}`}>
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
				<main className="site-main">{this.props.children}</main>
				<Footer />
			</StyledLayout>
		);
	}
}
