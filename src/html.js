import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import androidIcon from './assets/img/android-icon-192x192.png';
import appleSmall from './assets/img/apple-icon-76x76.png';
import appleMedium from './assets/img/apple-icon-120x120.png';
import appleLarge from './assets/img/apple-icon-152x152.png';
import favicon from './assets/img/favicon-32x32.png';

let stylesStr;

if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('../public/styles.css');
  } catch (e) {
    console.log(e);
  }
}

export default class Html extends Component {
  render() {
    let css
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          {this.props.headComponents}

          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Gatsby example site demoing sass plugin"
          />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Source+Sans+Pro" rel="stylesheet" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="apple-touch-icon" sizes="76x76" href={appleSmall} />
          <link rel="apple-touch-icon" sizes="120x120" href={appleMedium} />
          <link rel="apple-touch-icon" sizes="152x152" href={appleLarge} />
          <link rel="icon" type="image/png" sizes="192x192" href={androidIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
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

Html.propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
};
