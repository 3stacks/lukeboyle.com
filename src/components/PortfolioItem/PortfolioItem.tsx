import { LinkButton } from '../button';
import React from 'react';
import { IPortfolioItem } from '../../data/portfolio-items';
import { PortfolioPageItem } from './PortfolioItem.style';

export const PortfolioItem = ({
    id,
    thumb,
    shortName,
    name,
    snippet,
    link
}: IPortfolioItem) => (
    <PortfolioPageItem key={id}>
        <div
            className="image"
            style={{
                backgroundImage: `url(${thumb})`
            }}
        />
        <div className="card">
            <h2 className="title">{shortName ? shortName : name}</h2>
            <p>{snippet}</p>
            <LinkButton to={link}>Read More</LinkButton>
        </div>
    </PortfolioPageItem>
);

export default PortfolioItem;
