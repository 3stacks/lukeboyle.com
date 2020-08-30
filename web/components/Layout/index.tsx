import * as React from 'react';
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './style';
import { getRouteFromSlug } from '../../utils';

interface IProps {
	headChildren?: () => React.ReactElement;
	children: any;
}

const isSlugHomeOrPortfolio = (slug: string): boolean => {
	return slug === '/' || slug.includes('/portfolio') || slug === '/feed';
};

export const Layout = ({ children }: IProps) => {
	const { asPath } = useRouter();
	const [route, setRoute] = React.useState<string>(getRouteFromSlug(asPath));
	const [isHomeOrPortfolioPage, setIsHomeOrPortfolioPage] = React.useState<
		boolean
	>(isSlugHomeOrPortfolio(asPath));

	React.useEffect(() => {
		setRoute(getRouteFromSlug(asPath));
		setIsHomeOrPortfolioPage(isSlugHomeOrPortfolio(asPath));
	}, [asPath]);

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
