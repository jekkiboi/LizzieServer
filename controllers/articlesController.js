const router = require('express').Router();
const db = require('../models');


// BASE ROUTE - /api/articles

// actual route - GET /api/articles
//return data for all articles

router.get('/', (req, res) => {
  db.Article.find({}, (err, foundArticles) => {
    console.log('hello from get')

    console.log(foundArticles)

    if (err) return console.log(err);

    
    res.json(foundArticles);
  });
});


// actual route - GET /api/articles/:id
router.get('/:id', (req, res) => {
  db.Article.findById(req.params.id, (err, foundArticle) => {
      console.log('hello from one article')
    if (err) return console.log(err);
    
    res.json(foundArticle);
    
  });
});


// actual route - POST /api/articles
router.post('/', (req, res) => {
  
  db.Article.create(req.body, (err, savedArticle) => {
      console.log('hello from post')
    if (err) return console.log(err);
    
    res.json(savedArticle);
  });
});


// actual route - PUT /api/articles/:id
router.put('/:id', (req, res) => {
  db.Article.findByIdAndUpdate(
    req.params.id, // finds the Article with id passed in from URL
    req.body, // passes in data to update a Article from the req.body
    {new: true}, // We want to updated Article returned in the callback
    (err, updatedArticle) => { // function called after update completes
      if (err) return console.log(err);
      
      res.json(updatedArticle);
    });
});


// actual route - DELETE /api/articles/:id
router.delete('/:id', (req, res) => {
  console.log('delete route')
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) return console.log(err);
    res.json({ messaage:'Successful deletion' });
  });
});


module.exports = router;
