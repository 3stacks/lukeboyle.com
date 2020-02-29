import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/layout/layout';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { PAGES } from '../../constants';

export default class About extends React.Component {
    render() {
        return (
            <Layout pageName={PAGES.ABOUT} isHome={false} slug="about">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <MaxWidthContainer isSmall className="about-main">
                    <h2>Quick facts:</h2>
                    <ul>
                        <li>
                            Co-founder of{' '}
                            <a
                                href="https://stak.digital"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Stak Digital
                            </a>
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
                            <a
                                href="https://www.linkedin.com/in/luke-boyle"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://www.linkedin.com/in/luke-boyle
                            </a>
                        </li>
                        <li>
                            Personal Github:{' '}
                            <a
                                href="https://github.com/3stacks"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://github.com/3stacks
                            </a>
                        </li>
                        <li>
                            Stak Github:{' '}
                            <a
                                href="https://github.com/stak-digital"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://github.com/stak-digital
                            </a>
                        </li>
                        <li>
                            npm:{' '}
                            <a
                                href="https://npmjs.com/~lukeboyle"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://npmjs.com/~lukeboyle
                            </a>
                        </li>
                        <li>
                            Stack Overflow:{' '}
                            <a
                                href="https://stackoverflow.com/users/story/5602665"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://stackoverflow.com/users/story/5602665
                            </a>
                        </li>
                        <li>
                            For project enquiries:{' '}
                            <a
                                href="https://stak.digital/contact"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                https://stak.digital/contact
                            </a>
                        </li>
                    </ul>
                    <h2>Tracking &amp; privacy</h2>
                    <p>
                        The site uses DNS level analytics provided by Cloudflare
                        to give me traffic stats and geographical information. I
                        don't use Google analytics or any other tracking
                        software.
                    </p>
                </MaxWidthContainer>
            </Layout>
        );
    }
}
