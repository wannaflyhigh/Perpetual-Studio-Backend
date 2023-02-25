import pg from "pg"
import { ENV } from "./env.js"

const { Client } = pg

const client = new Client({
	host: ENV.SQL_HOST,
	port: ENV.SQL_PORT,
	user: ENV.SQL_USER,
	password: ENV.SQL_PASSWORD,
	database: ENV.SQL_DATABASE,
	ssl: true,
})

function sqlQuery(query) {
	client.connect((err) => {
		if (err) {
			console.error("connection error", err.stack)
		} else {
			console.log("connected")
		}
	})
	client.query("SELECT NOW()", (err, res) => {
		if (err) throw err
		console.log(res)
	})
	client.end()
}
