import safeGet from 'lodash/get';
import { IPostArchive } from '../PostArchive/PostArchive';

export const getPostArchiveFromBlogPosts = (blogPosts): IPostArchive => {
	return blogPosts.reduce((acc, post) => {
		const pathParts = post.path.replace('blog-posts/', '').split('/');
		const year = pathParts[0];
		const month = pathParts[1];

		return {
			...acc,
			[year]: {
				...acc[year],
				[month]: [
					...safeGet(acc, [year, month], []),
					{
						slug: post.slug,
						path: post.path,
						title: post.metaData.post_title
					}
				]
			}
		};
	}, {});
};
