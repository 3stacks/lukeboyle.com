import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="max-width-container">
                <div className="single-portfolio-item">
                    <h1 className="single-portfolio-item--title">
                        Spectrum </h1>
                    <div className="single-portfolio-item--content">
                        <p>
                            <img src="http://lukeboyle.com/app/uploads/2017/02/spectrum-thumbnail.png" alt="" width="453" height="346" className="alignnone size-full wp-image-460"/>
                        </p>
                        <p>Spectrum is a web-based editor for writing software specification documents. The app enables software architects to progressively define the functionality in their system allowing developers to begin implementing the specification sooner.</p>
                        <h3>Technology List</h3>
                        <ul>
                            <li>React</li>
                            <li>Webpack</li>
                            <li>Node.js</li>
                            <li>Prototyping Tools</li>
                        </ul>
                        <h3>Challenges</h3>
                        <p>One of the major challenges faced in this project was reimplementing the textbox to allow us to make complex data structures human readable. Along with displaying the complex data, users have to be able to select text, copy and paste text and control the cursor as they would in their operating system (cmd vs ctrl).</p>
                        <h3>Accomplishments</h3>
                        <p>Architected a file format that adhered to our application design goals while being valid Markdown. This meant I had to make a processor to generate a specfile from complex app data and conversely, a parser to generate app data at runtime.</p>
                        <p>The app provides spec authors with a rich WYSIWYG editor for the specfile that allows each screen, form, section or component to be written independently of other parts of the spec.</p>
                        <p>Special formatting is given to warnings, errors and other textual content that the implementors will need to take verbatim.</p>
                        <p>The editor also allows authors to insert special cross-links to other parts of the spec for quick reference and to reduce the amount of duplicated information. This allows for a single-source-of-truth for stakeholders to review and automatically propagates changes across the whole spec.</p>
                        <p>Spectrum offers special insights that management can use to better allocated resources on the project including generating an application-wide dependency visualisation to aid in human effort bottleneck prediction.</p>
                        <p>The application’s specfile format can also be version-tracked like any other text/code file for the ability to diff the file’s change history using already available tools – a unique feature among more common formats like Microsoft Word documents.</p>
                    </div>
                    <div className="single-portfolio-item--buttons">
                    </div>
                </div>
            </div>
        )
    }
}
