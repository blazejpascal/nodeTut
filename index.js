const express = require('express')
const Joi = require('joi')
const logger = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')

const genres = require('./routes/genres')
const home = require('./routes/home')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/genres', genres)
app.use('/', home)


if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan Enebled')

}

app.use(logger)

const port = process.env.PORT || 3001
app.listen(port, () =>(`listening on ${port}`))

