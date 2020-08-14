import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { PAGES } from '../../constants';
import { StyledLayout } from './Layout.style';

interface IProps {
    slug: string;
    headChildren?: () => React.ReactElement;
    children: any;
}

export const Layout = ({ headChildren, slug, children }: IProps) => {
    const isHomeOrPortfolioPage =
        slug === 'home' || slug === 'portfolio' || slug === 'feed';

    return (
        <StyledLayout
            className={`layout ${slug}`}
            showFullPageColor={isHomeOrPortfolioPage}
        >
            <Header isHome={slug === 'home'} slug={slug} />
            <main className="main">
                {headChildren && (
                    <div className="head-slot">{headChildren()}</div>
                )}
                <div className="body-slot">
                    <>{children}</>
                </div>
            </main>
            <Footer />
        </StyledLayout>
    );
};

export default Layout;
