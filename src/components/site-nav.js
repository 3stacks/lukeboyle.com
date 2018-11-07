import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import {MY_NAME} from '../constants';
import styled from 'styled-components';
import {bp} from '../styled/mixins';
import WIDTHS from '../styled/widths';

const StyledNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 100px;
    
    a {
        color: white;
    }
    
    ${bp(WIDTHS.M, `
        flex-wrap: nowrap;
        height: 60px;     
    `)}
    
    & .logo {
        margin: 0;
        font-size: 2.5rem;
        font-family: 'Roboto Slab', serif;
        width: 100%;
        text-align: center;
        
        ${bp(WIDTHS.M, `
            width: 250px;
            text-align: left;  
        `)}
        
        a {
          color: white;
          text-decoration: none;
        
          &:hover {
            color: white;
          }
        }
    }
    
    .menu {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
        color: white;
        
        ${bp(WIDTHS.M, `
            text-align: right;
        `)}
        
        & .item {
          display: inline-block;
          margin: 0;
        
          &:not(:last-child) {
            margin-right: 15px;
          }
        
          a {
            color: white;
            font-size: 1.6rem;
            border-color: transparent;
        
            &.active,
            &:focus,
            &:hover {
              border-color: white;
            }
          }
        }
    }
`;

export default function SiteNav({isHome, ...otherProps}) {
    return (
        <StyledNav>
            {isHome ? (
                <h1 className="logo">
                    {MY_NAME}
                </h1>
            ) : (
                <p className="logo">
                    <Link to="/" rel="home" title="Go back to the home page">
                        {MY_NAME}
                    </Link>
                </p>
            )}
            <ul id="menu" className="menu">
                <li className="item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="item">
                    <Link to="/portfolio">
                        Portfolio
                    </Link>
                </li>
                <li className="item">
                    <Link to="/blog">
                        Blog
                    </Link>
                </li>
				<li className="item">
					<Link to="/music">
						Music
					</Link>
				</li>
                <li className="item">
                    <Link to="/about">
                        About
                    </Link>
                </li>
            </ul>
        </StyledNav>
    );
}

SiteNav.propTypes = {
    isHome: PropTypes.bool
};

SiteNav.defaultProps = {
    isHome: false
};