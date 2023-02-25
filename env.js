import * as dotenv from "dotenv"
dotenv.config()

export const ENV = {
	PORT: process.env.PORT,
	SQL_HOST: process.env.SQL_HOST,
	SQL_PORT: process.env.SQL_PORT,
	SQL_USER: process.env.SQL_USER,
	SQL_PASSWORD: process.env.SQL_PASSWORD,
	SQL_DATABASE: process.env.SQL_DATABASE,
}
