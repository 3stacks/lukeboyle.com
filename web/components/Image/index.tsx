import * as React from 'react';

interface IProps {
	src: string;
	alt: string;
	identifier?: string;
}

export const Image = ({ src, alt, identifier = '' }: IProps) => {
	const [mounted, setMounted] = React.useState<boolean>(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return <img src={src} alt={alt} data-identifier={identifier} />;
};

export default Image;
