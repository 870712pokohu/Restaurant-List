const express = require('express')
const router = express.Router()

// create routing for restaurant and editor
const restaurants = require('./restaurants')
const editor = require('./editor')

// route to '/restaurant'
router.use('/restaurants',restaurants)
// route to '/editor'
router.use('/editor',editor)

// redirect to the main page
router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// export router
module.exports = router