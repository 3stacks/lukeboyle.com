import React from 'react';
import styled from 'styled-components';
import COLORS from '../styled/colors';

const styles = `
	display: inline-flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PRIMARY};
	padding: 10px 15px;
	text-decoration: none;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	transition: transform 0.2s ease-out, background-color 0.3s ease-out, box-shadow 0.3s ease-out;
	text-transform: uppercase;
	font-size: 1.3rem;
	font-weight: bold;
	border-radius: 4px;
	
	&:hover,
	&:focus {
		background-color: ${COLORS.PRIMARY_GRADIENT_LIGHT};
		color: white;
		transform: translateY(-1px);
		box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
		outline: none;
	}
	
	${props => props.isSecondary && `
		background-color: white;
		color: $primary-color;
		
		&:hover,
		&:focus {
			background-color: #e9e9e9;
		}
		border: 1px solid white;
	`}
`;

export default styled.button`${styles}`;
export const LinkButton = styled.a`${styles}`;