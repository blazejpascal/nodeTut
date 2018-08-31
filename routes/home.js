
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {title: "my express app", message: "a lot to do"})
})

module.exports = router