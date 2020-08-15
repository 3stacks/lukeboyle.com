import React from 'react';
import Link from 'next/link';
import { MY_NAME } from '../../constants';
import { StyledNav } from './SiteNav.style';
import { routes } from '../../data';

export const SiteNav = ({
    isHome = false,
    slug,
    rightSlot
}: {
    isHome: boolean;
    slug: string;
    rightSlot?: React.ReactElement;
}) => (
    <StyledNav>
        {isHome ? (
            <h1 className="logo">{MY_NAME}</h1>
        ) : (
            <p className="logo">
                <Link href="/">
                    <a rel="home" title="Go back to the home page">
                        {MY_NAME}
                    </a>
                </Link>
            </p>
        )}
        <ul id="menu" className="menu">
            {routes.map(route => {
                const isHome = route.slug === 'home';

                return (
                    <li
                        key={route.link}
                        className={
                            slug === route.slug ? 'item is-active' : 'item'
                        }
                    >
                        <Link href={route.link}>
                            <a
                                aria-label={
                                    isHome ? 'Go back to homepage' : undefined
                                }
                                tabIndex={0}
                            >
                                {route.text}
                            </a>
                        </Link>
                    </li>
                );
            })}
            {rightSlot}
        </ul>
    </StyledNav>
);

export default SiteNav;
