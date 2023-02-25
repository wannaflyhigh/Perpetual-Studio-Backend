import express from "express"
import { ENV } from "./env.js"

const app = express()
const port = ENV.PORT || 3000

app.get("/pushIdTest", (req, res) => {
	res.json({ msg: `get id ${req.query.id}` })
})

app.get("/", (req, res) => {
	res.json({ msg: "hi" })
})

app.listen(port)
