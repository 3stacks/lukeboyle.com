import React from 'react';
import SiteNav from './site-nav.jsx';

export default function Header(props) {
    return (
        <header className="site-header">
            <div className="max-width-container">
                <SiteNav/>
            </div>
        </header>
    );
}