import axios from 'axios';
import extractLyrics from '../utils/extractLyrics.js';

const url = 'https://api.genius.com/songs/';

export default async function (id, apiKey) {
	if (!id) throw 'No id was provided';
	if (!apiKey) throw 'No apiKey was provided';
	try {
		let {
			data: {
				response: { song }
			}
		} = await axios.get(`${url}${id}?access_token=${apiKey}`);
		let lyrics = await extractLyrics(song.url);
		return {
			id: song.id,
			title: song.full_title,
			url: song.url,
			lyrics,
			albumArt: song.song_art_image_url
		};
	} catch (e) {
		throw e;
	}
};