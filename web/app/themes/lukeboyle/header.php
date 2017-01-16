<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="description" content="Luke Boyle is a Front End Developer from Melbourne, Australia. Specialising in JavaScript web applications, he has experience with Angular, React and Vue Js.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <script src="https://apis.google.com/js/client.js?onload=handleClientLoad" async></script>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/vendor.js" defer></script>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/bundle.js" defer></script>
    <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/style.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="76x76" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/apple-icon-152x152.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/favicon-32x32.png">
    <meta name="theme-color" content="#34495e">
    <meta name="google-site-verification" content="JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM" />
    <title>Luke Boyle | Front End Developer</title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <a class="skip-link screen-reader-text" href="#main">Skip to content</a>
    <header class="site-header">
        <div class="max-width-container">
            <div class="site-nav">
                <?php
                if ( is_front_page() && is_home() ) : ?>
                    <h1 class="site-nav--logo">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="Go back to home page">
                            Luke Boyle
                        </a>
                    </h1>
                <?php else : ?>
                    <p class="site-nav--logo">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="Go back to home page">
                            Luke Boyle
                        </a>
                    </p>
                <?php endif;
                    wp_nav_menu( array(
                        'menu' => 'primary',
                        'theme_location' => 'primary-menu',
                        'container' => false,
                        'menu_id' => 'menu'
                    ));
                ?>
            </div>
        </div>
    </header>
