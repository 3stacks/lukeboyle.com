import * as React from 'react';
import { Avatar, Body, Meta, Tile } from './style';
import format from 'date-fns/format';

export const Post = ({
	postedDate,
	children
}: {
	postedDate: string;
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
			</Meta>
			<Body>{children}</Body>
		</Tile>
	);
};

export default Post;
