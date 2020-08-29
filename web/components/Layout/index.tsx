import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './style';
import { useRouter } from 'next/router';

interface IProps {
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

	if (slug === '/') {
		return 'home';
	}

	return slug.replace('/', '');
};

export const Layout = ({ children }: IProps) => {
	const { asPath } = useRouter();
	const route = getRouteFromSlug(asPath);
	const isHomeOrPortfolioPage =
		asPath === '/' || asPath.includes('/portfolio') || asPath === '/feed';

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
