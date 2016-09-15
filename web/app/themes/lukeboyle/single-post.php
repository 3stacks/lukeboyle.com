<?php get_header(); ?>
    <div class="blog-header">
        <h1 class="blog-header--site-name">
            <?php bloginfo('name'); ?>
        </h1>
        <p class="blog-header--description">
            <?php bloginfo('description'); ?>
        </p>
        <ul class="blog-header--menu">
            <?php wp_list_categories(array('title_li' => '')) ?>
        </ul>
    </div>
    <main id="main" class="site-main">
        <div class="max-width-container blog">
            <?php while ( have_posts() ) : the_post(); ?>
                <article class="blog-post">
                    <header>
                        <h1 class="blog-post--title">
                            <?php echo the_title(); ?>
                        </h1>
                        <div class="blog-post--meta">
                            <time datetime="<?php echo $post->post_date ?>">
                                <?php echo $post->post_date ?>
                            </time>
                            <ul class="blog-post--meta--categories">
                                <li>
                                    <?php wp_get_post_categories($post->ID); ?>
                                </li>
                            </ul>
                            <ul class="blog-post--meta--tags">
                                <li>
                                    React //static
                                </li>
                            </ul>
                        </div>
                    </header>
                    <div class="blog-post--content">
                        <?php the_content() ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    </main>

<?php get_footer(); ?>