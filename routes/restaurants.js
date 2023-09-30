// express routing
const express = require('express')
const router = express.Router()
// access database
const db = require('../models')
const Restaurant = db.Restaurant
// use sequelize operator
const { Op } = require("sequelize");
let display

// (READ) - view all restaurants
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 6
  const keyword = req.query.keyword?.trim() || ""
  return Restaurant.findAll({
    where: {
      [Op.or]:{
        name: {
         [Op.like]: `%${keyword}%`
        },
        category:{
          [Op.like]: `%${keyword}%`
        }
      }
    },
    offset: (page - 1) * limit,
    limit: limit,
    raw: true
  })
    .then((restaurants) => {
      if (restaurants.length === 0) {
        res.redirect('back')
      } else {
        res.render('index', {
          restaurants: restaurants,
          keyword,
          prev: page > 1 ? page - 1 : page,
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