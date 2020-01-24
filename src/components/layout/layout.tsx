import React from 'react';
import Helmet from 'react-helmet';
import Header from '../header/header';
import Footer from '../footer/footer';
import { META_DESCRIPTION, MY_NAME } from '../../constants';
import styled, { createGlobalStyle, css } from 'styled-components';
import appleSmall from '../../assets/img/apple-icon-76x76.png';
import appleMedium from '../../assets/img/apple-icon-120x120.png';
import appleLarge from '../../assets/img/apple-icon-152x152.png';
import androidIcon from '../../assets/img/android-icon-192x192.png';
import favicon from '../../assets/img/favicon-32x32.png';
import GraphikWoff from '../../assets/Graphik-Regular.woff';
import GraphikWoffTwo from '../../assets/Graphik-Regular.woff2';
import COLORS from '../../styled/colors';

import './layout.css';
import WIDTHS from '../../styled/widths';
import { bp } from '../../styled/mixins';

const GlobalLayoutStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	
	@font-face {
      font-family: 'Graphik';
      font-display: swap;
      src: url(${GraphikWoffTwo}) format('woff2'),
        url(${GraphikWoff}) format('woff');
    }

	html {
		font-size: 62.5%;
	}
	
	h1, h2, h3, h4, h5, h6, button {
		font-family: 'Roboto Slab', serif;
	}
	
	body {
		font-family: 'Graphik', 'Helvetica Neue', sans-serif;
	}
	
	pre {
        font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
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
	
	a {
		color: ${COLORS.SECONDARY};
		text-decoration: none;
		border-bottom: 1px solid ${COLORS.SECONDARY};
		
		&:hover, 
		&:focus {
			border-bottom: 1px solid transparent;
			background-color: ${COLORS.SECONDARY};
			color: white !important;
		}
	}
	
	.pagination {
		display: flex;
		margin: 0 auto !important;
		font-size: 1.6rem;
		width: calc(100% - 20px)
		
		${bp(
            WIDTHS.M,
            `
		    width: calc(100% - 120px)
		`
        )}
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
    color: #111;
    background-color: ${COLORS.PRIMARY};

    .block-header {
        font-size: 2.5rem;
    }

    .title {
        font-size: 3.5rem;
    }

    ${props =>
        !props.showFullPageColor &&
        css`
            .body-slot {
                background-color: white;
                color: #111;
            }
        `}
`;

interface IProps {
    isHome: boolean;
    slug: string;
    headChildren?: () => React.ReactElement;
}

export default class Layout extends React.Component<IProps> {
    render() {
        const isHomeOrPortfolioPage =
            this.props.isHome || this.props.slug === 'portfolio';

        return (
            <StyledLayout
                className={`layout ${this.props.slug}`}
                isHome={this.props.isHome}
                showFullPageColor={isHomeOrPortfolioPage}
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
                        href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
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
                <main>
                    {this.props.headChildren && (
                        <div className="head-slot">
                            {this.props.headChildren()}
                        </div>
                    )}
                    <div className="body-slot">{this.props.children}</div>
                </main>
                <Footer />
            </StyledLayout>
        );
    }
}
