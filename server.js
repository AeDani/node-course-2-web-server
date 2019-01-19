const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// heroku port or 3000 if run locally
const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
//------ register middlewear
// loger middlewear
app.use((req, res, next) => {
    var now = new Date().toLocaleString()
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n' ,(err) => {
        if(err){
            console.log('Unable to append to server.js')
        }
    })
    next()
})

// maintenance middlewear - never calls next()
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

// static folder to serve
app.use(express.static(__dirname + '/public'))

//------- Helper function 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

//------- Routes
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>')
    
    // res.send({
    //     name: 'Dani',
    //     likes: [
    //         'banana', 
    //         'cities',
    //         'stefi'
    //     ]
    // })

    res.render('home.hbs', {
            pageTitle: 'Welcome Page',
            welcomeMessage: 'Awesome you are here.'
        })
})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    })
})


app.listen(port, () => {
    console.log(`Server ist up on Port ${port}`)
})