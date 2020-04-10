export function getCanonicalURLFromString(someString: string): string {
	const canonicalUrlIndex = someString.indexOf('canonical');

	if (canonicalUrlIndex < 0) {
		return null;
	}

	const almostCanonicalUrl = someString.slice(canonicalUrlIndex + 12);

	return (
		almostCanonicalUrl.slice(0, almostCanonicalUrl.indexOf('|')).trim() ||
		''
	);
}
