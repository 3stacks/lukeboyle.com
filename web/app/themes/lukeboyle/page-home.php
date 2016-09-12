<?php get_header(); ?>

<div class="home-head-banner">
    <h2 aria-hidden="true">
        Luke Boyle
    </h2>
    <p>
        Front End Developer
    </p>
    <p>
        Melbourne, AU.
    </p>
</div>
<main id="main" class="site-main">
    <?php if(get_field('home_technologies')) { ?>
        <div class="technologies-block">
            <div class="max-width-container">
                <h2 class="technologies-block--title">
                    Technologies
                </h2>
                <ul>
                    <?php foreach (get_field('home_technologies') as $item) { ?>
                        <li>
                            <?php echo $item['technology']; ?>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    <?php } ?>
    <?php if(get_field('home_featured_project')) { ?>
        <div class="latest-project-block">
            <h2 class="latest-project-block--title">
                Latest Project
            </h2>
            <?php $project = get_field('home_featured_project'); ?>
            <h3>
                <?php echo $project->post_title; ?>
            </h3>
            <?php echo get_field('portfolio_snippet', $project->ID); ?>
        </div>
    <?php } ?>
    <?php if(get_field('home_npm_packages')) { ?>
        <div class="npm-packages-block">
            <h2>
                NPM Packages
            </h2>
            <ul>
                <?php foreach (get_field('home_npm_packages') as $item) { ?>
                    <li>
                        <a href="<?php echo $item['link'] ?>">
                            <?php echo $item['name']; ?>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    <?php } ?>
    <?php if(get_field('home_featured_blog_post')) { ?>
        <div class="featured-blog-post-block">
            <?php $post = get_field('home_featured_blog_post'); ?>
            <h2>
                Featured Blog Post
            </h2>
            <p>
                <?php echo $post->post_title ?>
            </p>
            <?php
                echo get_the_post_thumbnail($post->ID, 'medium');
            ?>
        </div>
    <?php } ?>
</main>

<?php get_footer(); ?>
