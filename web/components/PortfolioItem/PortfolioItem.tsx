import React from 'react';
import { LinkButton } from '../Button';
import { IPortfolioItem } from '../../data/portfolio-items';
import { PortfolioPageItem } from './PortfolioItem.style';

export const PortfolioItem = ({
    id,
    shortName,
    name,
    snippet,
    link
}: IPortfolioItem) => (
    <PortfolioPageItem key={id}>
        <div className="card">
            <h2 className="title">{shortName ? shortName : name}</h2>
            <p>{snippet}</p>
            <LinkButton to={link}>Read More</LinkButton>
        </div>
    </PortfolioPageItem>
);

export default PortfolioItem;
