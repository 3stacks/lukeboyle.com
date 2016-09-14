<?php /* Template Name: Blog */ ?>
<?php get_header(); ?>
    <div class="blog-header">
        <h1 class="blog-header--site-name">
           Boyleing Point //Static//
        </h1>
        <p>
            7/11 was an inside job //static//
        </p>
        <div class="blog-header--menu">
            // extra menu //
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Music
                </li>
                <li>
                    Web Dev
                </li>
            </ul>
        </div>
    </div>
    <main id="main" class="site-main">
        <div class="max-width-container">
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
        </div>
    </main>

<?php get_footer(); ?>