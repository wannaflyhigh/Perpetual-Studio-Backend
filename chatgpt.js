import { ChatGPTAPI } from "chatgpt"
import * as dotenv from "dotenv"
dotenv.config()

// chatgpt('我覺得好累 考試壓力好大')

export async function chatgpt(text) {
	console.log(`sending ${text} to chatgpt...`)
	const api = new ChatGPTAPI({
		apiKey: process.env.OPENAI_API_KEY
	})

	const res = await api.sendMessage(`${text}
	請幫我依照上面這段話產生3本中文書
	幫我用json array呈現 key 用title author description
	`)
	console.log(res.text)
	function getIndicesOf(searchStr, str, caseSensitive) {
		var searchStrLen = searchStr.length;
		if (searchStrLen == 0) {
			return [];
		}
		var startIndex = 0, index, indices = [];
		if (!caseSensitive) {
			str = str.toLowerCase();
			searchStr = searchStr.toLowerCase();
		}
		while ((index = str.indexOf(searchStr, startIndex)) > -1) {
			indices.push(index);
			startIndex = index + searchStrLen;
		}
		return indices;
	}

	const leftBracelet = getIndicesOf("{", res.text);
	const rightBracelet = getIndicesOf("}", res.text);
	const array = [
		JSON.parse(res.text.slice(leftBracelet[0], rightBracelet[0] + 1)),
		JSON.parse(res.text.slice(leftBracelet[1], rightBracelet[1] + 1)),
		JSON.parse(res.text.slice(leftBracelet[2], rightBracelet[2] + 1)),
	]
	console.log(array)
	return array
}

