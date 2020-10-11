const path=require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecaste = require('./utils/forecaste')
//define path for Express Config
const dir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//set up handelbars and views

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//register path 
//set up static pages 
app.use(express.static(dir))
//register partials
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Khyati Agrawal'    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Khyati Agrawal'

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Khyati Agrawal'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "you must provide the address" })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            res.send({ error })
            return
        }
        forecaste(latitude, longitude, (error, forecast) => {
            if (error) {
                res.send({ error })
                return
            }
            res.send({
                location: location,
                forecaste: forecast.temperature
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title:'page'
    })
}
    )
app.listen(port, () => {
    console.log('server start')
})