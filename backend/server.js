import express from 'express'
import "dotenv/config"

import booksRouter from './router/booksRouter.js'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use("/books", booksRouter)

app.listen(PORT , () => {
    console.log('server läuft auf port: ' + PORT)
})
