
			import React from 'react';
			import Helmet from 'react-helmet';
			import {BlogHeader} from '../styled/utils';
			import PostArchive from '../components/post-archive/post-archive';
			import {HomeHeadBanner} from '../pages/index';
			import {BodyWrapper} from '../pages/music';
			import Layout from '../components/layout/layout';
			import {MaxWidthContainer} from '../styled/utils';
			import TopAlbumsOfLastDecadeMd from './blog-posts/2020/01/top-albums-of-last-decade';
import MyFavoriteVersesMd from './blog-posts/2019/09/my-favorite-verses';
import GithubActionsForWebAppsMd from './blog-posts/2019/08/github-actions-for-web-apps';
import TopAlbumsOf2019Md from './blog-posts/2019/07/top-albums-of-2019';
import SoftwareIActuallyBelieveInMd from './blog-posts/2018/12/software-i-actually-believe-in';
import CaseStudyForIterativeDevelopmentMd from './blog-posts/2018/11/case-study-for-iterative-development';

				
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
							</BlogHeader>
							<MaxWidthContainer className="blog-page">
								<BodyWrapper>
									<div className="left">
										<h3>
											Post Archive
										</h3>
										<PostArchive data={{"2016":{"10":[{"slug":"running-karma-tests-for-chrome-in-travis-ci","path":"blog-posts/2016/10/running-karma-tests-for-chrome-in-travis-ci.md","title":"Running Karma tests for Chrome in Travis CI"},{"slug":"local-storage-manager-version-2-1-is-out-now","path":"blog-posts/2016/10/local-storage-manager-version-2-1-is-out-now.md","title":"Local Storage Manager version 2.1 is out now"}],"12":[{"slug":"top-15-albums-of-2016","path":"blog-posts/2016/12/top-15-albums-of-2016.md","title":"Top 15 Albums of 2016"},{"slug":"automating-css-regression-testing-with-argus-eyes--phantom-js","path":"blog-posts/2016/12/automating-css-regression-testing-with-argus-eyes--phantom-js.md","title":"Automating CSS regression testing with Argus Eyes (PhantomJS)"}],"09":[{"slug":"react-material-ui-touch-events-not-firing","path":"blog-posts/2016/09/react-material-ui-touch-events-not-firing.md","title":"React Material-UI touch events not firing"},{"slug":"jsx-in-vue-js","path":"blog-posts/2016/09/jsx-in-vue-js.md","title":"JSX in Vue.JS"},{"slug":"essential-hip-hop-albums-of-the-decade-so-far","path":"blog-posts/2016/09/essential-hip-hop-albums-of-the-decade-so-far.md","title":"Essential Hip-Hop Albums of the Decade so far."}],"08":[{"slug":"publishing-react-components-to-npm","path":"blog-posts/2016/08/publishing-react-components-to-npm.md","title":"Publishing React components to npm"},{"slug":"dynamic-product-filtering-in-shopify","path":"blog-posts/2016/08/dynamic-product-filtering-in-shopify.md","title":"Dynamic Product Filtering in Shopify"}],"06":[{"slug":"agander-2-0-is-now-out","path":"blog-posts/2016/06/agander-2-0-is-now-out.md","title":"Agander 2.0 is now out."}],"04":[{"slug":"why-i-cancelled-my-spotify-subscription","path":"blog-posts/2016/04/why-i-cancelled-my-spotify-subscription.md","title":"Why I cancelled my Spotify subscription."},{"slug":"i-forced-myself-to-make-meaningful-github-commits-for-30-days","path":"blog-posts/2016/04/i-forced-myself-to-make-meaningful-github-commits-for-30-days.md","title":"I forced myself to make meaningful Github commits for 30 days."},{"slug":"google-calendar-api---color-id","path":"blog-posts/2016/04/google-calendar-api---color-id.md","title":"Google Calendar API - ColorId"},{"slug":"agander-1-0-is-now-out","path":"blog-posts/2016/04/agander-1-0-is-now-out.md","title":"Agander 1.0 is now out."}],"03":[{"slug":"google-task-javascript-api---invalid-value-400-error","path":"blog-posts/2016/03/google-task-javascript-api---invalid-value-400-error.md","title":"Google Task Javascript API - Invalid Value 400 Error"}]},"2017":{"12":[{"slug":"project-estimations-made-easy","path":"blog-posts/2017/12/project-estimations-made-easy.md","title":"Project estimations made easy"}],"04":[{"slug":"css-variables--a-case-study","path":"blog-posts/2017/04/css-variables--a-case-study.md","title":"CSS Variables: A Case Study"}],"01":[{"slug":"functional-form-validation-in-java-script--aka--inheriting-bad-java-script","path":"blog-posts/2017/01/functional-form-validation-in-java-script--aka--inheriting-bad-java-script.md","title":"Functional Form Validation in JavaScript (aka: Inheriting bad JavaScript)"}]},"2018":{"11":[{"slug":"top-albums-of-2018","path":"blog-posts/2018/11/top-albums-of-2018.md","title":"Top albums of 2018"},{"slug":"top-albums-of-2017","path":"blog-posts/2018/11/top-albums-of-2017.md","title":"Top albums of 2017"},{"slug":"mac-miller","path":"blog-posts/2018/11/mac-miller.md","title":"Mac Miller"},{"slug":"case-study-for-iterative-development","path":"blog-posts/2018/11/case-study-for-iterative-development.md","title":"My Muscle Chef: A case study for iterative development"}],"12":[{"slug":"software-i-actually-believe-in","path":"blog-posts/2018/12/software-i-actually-believe-in.md","title":"Software I actually believe in"}],"01":[{"slug":"converting-wordpress-site-to-static","path":"blog-posts/2018/01/converting-wordpress-site-to-static.md","title":"Converting a WordPress site to a React static site "}]},"2019":{"09":[{"slug":"my-favorite-verses","path":"blog-posts/2019/09/my-favorite-verses.md","title":"A few of my favourite verses"}],"08":[{"slug":"github-actions-for-web-apps","path":"blog-posts/2019/08/github-actions-for-web-apps.md","title":"Github Actions for web apps\r"}],"07":[{"slug":"top-albums-of-2019","path":"blog-posts/2019/07/top-albums-of-2019.md","title":"Top albums of 2019"}]},"2020":{"01":[{"slug":"top-albums-of-last-decade","path":"blog-posts/2020/01/top-albums-of-last-decade.md","title":"My favourite albums of the 2010s\r"}]}}} />
									</div>
									<div>
										<TopAlbumsOfLastDecadeMd isBlogPage={true} />
<MyFavoriteVersesMd isBlogPage={true} />
<GithubActionsForWebAppsMd isBlogPage={true} />
<TopAlbumsOf2019Md isBlogPage={true} />
<SoftwareIActuallyBelieveInMd isBlogPage={true} />
<CaseStudyForIterativeDevelopmentMd isBlogPage={true} />
	
										<ul className="pagination">
											
											<li className="pagination__next"><a href="/blog/1">Older</a></li>
										</ul>							
									</div>
								</BodyWrapper>
							</MaxWidthContainer>
						</Layout>
					);
				}
			}
		