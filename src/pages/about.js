import React from "react";
import Helmet from "react-helmet";
import Layout from '../components/layout';
import mozillaSrc from '../assets/img/mozilla.gif';
import rcaSrc from '../assets/img/rca.gif';
import berrySrc from '../assets/img/berry.gif';
import styled from 'styled-components';

const SupportContainer = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 30px;
	list-style: none;
	margin: 0 0 30px;
	padding: 0;
	
	img {
		max-width: 100%;
	}
`;

export default class About extends React.Component {
    render() {
        return (
            <Layout slug="about">
				<Helmet>
					<title>About | Luke Boyle</title>
				</Helmet>
				<div style={{maxWidth: 700, margin: '0 auto'}} className="max-width-container about-main">
					<h2>
						Working at SEEK
					</h2>
					<p>
						Working in the Company Reviews team focused on
						re-platforming and improving the quality of reviews
					</p>
					<p>
						Maintaining legacy C# API, building out new microservice
						APIs, and improving customer facing and internal UI services.
					</p>
					<h2>
						Quick facts:
					</h2>
					<ul>
						<li>
							Co-founder of <a href="https://stak.digital">Stak Digital</a>
						</li>
						<li>
							Open-source/data privacy advocate
						</li>
						<li>
							Experienced with React, Angular 1.x, and Vue.js
						</li>
						<li>
							Experienced with AWS services including Lambda, EC2, API Gateway
						</li>
					</ul>
					<h2>
						Links
					</h2>
					<ul>
						<li>
							Twitter: <a href="https://twitter.com/tricepidemic">https://twitter.com/tricepidemic</a>
						</li>
						<li>
							LinkedIn: <a href="https://www.linkedin.com/in/luke-boyle">
							https://www.linkedin.com/in/luke-boyle
						</a>
						</li>
						<li>
							Personal Github: <a href="https://github.com/3stacks">https://github.com/3stacks</a>
						</li>
						<li>
							Stak Github: <a href="https://github.com/stak-digital">https://github.com/stak-digital</a>
						</li>
						<li>
							npm: <a href="https://npmjs.com/~lukeboyle">https://npmjs.com/~lukeboyle</a>
						</li>
						<li>
							Stack Overflow: <a href="https://stackoverflow.com/users/story/5602665">https://stackoverflow.com/users/story/5602665</a>
						</li>
						<li>
							For project enquiries; go to <a href="https://stak.digital">https://stak.digital</a> and fill out your information at the bottom
						</li>
					</ul>
					<h2>
						Proudly supporting
					</h2>
					<SupportContainer>
						<li>
							<img src={mozillaSrc} alt="The Mozilla Foundation"/>
						</li>
						<li>
							<img src={rcaSrc} alt="Red Cross Australia"/>
						</li>
						<li>
							<img src={berrySrc} alt="Berry Street"/>
						</li>
					</SupportContainer>
					<h2>
						The site
					</h2>
					<h3>
						Tracking &amp; privacy
					</h3>
					<p>
						The site uses DNS level analytics provided by Cloudflare
						to give me traffic stats and geographical information.
						I don't use Google analytics or any other tracking software.
					</p>
					<h3>
						Attributions
					</h3>
					<p>
						The background pattern in the header and footer was
						provided by <a href="https://www.svgbackgrounds.com">
						https://www.svgbackgrounds.com
					</a>.
					</p>
				</div>
			</Layout>
        );
    }
}
