// express routing
const express = require('express')
const router = express.Router()
// access database
const db = require('../models')
const Restaurant = db.Restaurant
let display
const category = ["中東料理", "日本料理", "義式餐廳", "美式", "酒吧", "咖啡", "其他"]

// render editor view - main restaurant page
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1
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
      if(matchedRestaurants.length === 0){
        res.redirect('back')
      }else{
        res.render('editorView', { 
          restaurants: matchedRestaurants,
          prev: page > 1 ? page - 1 : page,
          next: page + 1,
          page,
          keyword 
        })
      }
    })
    .catch((err) => console.log(err))
})

// (READ) render editor view - create restaurant page
router.get('/new', (req, res) => {
  res.render('new', { category })
})

// (READ) render editor view - edit restaurant page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((singleRestaurant) => {
      let defaultValue = singleRestaurant.category
      let newCategory = category.filter(item => item !== defaultValue)
      console.log(newCategory)
      res.render('edit', { singleRestaurant, newCategory, defaultValue })
    })
    .catch((err) => console.log(err))
})

// (READ) - view a single restaurant's detail
router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then((singleRestaurant) => {
      display = "block"
      console.log(singleRestaurant)
      res.render('show', { singleRestaurant, display })
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
      display = "block"
      console.log(singleRestaurant)
      res.render('show', { singleRestaurant, display })
    })
    .catch((err) => console.log(err))
})

// (CREATE) - add a new restaurant
router.post('/', (req, res) => {
  const data = req.body
  return Restaurant.create({
    name: data.name,
    nameEN: data.nameEN,
    phone: data.phone,
    category: data.category,
    image: data.imgURL,
    location: data.location,
    googleMap: data.map,
    rating: data.rating,
    description: data.description,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(() => res.redirect('/editor'))
    .catch((err) => console.log(err))
})

// (UPDATE) - update a single restaurant
router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  console.log(data.category.value)
  return Restaurant.update({
    name: data.name,
    nameEN: data.nameEN,
    phone: data.phone,
    category: data.category,
    image: data.imgURL,
    location: data.location,
    googleMap: data.map,
    rating: data.rating,
    description: data.description,
    updatedAt: new Date()
  }, { where: { id: id } })
    .then(() => {
      res.redirect(`/editor/${id}`)
    })
    .catch((err) => console.log(err))
})

// (DELETE) - delete a single restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id: id } })
    .then(() => {
      console.log('success')
      res.redirect('/editor')
    })
    .catch((err) => console.log(err))
})

module.exports = router