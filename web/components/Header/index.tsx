import * as React from 'react';
import Link from 'next/link';
import { MY_NAME } from '../../constants';
import { routes } from '../../data';
import MaxWidthContainer from '../MaxWidthContainer';
import { StyledHeader, StyledNav } from './style';

export const Header = ({
	isHome = false,
	slug
}: {
	isHome: boolean;
	slug: string;
}) => {
	return (
		<StyledHeader>
			<MaxWidthContainer style={{ height: '100%' }}>
				<StyledNav>
					{isHome ? (
						<h1 className="logo">{MY_NAME}</h1>
					) : (
						<p className="logo">
							<Link href="/">
								<a rel="home" title="Go back to the home page">
									{MY_NAME}
								</a>
							</Link>
						</p>
					)}
					<ul id="menu" className="menu">
						{routes.map(route => {
							const isHome = route.slug === 'home';

							return (
								<li
									key={route.link}
									className={
										slug === route.slug
											? 'item is-active'
											: 'item'
									}
								>
									<Link href={route.link}>
										<a
											aria-label={
												isHome
													? 'Go back to homepage'
													: undefined
											}
											tabIndex={0}
										>
											{route.text}
										</a>
									</Link>
								</li>
							);
						})}
					</ul>
				</StyledNav>
			</MaxWidthContainer>
		</StyledHeader>
	);
};

export default Header;
