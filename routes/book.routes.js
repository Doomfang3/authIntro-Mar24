const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Book = require('../models/Book.model')

const router = require('express').Router()

// /api/books
// GET all books
router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find()
    res.status(200).json(allBooks)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// GET one book
router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// POST one book
router.post('/', isAuthenticated, async (req, res) => {
  const newBookPayload = req.body // { title, author, pages }
  newBookPayload.createdBy = req.tokenPayload.userId
  try {
    const newBook = await Book.create(newBookPayload)
    res.status(201).json(newBook)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
