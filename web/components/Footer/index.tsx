import React from 'react';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledFooter, FooterLinks } from './style';
import { FaYinYang } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
	return (
		<StyledFooter>
			<MaxWidthContainer className="inner">
				<small className="copyright">
					&copy; Luke Boyle <FaYinYang /> 93 'til infinity
				</small>
				<FooterLinks>
					<Link href="/privacy-policy">
						<a className="copyright">Privacy policy</a>
					</Link>
					<Link href="/sitemap.xml">
						<a className="copyright">Sitemap</a>
					</Link>
				</FooterLinks>
			</MaxWidthContainer>
		</StyledFooter>
	);
};

export default Footer;
