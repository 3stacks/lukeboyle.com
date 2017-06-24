import React from 'react';

export default function ComponentName(props) {
    return (
        <div className="site-nav">
            {/*if it is homepage*/}
            <h1 className="site-nav--logo">
                <a href="/" rel="home" title="Go back to home page">
                    Luke Boyle
                </a>
            </h1>
            {/*else*/}
            <p className="site-nav--logo">
                <a href="/" rel="home" title="Go back to home page">
                    Luke Boyle
                </a>
            </p>
            {/*wp_nav_menu( array(*/}
            {/*'menu' => 'primary',*/}
            {/*'theme_location' => 'primary-menu',*/}
            {/*'container' => false,*/}
            {/*'menu_id' => 'menu'*/}
            {/*));*/}
        </div>
    );
}