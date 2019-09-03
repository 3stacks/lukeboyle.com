import React from 'react';
import { MaxWidthContainer } from '../../styled/utils';
import { StyledFooter } from './style';

export default function Footer() {
    return (
        <StyledFooter>
            <MaxWidthContainer className="inner">
                <small className="copyright">
                    &copy; Luke Boyle 93' til infinity
                </small>
                <a className="copyright" href="/sitemap.xml">
                    Sitemap
                </a>
            </MaxWidthContainer>
        </StyledFooter>
    );
}
