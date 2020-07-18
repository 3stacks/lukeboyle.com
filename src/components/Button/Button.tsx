import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { CUSTOM_PROPERTIES } from '../../styled/colors';

function getButtonStyles({ isSecondary = false }) {
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
    padding: 0;
`;

export default styled.button<{ isSecondary: boolean }>`
    ${getButtonStyles}
`;

export const LinkButton = styled(Link)<{ isSecondary?: boolean }>`
    ${getButtonStyles}
`;
export const AnchorButton = styled.a<{ isSecondary?: boolean }>`
    ${getButtonStyles}
`;
export const ExternalLink = ({
    label,
    href,
    isSecondary
}: {
    label: string;
    href: string;
    isSecondary?: boolean;
}) => {
    return (
        <AnchorButton
            key={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link button primary"
            href={href}
            isSecondary={isSecondary}
        >
            {label}
        </AnchorButton>
    );
};
