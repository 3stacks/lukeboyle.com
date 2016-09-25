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
    <div class="max-width-container">
        <?php if(get_field('home_featured_project')) { ?>
            <div class="latest-project-block">
                <h2 class="latest-project-block--title">
                    Latest Project
                </h2>
                <div class="latest-project-block--project">
                    <?php $project = get_field('home_featured_project'); ?>
                    <h3 class="latest-project-block--project--title">
                        <?php echo $project->post_title; ?>
                    </h3>
                    <div class="latest-project-block--project--snippet">
                        <?php echo get_field('portfolio_snippet', $project->ID); ?>
                    </div>
                    <a class="button primary" href="<?php get_permalink($project->ID); ?>">
                        Read More
                    </a>
                </div>
            </div>
        <?php } ?>
        <?php if(get_field('home_npm_packages')) { ?>
            <div class="npm-packages-block">
                <h2 class="npm-packages-block--title">
                    Open Source
                </h2>
                <p class="npm-packages-block--text">
                    I'm an advocate for open source. All of my projects are under the MIT license.
                    You can find some of my work on NPM (below).
                </p>
                <ul>
                    <?php foreach (get_field('home_npm_packages') as $item) { ?>
                        <li>
                            <a href="<?php echo $item['link'] ?>" target="_blank" title="Find '<?php echo $item['name']; ?>' package on NPM">
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
                <h2 class="featured-blog-post-block--title">
                    Featured Blog Post
                </h2>
                <p class="featured-blog-post-block--post-name">
                    <?php echo $post->post_title; ?>
                </p>
                <div class="featured-blog-post-block--post-image">
                    <?php echo get_the_post_thumbnail($post->ID, 'medium'); ?>
                </div>
                <p>
                    <a class="button primary" href="<?php echo get_permalink($post->ID); ?>">
                        Read more
                    </a>
                </p>
            </div>
        <?php } ?>
    </div>
</main>

<?php get_footer(); ?>
