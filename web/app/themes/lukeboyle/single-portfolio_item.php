<?php get_header(); ?>


<?php while ( have_posts() ) : the_post(); ?>
    <h1>
        <?php echo the_title(); ?>
    </h1>
    <?php $image = get_field('portfolio_image', $post->ID); ?>
    <a target="_blank" href="<?php echo $image['url']; ?>">
        <img src="<?php echo $image['sizes']['medium_large']; ?>" alt="<?php $image['alt'] ?>">
    </a>
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

<?php get_footer(); ?>
