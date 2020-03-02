import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';
import { bp } from '../../styled/mixins';
import { WIDTHS } from '../../styled/sizes';

export const BlogHeader = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
    position: relative;
    background-color: ${CUSTOM_PROPERTIES.COLOR_PRIMARY};
    ${bp(
        WIDTHS.S,
        css`
            margin-top: -60px;
            margin-bottom: 0;
            padding-top: 60px;
        `
    )}
    ${bp(
        600,
        css`
            padding-top: 150px;
        `
    )}
    ${bp(
        WIDTHS.M,
        css`
            padding-top: 60px;
            height: 300px;
        `
    )}
		& .site-name {
        font-size: 4rem;
        margin: 0 0 30px;

        ${bp(
            WIDTHS.M,
            css`
                font-size: 5rem;
            `
        )}
    }

    & .description {
        font-size: 2rem;
    }
`;

export default BlogHeader;
