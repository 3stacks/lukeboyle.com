import * as React from 'react';
import Link from 'next/link';
import { AnchorButton } from '../Button';
import { IPortfolioItem } from '../../data/portfolio-items';
import { PortfolioPageItem } from './style';

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
			<Link href={link}>
				<AnchorButton href={link}>Read More</AnchorButton>
			</Link>
		</div>
	</PortfolioPageItem>
);

export default PortfolioItem;
