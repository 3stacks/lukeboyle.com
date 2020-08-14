import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { StyledLayout } from './Layout.style';

interface IProps {
    slug: string;
    headChildren?: () => React.ReactElement;
    children: any;
}

export const Layout = ({ slug, children }: IProps) => {
    const isHomeOrPortfolioPage =
        slug === 'home' || slug === 'portfolio' || slug === 'feed';

    return (
        <StyledLayout
            className={`layout ${slug}`}
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <Header isHome={slug === 'home'} slug={slug} />
            {children}
            <Footer />
        </StyledLayout>
    );
};

export default Layout;
