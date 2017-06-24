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
            <p class="blog-category">
                Tagged: <?php echo single_tag_title(); ?>
            </p>
            <?php if (have_posts()) : ?>
                <?php while ( have_posts() ) : the_post(); ?>
                    <article class="blog-post">
                        <header>
                            <h2 class="blog-post--title">
                                <?php echo the_title(); ?>
                            </h2>
                            <div class="blog-post--meta">
                                <time datetime="<?php echo $post->post_date ?>">
                                    <?php echo date('d F Y', strtotime($post->post_date)); ?>
                                </time>
                                <ul class="blog-post--meta--categories">
                                    <?php $categories = wp_get_post_categories($post->ID); ?>
                                    <?php foreach ($categories as $category) { ?>
                                        <li>
                                            <a href="<?php echo get_category_link($category) ?>">
                                                <?php echo get_the_category_by_ID($category); ?>
                                            </a>
                                        </li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </header>
                        <div class="blog-post--content">
                            <?php the_content() ?>
                        </div>
                        <ul class="blog-post--tags">
                            <?php $tags = wp_get_post_tags($post->ID); ?>
                            <?php if (!!$tags) { echo 'Filed under:'; } ?>
                            <?php foreach ($tags as $tag) { ?>
                                <li>
                                    <a href="<?php echo get_tag_link($tag->term_id) ?>">
                                        <?php echo $tag->name ?>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </article>
                <?php endwhile; ?>
                <div class="pagination">
                    <div class="pagination--previous"><?php next_posts_link('Older'); ?></div>
                    <div class="pagination--next"><?php previous_posts_link('Newer'); ?></div>
                </div>
            <?php else : ?>
                <p>
                    Sorry, no posts matched your criteria.
                </p>
            <?php endif; ?>
        </div>
    </main>

<?php get_footer(); ?>