// express routing
const express = require('express')
const router = express.Router()
// access database
const db = require('../models')
const Restaurant = db.Restaurant
let display

// (READ) - view all restaurants
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1
  console.log(page)
  const limit = 6
  const keyword = req.query.keyword?.trim()
  //console.log(keyword)
  return Restaurant.findAll({
    offset: (page-1)*limit,
    limit: limit,
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = keyword ? restaurants.filter((restaurant) => {
        if (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
          return restaurant
        }
      }) : restaurants
      if (matchedRestaurants.length === 0){
        res.redirect('back')
      }else{
        res.render('index', { 
          restaurants: matchedRestaurants, 
          keyword,
          prev: page > 1 ? page-1 : page,
          next: page + 1, 
          page 
        })
      }
    })
    .catch((err) => console.log(err))
})

// (READ) - view a single restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((singleRestaurant) => {
      display = "none"
      console.log(singleRestaurant)
      res.render('show', { singleRestaurant, display })
    })
    .catch((err) => console.log(err))
})

module.exports = router