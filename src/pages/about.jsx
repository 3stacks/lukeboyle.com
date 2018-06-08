import React from "react";
import Helmet from "react-helmet";

export default class About extends React.Component {
    render() {
        return (
            <div className="max-width-container about-main">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <h1 style={{textAlign: 'center'}}>
                    Front End Developer from
                    <span style={{display: 'block'}}>
                        Melbourne, Australia
                    </span>
                </h1>
                <div style={{maxWidth: 700, margin: '0 auto'}}>
					<h2>
						Quick facts:
					</h2>
					<ul>
						<li>
							Co-founder of <a href="https://stak.digital">Stak Digital</a>
						</li>
						<li>
							Open-source advocate
						</li>
						<li>
							Experience with React, Angular 1.x, and Vue.js
						</li>
						<li>
							Experience with ES2018, GraphQL, Express, babel, webpack and gulp.
						</li>
						<li>
							Interested in working with GoLang commercially
						</li>
					</ul>
					<h2>
						Links
					</h2>
					<ul>
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
                </div>
            </div>
        );
    }
}
