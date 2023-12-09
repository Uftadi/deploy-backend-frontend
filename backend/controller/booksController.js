import {JSONPreset} from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid';
const defaultData = [{}]

const db = await JSONPreset("./data/db.json", defaultData)

const getAllBooks = async (req, res) => {
    try {
        await db.read()
        res.status(200).send(db.data)
    } catch (error) {
        res.status(404).send(error)
    }
}

const getBookById = async (req, res) => {
    try {
        await db.read()
        const ownId = req.params.id
        if(req.params.id){
            const book = db.data.books.filter((book)=> book.id === ownId)
            res.status(200).send(book)
        }else{
            res.status(404).send('enter one id')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const addNewBook = async (req, res) => {
    try {
        await db.read()
        if(
            req.body.title &&
            req.body.author &&
            req.body.genre &&
            req.body.publication_year &&
            req.body.rating
        ){
            const newBook = {
                id: uuidv4(),
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publication_year: req.body.publication_year,
                rating: req.body.rating
            }
            db.data.books.push(newBook)
            db.write()
            res.status(201).send('book: ' + req.body.title + ' is added')
        }else{
            res.status(404).send('some attributes are missing')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteBook = async (req, res) => {
    try {
        await db.read()
        const ownId = req.params.id
        if(ownId){
            const data = db.data.books
            const findBook = data.findIndex((book) =>{
                return book.id === ownId
            } )
            data.splice(findBook, 1)
            db.write()
            res.status(202).send('book is deleted')
        }else{
            res.status(404).send('false id')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


export {getAllBooks, getBookById, addNewBook, deleteBook}