import * as React from 'react';
import Link from 'next/link';
import { Root } from './style';

interface IProps {
	pageNumber: number;
	pageCount: number;
}

export const Pagination = ({ pageNumber, pageCount }: IProps) => {
	const pages = new Array(pageCount).fill(true);

	return (
		<Root>
			{pageNumber > 0 && (
				<li>
					<Link
						href={
							pageNumber === 1
								? '/blog'
								: `/blog/${pageNumber - 1}`
						}
					>
						<a title="Previous page">&lt;</a>
					</Link>
				</li>
			)}
			{pages.map((_, index) => (
				<li key={index}>
					<Link href={index === 0 ? '/blog' : `/blog/${index}`}>
						<a className={index === pageNumber ? 'is-active' : ''}>
							{index}
						</a>
					</Link>
				</li>
			))}
			{pageNumber !== pages.length - 1 && (
				<li>
					<Link href={`/blog/${pageNumber + 1}`}>
						<a title="Next page">&gt;</a>
					</Link>
				</li>
			)}
		</Root>
	);
};

export default Pagination;
