import express from "express"
import * as dotenv from "dotenv"
import axios from "axios"
import { addToShelf, bookTouchShelf, deleteFromShelf, getAllBooks, getBookByRFID, getBooksByNames, getLastOnCar, queryShelf } from "./mongodb.js"
import cors from "cors"
import { chatgpt } from "./chatgpt.js"
import { findBook } from "./openai.js"
import correctWords from "./correctWords.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get('/getLastOnCar', async (req, res) => {
	const books = await getLastOnCar()
	res.json(books)
})

app.get('/getBookByRFID', async (req, res) => {
	const { rfid } = req.query
	const books = await getBookByRFID(rfid)
	res.json(books)
})

app.get('/getBooksByNames', async (req, res) => {
	const { stringfyNames } = req.query
	const books = await getBooksByNames(stringfyNames)
	res.json(books)
})

app.get('/getAllBooks', async (req, res) => {
	const books = await getAllBooks()
	res.json(books)
})

app.get('/bookTouchShelf', async (req, res) => {
	const { rfid, touchedShelf } = req.query
	if (!rfid || !touchedShelf) {
		return res.json("Missing required arguments")
	}
	const status = await bookTouchShelf(rfid, touchedShelf)
	// if touchedShelf == 'CAR' modified 
	res.json(status)
})

app.get('/chatgpt', async (req, res) => {
	const { text, key } = req.query
	if (key != process.env.CHATGPT_KEY) return res.send('key required')
	if (text == undefined) return res.send('missing parameter')
	const data = await findBook(text)
	res.json(data)
})

app.get("/correctWords", async (req, res) => {
	const { text } = req.query
	if (!text) {
		res.send("missing parameter")
		return
	}
	const correctedWords = await correctWords(text)
	res.json(correctedWords)
})

app.get('/get_in_shelf', async (req, res) => {
	const { book_id, shelf_id } = req.query
	if (book_id === undefined && shelf_id === undefined) {
		return res.send("missing params")
	}
	const status = await addToShelf(book_id, shelf_id)
	return res.send(status ? 'added successfully' : 'might be some error')
})

app.get('/get_out_shelf', async (req, res) => {
	const { book_id, shelf_id } = req.query
	if (book_id === undefined && shelf_id === undefined) {
		return res.send("missing params")
	}
	const deletedCount = await deleteFromShelf(book_id, shelf_id)
	res.send(`${deletedCount} books have been deleted`)
})

app.get('/shelf', async (req, res) => {
	let { shelf_id } = req.query
	if (shelf_id === undefined) {
		return res.send("missing params")
	}
	const data = await queryShelf(shelf_id)
	res.json(data)
})

app.get("/pushIdTest", (req, res) => {
	res.json({ msg: `get id ${req.query.id}` })
	console.log(`get id ${req.query.id}`)
})

app.get("/", (req, res) => {
	res.json({ msg: "hi" })
	console.log(`get root`)
})

app.listen(port)
