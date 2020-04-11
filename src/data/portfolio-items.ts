import { PORTFOLIO_ITEM_NAMES } from '../constants';

export interface IPortfolioItem {
	name: PORTFOLIO_ITEM_NAMES;
	id: string;
	shortName?: string;
	snippet: string;
	link: string;
	links: { href: string; label: string }[];
}

export default [
	{
		name: PORTFOLIO_ITEM_NAMES.UNDERWRITING_RULES_ENGINE,
		id: '1',
		shortName: 'MLC URE',
		snippet:
			'The Underwriting Rules Engine is a product used to accurately underwrite life insurance applications',
		link: '/portfolio/underwriting-rules-engine/',
		links: []
	},
	{
		name: PORTFOLIO_ITEM_NAMES.GUESSTIMATE,
		id: '2',
		snippet:
			'Break your project up into easier to estimate chunks and total it for more accurate estimations',
		link: '/portfolio/guesstimate/',
		links: [
			{
				label: 'View live site',
				href: 'https://guesstimate.io/'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.SPECTRUM,
		id: '3',
		snippet:
			'Spectrum is a web-based editor for writing software specification documents.',
		link: '/portfolio/spectrum/',
		links: [
			{
				label: 'Try the beta',
				href: 'https://spectrum-app.io/'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.DEBT_DESTROYER,
		id: '4',
		snippet:
			'Simulate how long it will take to pay off your debts with support for multiple debts.',
		link: '/portfolio/debt-destroyer/',
		links: [
			{
				label: 'View live site',
				href: 'https://debtdestroyer.io/'
			},
			{
				label: 'See repository',
				href: 'https://github.com/3stacks/debt-destroyer'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.THIS_WEBSITE,
		id: '5',
		snippet:
			'A progressively enhancing static site with offline caching and a unique content version control system',
		link: '/portfolio/this-website/',
		links: [
			{
				label: 'See repository',
				href: 'https://github.com/3stacks/portfolio-2016'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.AGANDER,
		id: '6',
		snippet:
			'A productivity app aggregating calendar and tasks. Reduce the noise in your daily agenda.',
		link: '/portfolio/agander/',
		links: [
			{
				label: 'View live site',
				href: 'https://agander.io/'
			},
			{
				label: 'See repository',
				href: 'https://github.com/3stacks/agander'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.SPLIT_VISUALISER,
		id: '7',
		snippet:
			'A web-app for easily visualising and sharing the muscle engagement of your exercise routine.',
		link: '/portfolio/split-visualiser/',
		links: [
			{
				label: 'View live site',
				href: 'https://splitviz.io/'
			},
			{
				label: 'See repository',
				href: 'https://github.com/stak-digital/split-visualiser'
			}
		]
	},
	{
		name: PORTFOLIO_ITEM_NAMES.VICES,
		id: '8',
		snippet:
			"A micro-application designed to tell you how much money you're wasting on your bad habit.",
		link: '/portfolio/vices/',
		links: [
			{
				label: 'View live site',
				href: 'https://vices.me/'
			},
			{
				label: 'See repository',
				href: 'https://github.com/3stacks/vices'
			}
		]
	}
];
