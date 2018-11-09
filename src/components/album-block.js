import styled from 'styled-components';
import {bp} from '../styled/mixins';
import WIDTHS from '../styled/widths';

export default styled.div`
	display: grid;
  	grid-template-rows: auto;
	grid-template-areas: 
		"c"
		"a"
		"b"
		"d";
	margin-bottom: 50px;
	align-items: center;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	overflow: hidden;
	
	${bp(460, `
		grid-template-columns: 3fr 1fr;
		align-items: center;
		grid-template-areas: 
			"a c"
			"b c"
			"d d";
	`)}
		
	.title {
		grid-area: b;
		font-size: 2.8rem;
		margin-bottom: 20px;
	
		${bp(460, `
			margin: 0 0 auto;
		`)}
	}
	
	.artist {
		grid-area: a;
		font-size: 2rem;
		margin: auto 0 0;
	}
	
	img {
		grid-area: c;
		margin-bottom: 20px;
		width: 100%;
	
		${bp(460, `
			width: auto;
			margin-bottom: 0;
			align-self: stretch;
		`)}
	}
	
	.snippet {
		grid-area: d;
		padding: 20px;	
	}
`;