<?php get_header(); ?>

<main id="main" class="site-main">
    <div class="max-width-container">
        <?php $posts = get_posts(array('post_type' => 'portfolio_item')); ?>
        <div class="portfolio">
            <div class="portfolio--item" style="background-image: url(<?php echo get_field('portfolio_image', $post->ID)['sizes']['medium'] ?>);">
                <div class="portfolio--item--inner">
                    <h2 class="portfolio--item--title">
                        <?php echo $post->post_title ?>
                    </h2>
                    <?php echo get_field('portfolio_snippet', $post->ID) ?>
                    <a class="portfolio--item--link" href="<?php echo 'portfolio-' . generateUrlHandle($post->post_title); ?>">
                        Read More
                    </a>
                    <?php echo get_field('portfolio_demo_site', $post->ID) ?>
                </div>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
