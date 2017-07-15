import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import './site-nav.scss';

export default function SiteNav({isFrontPage, ...otherProps}) {
    return (
        <div className="site-nav">
            {
                isFrontPage
                ?
                    <h1 className="site-nav--logo">
                        <a href="/" rel="home" title="Go back to home page">
                            Luke Boyle
                        </a>
                    </h1>
                :
                    <p className="site-nav--logo">
                        <a href="/" rel="home" title="Go back to home page">
                            Luke Boyle
                        </a>
                    </p>
            }
            <ul id="menu" className="menu"><li id="menu-item-57" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-57"><a href="/">Home</a></li>
                <li className="menu-item">
                    <Link to="/portfolio/">
                        Portfolio
                    </Link>
                </li>
                <li className="menu-item">
                    <Link to="/blog/">
                        Blog
                    </Link>
                </li>
                <li className="menu-item">
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