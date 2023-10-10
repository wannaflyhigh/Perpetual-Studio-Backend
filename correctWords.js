import axios from "axios";

export default async function correctWords(text) {
	const res = await axios.post("https://coct.naer.edu.tw/spcheck/do/", { text })
	const data = res.data
	// console.log(data)
	// const data = `有一<font color='blue'>{樹>曙}</font>光那<font color='blue'>{舜>瞬}</font>間`
	const parsedWord = data.output.replace(/<\/?[^>]+(>|$)|/g, "").replace(/\{[^>]+>/g, "").replace("}", "").replaceAll("}", "")
	console.log(parsedWord)
	return parsedWord
}

// correctWords("躺載我藍色百折群上")