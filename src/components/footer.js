import React from 'react';
import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import COLORS from '../styled/colors';
import {bp, background, topTriangle,} from '../styled/mixins';
import {MaxWidthContainer} from '../styled/utils';

const StyledFooter = styled.div`
    ${background}
    ${topTriangle}
    background-color: ${COLORS.PRIMARY};
    height: 80px;
    
    ${bp(WIDTHS.M, `
        height: 150px;
        
        &:before {
            transform: translateY(-50px);
        }  
    `)}

    &.inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        font-size: 1.4rem;
    
        a {
            color: rgba(white, 0.7);
        
            &:hover {
                color: white;
            }
        }
    }
    
    &.copyright {
        color: rgba(white, 0.7);
        font-size: 1.4rem;
    }
}
`;

export default function Footer({...otherProps}) {
    return (
        <StyledFooter>
            <MaxWidthContainer className="inner max-width-container">
                <small className="copyright">
                    &copy; Luke Boyle 93' til infinity
                </small>
            </MaxWidthContainer>
        </StyledFooter>
    );
}