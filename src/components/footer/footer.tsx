import React from 'react';
import MaxWidthContainer from '../../components/MaxWidthContainer';
import { StyledFooter } from './style';
import { FaYinYang } from 'react-icons/fa';

export default function Footer() {
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
}
