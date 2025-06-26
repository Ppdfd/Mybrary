const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All author route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')      
    }
})

// new author route
router.get('/news',(req,res)=>{
    res.render('authors/news',{ author: new Author()})
})

// create author route
router.post('/', async (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('authors')
    }catch{
        res.render('authors/news',{
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router