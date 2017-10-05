import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import issuesSrc from '../../../../src/assets/img/portfolio/issues.png';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Agander
                    </h1>
                    <div className="single-portfolio-item--content">
                        <h3>
                            Case Study
                        </h3>
                        <p>
                            <a href="https://agander.io" target="_blank">
                                2.0 is out now
                            </a>
                        </p>
                        <p>
                            Agander is an open-source platform designed to reduce the noise in your daily agenda.
                            The concept is simple; you connect your productivity software such as your calendar or
                            Asana tasks and you can effectively boil several tabs into one.
                        </p>
                        <p>
                            Version 1 was built in Vue.Js but as the complexity grew, there were some evident growing
                            pains, so it was made from the ground up in React for Version 2.
                        </p>
                        <p>
                            The project started as a service just for me, but it has been expanded to include several
                            services, including:
                        </p>
                        <ul>
                            <li>Google Calendar,</li>
                            <li>Google Tasks,</li>
                            <li>Asana Tasks,</li>
                            <li>Generic notepad</li>
                        </ul>
                        <p>
                            The service is somewhat developer focused, so current plans involve integration with Github
                            to display issues and milestones.
                        </p>
                        <h3>
                            Technologies
                        </h3>
                        <ul>
                            <li>
                                React
                            </li>
                            <li>
                                AJAX (with Promises)
                            </li>
                            <li>
                                SASS
                            </li>
                            <li>
                                OAUTH 2
                            </li>
                            <li>
                                Gulp
                            </li>
                        </ul>
                        <h3>Local Storage</h3>
                        <p>In an effort to eliminate the need for back end technologies, the current storage solution is
                            based on browser local storage. The result of this choice is interesting because the entire
                            state of the app can be stored in a single string. The first major milestone required a
                            suite of local storage management functions which ended up being spun off into a package and released on <a href="https://www.npmjs.com/package/@lukeboyle/local-storage-manager" target="_blank">npmjs.</a></p>
                        <h3>Github</h3>
                        <p>Throughout the development process, the Github repository became less of a version
                            control tool and began to transform into a collaborative project management platform.</p>
                        <p>I was constantly trying to find new ways to make the repository easier to manage.</p>
                        <h3>Github activity</h3>
                        <p>In the most active month (surrounding the release of version 1.0), the repository
                            saw 137 commits, 6 pull requests and 21 closed issues which included various bugs
                            and features/improvements.</p>
                        <h3>Issues and Labels</h3>
                        <figure>
                            <img src={issuesSrc} alt="" width="752" height="404"/>
                                <figcaption>
                                    Each issue gets a status, type and a priority to make them more searchable and more manageable.
                                </figcaption>
                        </figure>
                        <h3>Semantic Commits</h3>
                        <p>I made the decision to require all commits to be semantic. Semantic commits
                            essentially have a keyword at the start of the commit to indicate what type of
                            commit it is (e.g. ‘feat’, ‘fix’, ‘refactor’). This allows commits pieces of work to be split up into more logical segments and have more accurate descriptions.</p>
                        <p>This enables easy rollbacks to previous features or previous fixes and it also creates
                            a computer readable commit log, effectively automating changelogs.</p>
                        <h3>Semantic Versioning</h3>
                        <p>Semantic Versioning dictates that all version changes be made in increments of x.y.z
                            (where x is major release (breaking change), y is minor release, and z is a patch).</p>
                        <p>Because of this, I can be confident that any build under the 1.x release will be
                            compatible with currently stored app data.</p>
                    </div>
                    <div className="single-portfolio-item--buttons">
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://agander.io">
                            View live site
                        </a>
                        <a target="_blank" className="single-portfolio-item--link button primary" href="https://github.com/3stacks/agander">
                            See repository
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
