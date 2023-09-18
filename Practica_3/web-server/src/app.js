// Accessing API from Browser 

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // http://localhost:3000/

app.get('', (req, res) => {
    res.render('index', {
        title: 'El clima',
        subtitle: 'en tiempo real',
        myName: 'Mariana Pérez',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'El clima',
        subtitle: 'Acerca de...',
        myName: 'Mariana Pérez',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Si no encontraste la ubicación, prueba de nuevo',
        title: 'El clima',
        subtitle: 'Ayuda',
        myName: 'Mariana Pérez',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Escribe una ubicación!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Escribe un término de búsqueda'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        subtitle: 'Page not found.',
        myName: 'Mariana Pérez',
        name: 'Andrew Mead',
        errorMessage: 'La página que buscas no está disponible.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        subtitle: 'Page not found.',
        myName: 'Mariana Pérez',
        name: 'Andrew Mead',
        errorMessage: 'La página que buscas no está disponible.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//Para correrlo desde FE-MODULO_4: $  node Practica_3/web-server/src/app
//Para correrlo desde otra ubicación más directa: $  node src/app