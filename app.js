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
  res.send('test')
  //app.render('index')
})

app.listen(port,()=>{
  console.log(`express server is running on http://localhost:${port}`)
})