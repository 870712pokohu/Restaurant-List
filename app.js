const express = require('express')
const {engine} = require('express-handlebars')
const restaurants = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000

// 樣板引擎交給 express-handlebars
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
// provide static path for express framework
app.use(express.static('public'))

app.get('/',(req,res)=>{
  res.redirect('/restaurants')
})

app.get('/restaurants',(req,res)=>{
  const keyword = req.query.keyword?.trim()
  const matchedRestaurants = keyword ? restaurants.filter((restaurant)=>{
    if(restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())){
      return restaurant
    }
  }): restaurants
  res.render('index',{restaurants: matchedRestaurants, keyword})
})


app.get('/restaurants/:id',(req,res)=>{
  const id = req.params.id
  const restaurant = restaurants.find((restaurant)=>restaurant.id.toString()===id)
  res.render('show',{restaurant})
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})