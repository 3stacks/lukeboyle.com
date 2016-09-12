<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/vendor.js" defer></script>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/bundle.js" defer></script>
    <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/style.css">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <a class="skip-link screen-reader-text" href="#main">Skip to content</a>
    <header class="site-header">
        <div class="max-width-container">
            <div class="site-nav">
                <?php

                if ( is_front_page() && is_home() ) : ?>
                    <h1 class="site-nav--logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <?php else : ?>
                    <p class="site-nav--logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
                <?php endif;
                wp_nav_menu( array(
                    'theme_location' => 'primary-menu',
                    'container' => false,
                    'menu_id' => 'menu'
                ));
                ?>
            </div>
        </div>
    </header>