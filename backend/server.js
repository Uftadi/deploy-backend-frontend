import express from 'express'
import cors from 'cors'
import "dotenv/config"

import booksRouter from './router/booksRouter.js'

const PORT = process.env.PORT


const app = express()

if( process.env.NODE_ENV === "development" ) {
    app.use( cors() );
} else {
    // TODO: REnder URL eintragen
    app.use( cors() )
}

app.use(express.json())

app.use("/books", booksRouter)

app.listen(PORT , () => {
    console.log('server läuft auf port: ' + PORT)
})
