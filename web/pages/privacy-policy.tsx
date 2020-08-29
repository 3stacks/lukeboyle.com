import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HomeHeadBanner from '../components/HomeHeadBanner/HomeHeadBanner';
import MaxWidthContainer from '../components/MaxWidthContainer';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

const StyledSummary = styled.summary`
	display: flex;
	align-items: center;
	cursor: pointer;
	list-style-type: none;

	svg {
		font-size: 1.6rem;
		margin-right: 15px;
		transition: transform 0.25s ease-out;
	}

	h3 {
		margin: 0;
	}

	&::-webkit-details-marker {
		display: none;
	}
`;

const StyledDetails = styled.details`
	&[open] {
		summary svg {
			transform: rotate(90deg);
		}

		.contents {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.contents {
		position: relative;
		opacity: 0;
		transform: translateX(-10px);
		transition: opacity 0.2s ease-out, transform 0.2s ease-out;
	}
`;

export const PrivacyPolicy = () => {
	return (
		<main className="main">
			<Head>
				<title>Privacy Policy | Luke Boyle</title>
			</Head>
			<div className="head-slot">
				<HomeHeadBanner hasColor>
					<h1 className="site-name">Privacy Policy</h1>
				</HomeHeadBanner>
			</div>
			<div className="body-slot">
				<MaxWidthContainer className="about-main">
					<h2>
						Current privacy policy as of{' '}
						<time dateTime="2020-08-15">15/08/2020</time>
					</h2>
					<p>
						This website's traffic is subject to the privacy terms
						of{' '}
						<Link href="https://docs.netlify.com/monitor-sites/analytics/how-analytics-works">
							<a rel="noreferrer noopener">Netlify's analytics</a>
						</Link>
						. All tracking is performed on the server. There is no
						client side analytics and all data is anonymous logged.
						The data points collected are limited to:
					</p>
					<ul>
						<li>Number of users</li>
						<li>Country of origin</li>
						<li>Pages viewed</li>
					</ul>
					<h2>Deprecated versions of the privacy policy</h2>
					<p>
						All deprecated versions of the policy will be retained
						here for clarity.
					</p>
					<StyledDetails>
						<StyledSummary>
							<FaChevronRight />
							<h3>
								Policy deprecated as of{' '}
								<time dateTime="2020-08-15">15/08/2020</time>
							</h3>
						</StyledSummary>
						<div className="contents">
							<p>
								The site uses DNS level analytics provided by
								Cloudflare to give me traffic stats and
								geographical information. I don't use Google
								analytics or any other tracking software.
							</p>
						</div>
					</StyledDetails>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
