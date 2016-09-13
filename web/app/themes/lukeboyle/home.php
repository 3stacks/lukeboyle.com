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
            <?php if ( have_posts() ) : ?>
                <?php
                while ( have_posts() ) : the_post();
                    get_template_part( 'partials/content', get_post_format() );
                    ?>
                    <article class="blog-post">
                        <h1 class="blog-post--title">
                            Title
                        </h1>
                        <div class="blog-post--meta">
                            <time></time>
                        </div>
                    </article>
                    <?php
                endwhile;

            else :
                get_template_part( 'partials/content', 'none' );

            endif;
            ?>
        </div>
    </main>

<?php get_footer(); ?>