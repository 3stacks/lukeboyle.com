import axios, { AxiosResponse } from 'axios';

interface ILastFMImage {
	size: 'small' | 'medium' | 'large' | 'extralarge';
	text: string;
}

export interface ILastFMArtist {
	'@attr': {
		rank: string;
	};
	mbid: string;
	url: string;
	playcount: string;
	image: ILastFMImage[];
	name: string;
	streamable: string;
}

export interface ILastFMTopArtistResponse {
	topartists: {
		artist: ILastFMArtist[];
	};
}

export interface ILastFMAlbum {
	artist: Partial<ILastFMArtist>;
	'@attr': {
		rank: string;
	};
	image: ILastFMImage[];
	playcount: string;
	url: string;
	name: string;
	mbid: string;
}

export interface ILastFMTopAlbumResponse {
	topalbums: {
		album: ILastFMAlbum[];
	};
}

export interface IDiscogsLabel {
	name: string;
	entity_type: string;
	catno: string;
	resource_url: string;
	id: number;
	entity_type_name: string;
}

export interface IDiscogsArtist {
	join: string;
	name: string;
	anv: string;
	tracks: string;
	role: string;
	resource_url: string;
	id: number;
}

export interface IDiscogsFormat {
	descriptions: string[];
	name: string;
	qty: string;
	text: string;
}

export interface IDiscogsReleaseVideo {
	duration: number;
	description: string;
	embed: boolean;
	uri: string;
	title: string;
}

export interface IDiscogsContributor {
	username: string;
	resource_url: string;
}

export interface IDiscogsRelease {
	styles: string[];
	videos: IDiscogsReleaseVideo[];
	series: any[];
	labels: IDiscogsLabel[];
	year: number;
	community: {
		status: 'Accepted' | string;
		rating: {
			count: number;
			average: number;
		};
		have: number;
		contributors: {
			username: string;
			resource_url: string;
		}[];
		want: number;
		submitter: IDiscogsContributor;
		data_quality: 'Needs Vote' | string;
	};
	artists: IDiscogsArtist[];
	images: {
		uri: string;
		height: number;
		width: number;
		resource_url: string;
		type: string;
		uri150: string;
	}[];
	format_quantity: number;
	id: number;
	artists_sort: string;
	genres: string[];
	thumb: string;
	num_for_sale: number;
	title: string;
	date_changed: string;
	master_id: number;
	lowest_price: number;
	status: string;
	released_formatted: string;
	estimated_weight: number;
	master_url: string;
	released: string;
	date_added: string;
	tracklist: {
		duration: string;
		position: string;
		type_: string;
		title: string;
	}[];
	extraartists: IDiscogsArtist[];
	country: string;
	notes: string;
	identifiers: {
		type: 'Barcode' | 'Matrix / Runout';
		description: string;
		value: string;
	}[];
	companies: IDiscogsLabel[];
	uri: 'https://www.discogs.com/Danger-Doom-The-Mouse-And-The-Mask/release/10229848';
	formats: IDiscogsFormat[];
	resource_url: string;
	data_quality: string;
}

export interface IDiscogsCollectionResponse {
	pagination: {
		per_page: number;
		items: number;
		page: number;
		urls: {
			last: string;
			next: string;
		};
		pages: number;
	};
	releases: {
		instance_id: number;
		date_added: string;
		basic_information: {
			labels: IDiscogsLabel[];
			year: number;
			master_url: string;
			artists: IDiscogsArtist[];
			id: number;
			thumb: string;
			title: string;
			formats: Partial<IDiscogsFormat>[];
			cover_image: string;
			resource_url: string;
			master_id: number;
		};
		id: number;
		rating: number;
	}[];
}

export async function getTopAlbums(apiKey: string): Promise<ILastFMAlbum[]> {
	const response: AxiosResponse<ILastFMTopAlbumResponse> = await axios.get(
		`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=12&user=lookboil&api_key=${apiKey}&format=json`
	);

	return response.data.topalbums.album;
}

export async function getTopArtists(apiKey: string): Promise<ILastFMArtist[]> {
	const response: AxiosResponse<ILastFMTopArtistResponse> = await axios.get(
		`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=8&period=1month&user=lookboil&api_key=${apiKey}&format=json`
	);

	return response.data.topartists.artist;
}

function sleep(time: number): Promise<any> {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

export async function getDiscogsCollectionItems(
	apiKey: string
): Promise<IDiscogsRelease[]> {
	const collectionResponse: AxiosResponse<
		IDiscogsCollectionResponse
	> = await axios.get(
		`https://api.discogs.com/users/lookboil/collection/folders/0/releases?sort=added&sort_order=desc`
	);
	const releaseIds = collectionResponse.data.releases.map(
		release => release.id
	);
	const releases = releaseIds.slice(0, 4).map(async releaseId => {
		try {
			await sleep(2000);
			const response = await axios.get(
				`https://api.discogs.com/releases/${releaseId}?token=${apiKey}`
			);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	});

	return Promise.all(releases);
}
