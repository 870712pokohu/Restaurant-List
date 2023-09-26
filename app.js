const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const restaurants = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000
const db = require('./models')
const Restaurant = db.Restaurant
let display
const category = ["中東料理", "日本料理", "義式餐廳", "美式", "酒吧", "咖啡", "其他"]

// 樣板引擎交給 express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
// provide static path for express framework
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// redirect to the main page
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// (READ) - view all restaurants
app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim()
  //console.log(keyword)
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = keyword ? restaurants.filter((restaurant) => {
        if (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
          return restaurant
        }
      }) : restaurants
      res.render('index', { restaurants: matchedRestaurants, keyword })
    })
    .catch((err) => console.log(err))
})

// render editor view - main restaurant page
app.get('/restaurants/editor', (req, res) => {
  const keyword = req.query.keyword?.trim()
  //console.log(keyword)
  return Restaurant.findAll({
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = keyword ? restaurants.filter((restaurant) => {
        if (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
          return restaurant
        }
      }) : restaurants
      res.render('editorView', { restaurants: matchedRestaurants, keyword })
    })
    .catch((err) => console.log(err))
})

// (READ) - view a single restaurant
app.get('/restaurants/:id', (req, res) => {
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

// (READ) render editor view - create restaurant page
app.get('/restaurants/editor/new', (req, res) => {
  res.render('new', { category })
})

// (READ) render editor view - edit restaurant page
app.get('/restaurants/editor/:id/edit', (req, res) => {
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
app.get('/restaurants/editor/:id/detail', (req, res) => {
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
app.get('/restaurants/editor/:id', (req, res) => {
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
app.post('/restaurants/editor', (req, res) => {
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
    .then(() => res.redirect('/restaurants/editor'))
    .catch((err) => console.log(err))
})

// (UPDATE) - update a single restaurant
app.put('/restaurants/editor/:id', (req, res) => {
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
      res.redirect(`/restaurants/editor/${id}`)
    })
    .catch((err) => console.log(err))
})

// (DELETE) - delete a single restaurant
app.delete('/restaurants/editor/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id: id } })
    .then(() => {
      console.log('success')
      res.redirect('/restaurants/editor')
    })
    .catch((err) => console.log(err))
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})