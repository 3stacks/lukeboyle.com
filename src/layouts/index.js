import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import '../assets/sass/style.scss';

export default class Template extends React.Component {
    render() {
        return (
            <div className="layout">
                <Helmet
                    title="Luke Boyle | Front End Developer"
                    meta={[
                        {
                            name: "description",
                            content: "Luke Boyle is a Front End Developer from Melbourne, Australia. Specialising in JavaScript web applications, he has experience with Angular, React and Vue Js."
                        },
                        {
                            name: 'theme-color',
                            content: '#34495e'
                        },
                        {
                            name: 'google-site-verification',
                            content: 'JKQQdLNK9rQUZnixIsfEuJALcEcfPp9_ee2grLgOVGM'
                        }
                    ]}
                />
                <Header/>
                <main className="site-main">
                    {this.props.children()}
                </main>
                <Footer/>
            </div>
        )
    }
}

Template.propTypes = {
    children: PropTypes.func,
};
