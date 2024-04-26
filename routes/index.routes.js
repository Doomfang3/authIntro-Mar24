const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const bookRoutes = require('./book.routes')
router.use('/books', bookRoutes)

module.exports = router
