<?php get_header(); ?>

<?php while ( have_posts() ) : the_post(); ?>
    <article class="blog-post">
        <header>
            <h1 class="blog-post--title">
                <?php echo the_title(); ?>
            </h1>
            <div class="blog-post--meta">
                <time datetime=""></time>
                <ul class="blog-post--meta--categories">
                    <li>
                        Web Dev //static
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

<?php get_footer(); ?>