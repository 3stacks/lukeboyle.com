import React from "react";
import PropTypes from "prop-types";
// Images
import androidIcon from './assets/img/android-icon-192x192.png';
import appleSmall from './assets/img/apple-icon-76x76.png';
import appleMedium from './assets/img/apple-icon-120x120.png';
import appleLarge from './assets/img/apple-icon-152x152.png';
import favicon from './assets/img/favicon-32x32.png';

export default class HTML extends React.Component {

    static propTypes = {
        body: PropTypes.string,
    }

    render() {
        let css
        if (process.env.NODE_ENV === "production") {
            css = (
                <style
                    dangerouslySetInnerHTML={{
                        __html: require("!raw!../public/styles.css"),
                    }}
                />
            )
        }

        console.log(css);

        return (
            <html lang="en">
            <head>
                <script>
                    {"window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;"}
                    {"ga('create', 'UA-84326776-1', 'auto');"}
                    {"ga('send', 'pageview');"}
                </script>
                <script async src="https://www.google-analytics.com/analytics.js" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro" rel="stylesheet" />
                <link rel="apple-touch-icon" sizes="76x76" href={appleSmall} />
                <link rel="apple-touch-icon" sizes="120x120" href={appleMedium} />
                <link rel="apple-touch-icon" sizes="152x152" href={appleLarge} />
                <link rel="icon" type="image/png" sizes="192x192" href={androidIcon} />
                <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
                {this.props.headComponents}
                {css}
            </head>
            <body>
            <a className="skip-link screen-reader-text" href="#main">Skip to content</a>
            <div
                id="___gatsby"
                dangerouslySetInnerHTML={{ __html: this.props.body }}
            />
            {this.props.postBodyComponents}
            </body>
            </html>
        )
    }
}
