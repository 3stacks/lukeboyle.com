import React from 'react';
import { MaxWidthContainer } from '../../styled/utils';
import { StyledBanner } from './HomeHeadBanner.style';

export const HomeHeadBanner = ({ children }) => {
    return (
        <StyledBanner>
            <MaxWidthContainer>{children}</MaxWidthContainer>
        </StyledBanner>
    );
};

export default HomeHeadBanner;
