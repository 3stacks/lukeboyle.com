export const getRouteFromSlug = (slug: string): string => {
	if (slug.includes('/portfolio')) {
		return 'portfolio';
	}

	if (slug.includes('/blog-posts')) {
		const slugParts = slug.split('/');

		return `blog-single ${slugParts[slugParts.length - 1]}`;
	}

	if (slug.includes('/blog')) {
		return 'blog';
	}

	if (slug === '/') {
		return 'home';
	}

	return slug.replace('/', '');
};
