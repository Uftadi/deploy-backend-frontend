import express from 'express'
import { addNewBook, deleteBook, getAllBooks, getBookById } from '../controller/booksController.js'

const router = express.Router()

router.get("/getAllBooks", getAllBooks)
router.get("/getBookById/:id", getBookById)
router.post('/addNewBook', addNewBook)
router.delete('/deleteBook/:id', deleteBook)

export default router