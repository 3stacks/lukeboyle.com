import styled from 'styled-components';
import WIDTHS from '../styled/widths';
import { bp, background, bottomTriangle } from '../styled/mixins';

export default styled.div`
	${background}
	
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: white;
	position: relative;

	${bottomTriangle}
	
	${bp(
		WIDTHS.S,
		`
		margin-top: -60px;
		margin-bottom: 60px;
		padding-top: 60px;
	`
	)}
	
	${bp(
		WIDTHS.M,
		`
		height: 300px;
	`
	)}

	& .site-name {
		font-size: 4rem;
		margin: 0 0 30px;
		
		${bp(
			WIDTHS.M,
			`
			font-size: 5rem;
		`
		)}
	}
	
	& .description {
		font-size: 2rem;
	}
	
`;
