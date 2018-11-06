import React from "react";
import Helmet from "react-helmet";
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer.js';
import {META_DESCRIPTION, MY_NAME} from "../constants";
import styled from 'styled-components';

const StyledLayout = styled.div`
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
`;

export default class Layout extends React.Component {
    propTypes = {
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
				/>
				<Header />
				<main className="site-main">
					{this.props.children}
				</main>
				<Footer/>
			</StyledLayout>
		)
	}
}