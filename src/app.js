const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//  Define paths for express config
const pubDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(pubDirectory))

// app.get('', (req, res) => {
//     res.send('<h1>Front page</h1>')
// })

// app.use('/help', express.static(pubDirectory + '/help.html'))
// app.use('/about', express.static(pubDirectory + '/about.html'))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'This page gives info about weather',
        name: 'Joe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page hbs',
        name: 'Joe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page hbs',
        help1: 'Help paragraph for Help page',
        name: 'Joe'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error: 'Cannot find any forecast for given geo data. Try to provide another longitude and latitude'
                    })
                }
                res.send({
                    address: req.query.address,
                    place,
                    forecast: forecastData.forecast,
                    location: forecastData.location
                })
            })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        message: 'Help article not found!',
        title: 'Error page',
        name: 'Joe'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        message: 'Page not found!',
        title: 'Error page',
        name: 'Joe'
    })
})

app.listen(3000, () => {
    console.log('Express server started on localhost, port 3000...')
})