import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { Wrapper } from './style';

export default function PostArchive({ data }) {
    return (
        <Wrapper>
            <Accordion allowZeroExpanded>
                {Object.entries(data)
                    .reverse()
                    .map(([year, months]) => {
                        return (
                            <AccordionItem key={year}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {year}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <Accordion>
                                        {Object.entries(months).map(
                                            ([month, posts]) => {
                                                return (
                                                    <AccordionItem key={month}>
                                                        <AccordionItemHeading>
                                                            <AccordionItemButton>
                                                                {month}
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel>
                                                            <ul>
                                                                {posts.map(
                                                                    post => {
                                                                        const url = `/blog-posts/${year}/${month}/${post.slug}`;

                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    url
                                                                                }
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        url
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        post.title
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                            </ul>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                );
                                            }
                                        )}
                                    </Accordion>
                                </AccordionItemPanel>
                            </AccordionItem>
                        );
                    })}
            </Accordion>
        </Wrapper>
    );
}
