<?php get_header(); ?>

<main>
    <?php while ( have_posts() ) : the_post(); ?>
        <h1>
            <?php echo the_title(); ?>
        </h1>
        <?php echo get_field('portfolio_description', $post->ID); ?>
        <?php if (get_field('portfolio_repository_link', $post->ID) !== '') { ?>
            <a href="<?php echo get_field('portfolio_demo_site', $post->ID); ?>">
                View live site
            </a>
        <?php } ?>
        <?php if (get_field('portfolio_repository_link', $post->ID) !== '') { ?>
            <a href="<?php echo get_field('portfolio_repository_link', $post->ID); ?>">
                See repository
            </a>
        <?php } ?>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
