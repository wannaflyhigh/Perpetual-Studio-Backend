import { MongoClient } from "mongodb"
import { config } from "dotenv"
config()

// await addToShelf('hello', 'shelf_1')

async function connectToCluster() {
	const uri = process.env.DB_URI
	try {
		const mongoClient = new MongoClient(uri)
		console.log("Connecting to MongoDB Atlas cluster...")
		await mongoClient.connect()
		console.log("Successfully connected to MongoDB Atlas!")

		return mongoClient
	} catch (error) {
		console.error("Connection to MongoDB Atlas failed!", error)
		process.exit()
	}
}

export async function addToShelf(book_id, shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")
		const collection = db.collection(shelf_id)

		console.log(`adding ${book_id} to ${shelf_id}`)
		const status = await collection.insertOne({ book_id: book_id })
		return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function queryShelf(shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")

		const collection = db.collection(shelf_id)

		console.log(`querying ${shelf_id}`)

		const a = await collection.find().toArray()
		console.log(a)
		return a
	} finally {
		await mongoClient.close()
	}
}

export async function deleteFromShelf(book_id, shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")

		const collection = db.collection(shelf_id)

		console.log(`deleting ${book_id} from ${shelf_id}`)
		const a = await collection.deleteMany({ book_id: book_id })
		console.log(`${a.deletedCount} books has been deleted`)
		return a.deletedCount
	} finally {
		await mongoClient.close()
	}
}

export async function addSampleData() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		// mongoClient.db().admin()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')

		const status = await collection.insertOne({
			name: "解憂雜貨店2", shelfShouldStay: "A1", currentShelf: "", rfid: "b755ae6c"
		})
		return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function bookTouchShelf(rfid, touchedShelf) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')
		const books = await collection.find({ rfid }).toArray()

		let currentShelf = ""
		if (books[0]?.currentShelf == '') {
			currentShelf = touchedShelf
		}
		if (books[0]?.currentShelf != '' && books[0]?.currentShelf != touchedShelf) {
			currentShelf = touchedShelf
		}

		const status = await collection.updateOne({ rfid }, { $set: { currentShelf: currentShelf } })
		return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function getAllBooks() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')
		const books = await collection.find().project({ _id: 0 }).toArray()

		console.log(books)
		return books

	} finally {
		await mongoClient.close()
	}
}

// getAllBooks()
// bookTouchShelf("48a754ad14c80", "A1")
// addSampleData()