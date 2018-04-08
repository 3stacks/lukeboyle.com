import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import {MY_NAME} from '../constants';

export default function SiteNav({isFrontPage, ...otherProps}) {
    return (
        <div className="site-nav">
            {isFrontPage ? (
                <h1 className="site-nav--logo">
                    {MY_NAME}
                </h1>
            ) : (
                <p className="site-nav--logo">
                    <Link to="/" rel="home" title="Go back to the home page">
                        {MY_NAME}
                    </Link>
                </p>
            )}
            <ul id="menu" className="menu">
                <li className="menu__item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/portfolio">
                        Portfolio
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/blog">
                        Blog
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/about">
                        About
                    </Link>
                </li>
            </ul>
        </div>
    );
}

SiteNav.propTypes = {
    isFrontPage: PropTypes.bool
};

SiteNav.defaultProps = {
    isFrontPage: false
};