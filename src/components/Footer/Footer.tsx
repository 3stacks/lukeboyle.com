import React from 'react';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledFooter } from './Footer.style';
import { FaYinYang } from 'react-icons/fa';

export const Footer = () => {
    return (
        <StyledFooter>
            <MaxWidthContainer className="inner">
                <small className="copyright">
                    &copy; Luke Boyle <FaYinYang /> 93 'til infinity
                </small>
                <a className="copyright" href="/sitemap.xml">
                    Sitemap
                </a>
            </MaxWidthContainer>
        </StyledFooter>
    );
};

export default Footer;
