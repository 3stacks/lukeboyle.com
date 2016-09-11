<?php get_header(); ?>

<main id="main" class="site-main">

    <?php if ( have_posts() ) : ?>

        <?php if ( is_home() && ! is_front_page() ) : ?>
            <header>
                <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
            </header>
        <?php endif; ?>

        <?php
        // Start the loop.
        while ( have_posts() ) : the_post();

            /*
             * Include the Post-Format-specific template for the content.
             * If you want to override this in a child theme, then include a file
             * called content-___.php (where ___ is the Post Format name) and that will be used instead.
             */
            get_template_part( 'content', get_post_format() );

            // End the loop.
        endwhile;

    else :
        get_template_part( 'content', 'none' );

    endif;
    ?>
</main>

<?php get_footer(); ?>
