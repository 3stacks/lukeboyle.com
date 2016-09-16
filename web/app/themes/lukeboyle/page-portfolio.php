<?php get_header(); ?>

<main id="main" class="site-main">
    <div class="max-width-container">
        <?php $posts = get_posts(array('post_type' => 'portfolio_item')); ?>
        <div class="portfolio">
            <?php foreach ($posts as $post) { ?>
                <div class="portfolio--item">
                    <div class="portfolio--item--image">
                        <img src="<?php echo get_field('portfolio_image', $post->ID)['sizes']['medium'] ?>" alt="<?php echo get_field('portfolio_image', $post->ID)['alt'] ?>">
                    </div>
                    <div class="portfolio--item--card">
                        <h2 class="portfolio--item--card--title">
                            <?php echo $post->post_title ?>
                        </h2>
                        <?php echo get_field('portfolio_snippet', $post->ID);  ?>
                        <a class="portfolio--item--card--link button primary" href="<?php echo $post->guid ?>">
                            Read More
                        </a>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>
