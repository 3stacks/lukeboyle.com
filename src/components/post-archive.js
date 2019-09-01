import React from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import styled from 'styled-components';

const Wrapper = styled.div`
	font-size: 1.5rem;

	.accordion__item + .accordion__item {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.accordion__button {
		background-color: #fff;
		color: #444;
		cursor: pointer;
		padding: 18px;
		width: 100%;
		text-align: left;
		border: none;
	}

	.accordion__button:hover {
		background-color: #f4f4f4;
	}

	.accordion__button:before {
		display: inline-block;
		content: '';
		height: 7px;
		width: 7px;
		margin-right: 12px;
		border-bottom: 2px solid currentColor;
		border-right: 2px solid currentColor;
		transform: rotate(-45deg);
	}

	.accordion__button[aria-expanded='true']::before,
	.accordion__button[aria-selected='true']::before {
		transform: rotate(45deg);
	}

	.accordion__panel {
		padding-left: 20px;
		animation: fadein 0.35s ease-in;
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}
	
		100% {
			opacity: 1;
		}
	}
`;

export default function PostArchive({data}) {
	return (
		<Wrapper>
			<Accordion allowZeroExpanded>
				{Object.entries(data).reverse().map(([year, months]) => {
					return (
						<AccordionItem key={year}>
							<AccordionItemHeading>
								<AccordionItemButton>
									{year}
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<Accordion>
									{Object.entries(months).map(([month, posts]) => {
										return (
											<AccordionItem key={month}>
												<AccordionItemHeading>
													<AccordionItemButton>
														{month}
													</AccordionItemButton>
												</AccordionItemHeading>
												<AccordionItemPanel>
													<ul>
														{posts.map(post => {
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
												</AccordionItemPanel>
											</AccordionItem>
										)
									})}
								</Accordion>
							</AccordionItemPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Wrapper>
	)
}