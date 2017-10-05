import React from "react";
import PropTypes from "prop-types";
// Images


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
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {this.props.headComponents}
                {css}
            </head>
            <body>
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
