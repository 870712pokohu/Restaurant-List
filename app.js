const express = require('express')
const {engine} = require('express-handlebars')
const restaurants = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000

const db = require('./models')
const Restaurant = db.Restaurant


// 樣板引擎交給 express-handlebars
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
// provide static path for express framework
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
  res.redirect('/restaurants')
})

app.get('/restaurants',(req,res)=>{
  const keyword = req.query.keyword?.trim()
  //console.log(keyword)
   return Restaurant.findAll({
    raw:true
   })
    .then((restaurants)=>{
      const matchedRestaurants = keyword ? restaurants.filter((restaurant) => {
        if (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
          return restaurant
        }
      }): restaurants
      res.render('index', { restaurants: matchedRestaurants, keyword })
    })
    .catch((err)=>console.log(err))
})

// render editor view - main restaurant page
app.get('/restaurants/editor',(req,res)=>{
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

// render editor view - create restaurant page
app.get('/restaurants/editor/new',(req,res)=>{
  res.render('new')
})

app.post('/restaurants/editor',(req,res)=>{
  const data = req.body
  console.log(data)
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
    .then(()=>res.redirect('/restaurants/editor'))
    .catch((err)=>console.log(err))
})

app.get('/restaurants/editor/:id',(req,res)=>{
  const id = req.params.id
  
  // const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  // res.render('show', { restaurant })
  return Restaurant.findByPk(id)
    .then((singleRestaurant)=>{
      res.render('show',{singleRestaurant})
    })
    .catch((err)=>console.log(err))
})


app.get('/restaurants/:id',(req,res)=>{
  const id = req.params.id
  return Restaurant.findByPk(id,{
    raw:true
  })
    .then((singleRestaurant) => {
      console.log(singleRestaurant)
      res.render('show', { singleRestaurant })
    })
    .catch((err) => console.log(err))
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})