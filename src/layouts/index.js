import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import '../assets/sass/style.scss';
import {META_DESCRIPTION, MY_NAME} from "../constants";

export default class Template extends React.Component {
    render() {

        return (
            <div className={`layout ${this.props.location.pathname.split('/').join('')}`}>
                <Helmet
                    title={`${MY_NAME} | Front End Developer`}
                    meta={[
                        {
                            name: "description",
                            content: META_DESCRIPTION.HOME
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
                <Header />
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
