import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import ExternalLink from '../../components/ExternalLink';
import { MY_NAME } from '../../constants';
import HomeHeadBanner from '../../components/HomeHeadBanner/HomeHeadBanner';
import { RecentStuff, Stuff } from '../../index.style';
import { LinkButton } from '../../components/Button';
import Link from 'next/link';

export const About = () => {
	return (
		<main className="main">
			<Head>
				<title>About | Luke Boyle</title>
			</Head>
			<div className="body-slot">
				<MaxWidthContainer isSmall className="about-main">
					<h2>Quick facts:</h2>
					<ul>
						<li>
							Co-founder of{' '}
							<ExternalLink href="https://stak.digital">
								Stak Digital
							</ExternalLink>
						</li>
						<li>Open-source/data privacy advocate</li>
						<li>Experienced with React, Angular 1.x, and Vue.js</li>
						<li>
							Experienced with AWS services including Lambda, EC2,
							API Gateway
						</li>
					</ul>
					<h2>Links</h2>
					<ul>
						<li>
							LinkedIn:{' '}
							<ExternalLink href="https://www.linkedin.com/in/luke-boyle">
								https://www.linkedin.com/in/luke-boyle
							</ExternalLink>
						</li>
						<li>
							Personal Github:{' '}
							<ExternalLink href="https://github.com/3stacks">
								https://github.com/3stacks
							</ExternalLink>
						</li>
						<li>
							Stak Github:{' '}
							<ExternalLink href="https://github.com/stak-digital">
								https://github.com/stak-digital
							</ExternalLink>
						</li>
						<li>
							npm:{' '}
							<ExternalLink href="https://npmjs.com/~lukeboyle">
								https://npmjs.com/~lukeboyle
							</ExternalLink>
						</li>
						<li>
							For project enquiries:{' '}
							<ExternalLink href="https://stak.digital/contact">
								https://stak.digital/contact
							</ExternalLink>
						</li>
					</ul>
					<h2>Tracking &amp; privacy</h2>
					<Link href="/privacy-policy">
						<a>View my privacy policy here</a>
					</Link>
				</MaxWidthContainer>
			</div>
		</main>
	);
};

export default About;
