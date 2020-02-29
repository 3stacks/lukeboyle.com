import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../styled/colors';

function getButtonStyles({ isSecondary }) {
    return css`
        display: inline-flex;
        align-items: center;
        ${isSecondary
            ? css`
                  color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
                  background-color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
                  border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
              `
            : css`
                  color: ${CUSTOM_PROPERTIES.COLOR_WHITE};
                  background-color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
                  border: none;
              `};

        padding: 10px 15px;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: bold;
        border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};

        &:hover,
        &:focus {
            color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY} !important;
            outline: none;
            background-color: #fff;
            border: 2px solid ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
            color: ${CUSTOM_PROPERTIES.COLOR_SECONDARY};

            @media screen and (prefers-reduced-motion: no-preference) {
                transform: translate(-3px, -3px);
                box-shadow: 4px 4px 0 0 ${CUSTOM_PROPERTIES.COLOR_SECONDARY};
            }
        }
    `;
}

export const BareButton = styled.button`
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
`;

export default styled.button`
    ${props => getButtonStyles(props)}
`;
export const LinkButton = styled(Link)`
    ${props => getButtonStyles(props)}
`;
export const AnchorButton = styled.a`
    ${props => getButtonStyles(props)}
`;
export const ExternalLink = ({
    label,
    href
}: {
    label: string;
    href: string;
}) => {
    return (
        <AnchorButton
            key={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link button primary"
            href={href}
        >
            {label}
        </AnchorButton>
    );
};
