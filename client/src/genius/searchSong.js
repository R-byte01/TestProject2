import axios from 'axios';
import { checkOptions, getTitle } from '../utils/index.js';

const searchUrl = 'https://api.genius.com/search?q=';

export default async function (options) {
	try {
		checkOptions(options);
		let { apiKey, title, artist, optimizeQuery = false, authHeader = false } = options;
		const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
		const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;
		const headers = {
			Authorization: 'Bearer ' + apiKey
		};
		let { data } = await axios.get(
			authHeader ? reqUrl : `${reqUrl}&access_token=${apiKey}`,
			authHeader && { headers }
		);
		if (data.response.hits.length === 0) return null;
		const results = data.response.hits.map((val) => {
			const { full_title, id, url } = val.result;
			return { id, title: full_title, url };
		});
		return results;
	} catch (e) {
		throw e;
	}
};