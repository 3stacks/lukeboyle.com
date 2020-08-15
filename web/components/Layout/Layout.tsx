import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './Layout.style';

interface IProps {
	slug: string;
	headChildren?: () => React.ReactElement;
	children: any;
}

const getRouteFromSlug = slug => {
	if (slug.includes('/portfolio')) {
		return 'portfolio';
	}

	if (slug.includes('/blog-posts')) {
		const slugParts = slug.split('/');

		return `blog-single ${slugParts[slugParts.length - 1]}`;
	}

	if (slug.includes('/blog')) {
		return 'blog';
	}

	return 'home';
};

export const Layout = ({ slug, children }: IProps) => {
	const isHomeOrPortfolioPage =
		slug === '/' || slug.includes('/portfolio') || slug === '/feed';
	const route = getRouteFromSlug(slug);

	return (
		<StyledLayout
			className={`layout ${route}`}
			showFullPageColor={isHomeOrPortfolioPage}
		>
			<Header isHome={route === 'home'} slug={route} />
			{children}
			<Footer />
		</StyledLayout>
	);
};

export default Layout;
