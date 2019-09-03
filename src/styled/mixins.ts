export const background = `
	background-color: #2E539B;
`;

export function bp(size, content) {
	return `
		@media (min-width: ${size}px) {
			${content}
		};
	`;
}
