
			import React from 'react';
			import Helmet from 'react-helmet';
			import BlogHeader from '../components/blog-header';
			import Layout from '../components/layout';
			import {MaxWidthContainer} from '../styled/utils';
			import TopAlbumsOf_2018Md from './blog-posts/2018/11/top-albums-of-2018.js';
import ConvertingWordpressSiteToStaticMd from './blog-posts/2018/01/converting-wordpress-site-to-static.js';
import ProjectEstimationsMadeEasyMd from './blog-posts/2017/12/project-estimations-made-easy.js';
import CssVariablesACaseStudyMd from './blog-posts/2017/04/css-variables--a-case-study.js';

				
			export default class Blog extends React.Component {
				render() {
					return (
						<Layout slug="blog">
							<Helmet>
								<title>Blog | Luke Boyle</title>
							</Helmet>
							<BlogHeader>
								<h1 className="site-name">
									Boyleing Point
								</h1>
								<p className="description">
									7/11 was an inside job
								</p>
							</BlogHeader>
							<MaxWidthContainer className="blog-page">
								<TopAlbumsOf_2018Md isBlogPage={true} />
<ConvertingWordpressSiteToStaticMd isBlogPage={true} />
<ProjectEstimationsMadeEasyMd isBlogPage={true} />
<CssVariablesACaseStudyMd isBlogPage={true} />

							</MaxWidthContainer>
							<MaxWidthContainer>
								<ul className="pagination">
									
									<li className="pagination__next"><a href="/blog/1">Older</a></li>
								</ul>
							</MaxWidthContainer>
						</Layout>
					);
				}
			}
		