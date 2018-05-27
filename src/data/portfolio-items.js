import aganderSrc from '../assets/img/portfolio/thumbs/agander.jpg';
import broccoliSrc from '../assets/img/portfolio/thumbs/broccoli.png';
import jtSrc from '../assets/img/portfolio/thumbs/jt.jpg';
import pypesSrc from '../assets/img/portfolio/thumbs/pypes.png';
import spectrumSrc from '../assets/img/portfolio/thumbs/spectrum.png';
import splitSrc from '../assets/img/portfolio/thumbs/split.png';
import typeSrc from '../assets/img/portfolio/thumbs/type.png';
import vicesSrc from '../assets/img/portfolio/thumbs/vices.png';
import guesstimateSrc from '../assets/img/portfolio/thumbs/guesstimate.jpg';
import websiteSrc from '../assets/img/portfolio/thumbs/website.png';
import {PORTFOLIO_ITEM_NAMES} from '../constants';

export default [
    {
        name: PORTFOLIO_ITEM_NAMES.THIS_WEBSITE,
        snippet: 'A progressively enhancing static site with offline caching and a unique content version control system',
        link: '/portfolio/website/',
        thumb: websiteSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.GUESSTIMATE,
        snippet: 'Break your project up into easier to estimate chunks and total it for more accurate estimations',
        link: '/portfolio/guesstimate/',
        thumb: guesstimateSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.SPECTRUM,
        snippet: 'Spectrum is a web-based editor for writing software specification documents.',
        link: '/portfolio/spectrum/',
        thumb: spectrumSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.AGANDER,
        snippet: 'A productivity app aggregating calendar and tasks. Reduce the noise in your daily agenda.',
        link: '/portfolio/agander/',
        thumb: aganderSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.SPLIT_VISUALISER,
        snippet: 'A web-app for easily visualising and sharing the muscle engagement of your exercise routine.',
        link: '/portfolio/split-visualiser/',
        thumb: splitSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.JOURNEY_TREE,
        snippet: 'A multi-platform collection of social networking and business applications for childcare staff and parents.',
        link: '/portfolio/journey-tree/',
        thumb: jtSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.TYPE_WITH_APPS,
        snippet: 'A web-app for easily visualising and sharing the muscle engagement of your exercise routine.',
        link: '/portfolio/type-with-apps/',
        thumb: typeSrc
    },
    // {
    //     name: PORTFOLIO_ITEM_NAMES.BROCCOLI,
    //     snippet: 'A case study about the scalability and organisation of SPAs made in Angular 1.5 with comprehensive testing.',
    //     link: '/portfolio/broccoli-and-co/',
    //     thumb: broccoliSrc
    // },
    {
        name: PORTFOLIO_ITEM_NAMES.PYPES,
        snippet: 'A micro-blogging platform with a RESTful interface and an Angular admin panel.',
        link: '/portfolio/pypes/',
        thumb: pypesSrc
    },
    {
        name: PORTFOLIO_ITEM_NAMES.VICES,
        snippet: 'A micro-application designed to tell you how much money you\'re wasting on your bad habit.',
        link: '/portfolio/vices/',
        thumb: vicesSrc
    }
];