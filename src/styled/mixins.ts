export function bp(size, content) {
	return `
		@media (min-width: ${size}px) {
			${content}
		};
	`;
}
