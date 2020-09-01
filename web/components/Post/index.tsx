import * as React from 'react';
import { Avatar, Body, Meta, Tile } from './style';
import { FaLink } from 'react-icons/fa';
import format from 'date-fns/format';
import Link from 'next/link';

export const Post = ({
	postedDate,
	guid,
	children
}: {
	postedDate: string;
	guid: string;
	children: React.ReactNode;
}) => {
	return (
		<Tile>
			<Avatar src="/images/avatar.jpg" alt="" />
			<Meta>
				<address>Luke Boyle</address>
				<span>&middot;</span>
				<time dateTime={postedDate}>
					{format(new Date(postedDate), 'DD MMM')}
				</time>
				<span>&middot;</span>
				<Link href={`/feed/${guid}`}>
					<a title="Go to post page">
						<FaLink />
					</a>
				</Link>
			</Meta>
			<Body>{children}</Body>
		</Tile>
	);
};

export default Post;
