import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { FaChevronDown } from 'react-icons/fa';
import { Wrapper } from './style';
import styled from 'styled-components';

const AccordionButton = styled.div<{ level: number }>`
    padding-left: ${({ level }) => level * 20}px;
`;

export default function PostArchive({ data }) {
    return (
        <Wrapper>
            <Accordion allowZeroExpanded>
                {Object.entries(data)
                    .reverse()
                    .map(([year, months], index) => {
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
                                                                <FaChevronDown />{' '}
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
