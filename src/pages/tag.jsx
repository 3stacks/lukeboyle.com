import React from "react";
import Helmet from "react-helmet";

export default class Tag extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <Helmet>
                    <title>About | Luke Boyle</title>
                </Helmet>
                <div className="max-width-container blog">
                    if posts
                        <p className="blog-category">
                            Tagged: single_tag_title();
                        </p>
                        <article className="blog-post">
                            <header>
                                <h2 className="blog-post--title">
                                    echo the_title();
                                </h2>
                                <div className="blog-post--meta">
                                    <time datetime="<?php echo $post->post_date ?>">
                                        date('d F Y', strtotime($post->post_date));
                                    </time>
                                    <ul className="blog-post--meta--categories">
                                        $categories = wp_get_post_categories($post->ID);
                                        foreach ($categories as $category)
                                        <li>
                                            <a href="<?php echo get_category_link($category) ?>">
                                                echo get_the_category_by_ID($category);
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </header>
                            <div className="blog-post--content">
                                the_content()
                            </div>
                            <ul className="blog-post--tags">
                                foreach ($tags as $tag)
                                <li>
                                    <a href="get_tag_link($tag->term_id)">
                                        echo $tag->name
                                    </a>
                                </li>
                            </ul>
                        </article>
                        <div className="pagination">
                            <div className="pagination--previous">next_posts_link('Older'); </div>
                            <div className="pagination--next">previous_posts_link('Newer'); </div>
                        </div>
                    else
                        <p>
                            Sorry, no posts matched your criteria.
                        </p>
                    endif;
                </div>
            </div>
        )
    }
}
