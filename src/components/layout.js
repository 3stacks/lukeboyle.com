import React from "react";
import Helmet from "react-helmet";
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer.js';
import {META_DESCRIPTION, MY_NAME} from "../constants";
import styled from 'styled-components';
import './layout.css';
import '../assets/css/normalize.css';
import appleSmall from "../assets/img/apple-icon-76x76.png";
import appleMedium from "../assets/img/apple-icon-120x120.png";
import appleLarge from "../assets/img/apple-icon-152x152.png";
import androidIcon from "../assets/img/android-icon-192x192.png";
import favicon from "../assets/img/favicon-32x32.png";

const StyledLayout = styled.div`
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
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
							name: "description",
							content: META_DESCRIPTION.HOME
						},
						{
							name: 'google-site-verification',
							content: 'JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM'
						}
					]}
				>
					<meta name="referrer" content="origin" />
					<meta charSet="utf-8" />
					<link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro" rel="stylesheet" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="apple-touch-icon" sizes="76x76" href={appleSmall} />
					<link rel="apple-touch-icon" sizes="120x120" href={appleMedium} />
					<link rel="apple-touch-icon" sizes="152x152" href={appleLarge} />
					<link rel="icon" type="image/png" sizes="192x192" href={androidIcon} />
					<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
				</Helmet>
				<Header isHome={this.props.slug === 'home'}/>
				<main className="site-main">
					{this.props.children}
				</main>
				<Footer/>
			</StyledLayout>
		)
	}
}