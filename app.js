const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
//const restaurants = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000
const router = require('./routes')

// 樣板引擎交給 express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
// provide static path for express framework
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// express router
app.use(router)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})