import React from 'react';
import sortBy from 'lodash/sortBy';
import { Wrapper } from './style';
import { IMetaData } from '../../../scripts/utils/blog';

interface IBlogPost {
	slug: string;
	path: string;
	title: string;
	content: string;
	metaData: IMetaData;
}

export interface IPostArchive {
	[year: string]: {
		[month: string]: IBlogPost[];
	};
}

export default function PostArchive({ data }: { data: IPostArchive }) {
	return (
		<Wrapper>
			{Object.entries(data)
				.reverse()
				.map(([year, months]) => {
					return (
						<details key={year}>
							<summary>{year}</summary>
							{Object.entries(months).map(([month, posts]) => {
								return (
									<details key={month}>
										<summary>{month}</summary>
										<ul>
											{sortBy(posts, [
												'metaData',
												'publishDate'
											])
												.reverse()
												.map(post => {
													const url = `/blog-posts/${year}/${month}/${post.slug}`;

													return (
														<li key={url}>
															<a href={url}>
																{post.title}
															</a>
														</li>
													);
												})}
										</ul>
									</details>
								);
							})}
						</details>
					);
				})}
		</Wrapper>
	);
}
