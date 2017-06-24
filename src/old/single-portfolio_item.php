<?php get_header(); ?>

<main>
    <div class="max-width-container">
        <?php while ( have_posts() ) : the_post(); ?>
            <div class="single-portfolio-item">
                <h1 class="single-portfolio-item--title">
                    <?php echo the_title(); ?>
                </h1>
                <div class="single-portfolio-item--content">
                    <?php echo get_field('portfolio_description', $post->ID); ?>
                </div>
                <div class="single-portfolio-item--buttons">
                    <?php if (get_field('portfolio_repository_link', $post->ID) !== '') : ?>
                        <a target="_blank" class="single-portfolio-item--link button primary" href="<?php echo get_field('portfolio_demo_site', $post->ID); ?>">
                            View live site
                        </a>
                    <?php endif; ?>
                    <?php if (get_field('portfolio_repository_link', $post->ID) !== '') : ?>
                        <a target="_blank" class="single-portfolio-item--link button primary" href="<?php echo get_field('portfolio_repository_link', $post->ID); ?>">
                            See repository
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
