import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { MY_NAME } from '../../constants';
import { StyledNav } from './style';

export default function SiteNav({
    isHome = false,
    rightSlot
}: {
    isHome: boolean;
    rightSlot?: React.ReactElement;
}) {
    return (
        <StyledNav>
            {isHome ? (
                <h1 className="logo">{MY_NAME}</h1>
            ) : (
                <p className="logo">
                    <Link to="/" rel="home" title="Go back to the home page">
                        {MY_NAME}
                    </Link>
                </p>
            )}
            <ul id="menu" className="menu">
                <li className="item">
                    <Link to="/">Home</Link>
                </li>
                <li className="item">
                    <Link to="/portfolio">Portfolio</Link>
                </li>
                <li className="item">
                    <Link to="/blog">Blog</Link>
                </li>
                <li className="item">
                    <Link to="/music">Music</Link>
                </li>
                <li className="item">
                    <Link to="/about">About</Link>
                </li>
            </ul>
            {rightSlot}
        </StyledNav>
    );
}
