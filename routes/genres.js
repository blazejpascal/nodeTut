const express = require('express')
const router = express.Router();

const genres = [
    {id: 1, name: 'comedy'},
    {id: 2, name: 'action'},
    {id: 3, name: 'drama'},
]


router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id' , (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('no element with given id')
    res.send(genre)
})

router.post('/', (req, res) => {
    const {error} = validateGenres(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length +1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})

router.put('/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('no element with given id')

    const {error} = validateGenres(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre)
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('no element with given id')

    index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)

})

function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router;