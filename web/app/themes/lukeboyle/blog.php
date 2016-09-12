<?php /* Template Name: Blog */ ?>
<?php get_header(); ?>

    <main id="main" class="site-main">
        <div class="max-width-container">
            <?php if ( have_posts() ) : ?>
                <?php
                while ( have_posts() ) : the_post();

                    get_template_part( 'content', get_post_format() );
                    // End the loop.
                endwhile;

            else :
                get_template_part( 'content', 'none' );

            endif;
            ?>
        </div>
    </main>

<?php get_footer(); ?>