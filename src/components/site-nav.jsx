import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';



export default function SiteNav({isFrontPage, ...otherProps}) {
    return (
        <div className="site-nav">
            {isFrontPage ? (
                <h1 className="site-nav--logo">
                    Luke Boyle
                </h1>
            ) : (
                <p className="site-nav--logo">
                    <a href="/" rel="home" title="Go back to home page">
                        Luke Boyle
                    </a>
                </p>
            )}
            <ul id="menu" className="menu">
                <li className="menu__item">
                    <a href="/">
                        Home
                    </a>
                </li>
                <li className="menu__item">
                    <Link to="/portfolio/">
                        Portfolio
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/blog/">
                        Blog
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to="/about/">
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