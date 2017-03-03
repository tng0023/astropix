var express = require('express');
var router = express.Router();
var apod = require('../helpers/apod');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Astropix' });
});

router.get('/fetch_picture', function(req, res, next){

  if(req.query.today){
    apod(function(data, error){
      if(error){
        return res.render('apod_error', {error : error.message});
      }
      return res.render('picture',{apod : data});
    }, true);
  }
  else if(req.query.random) {
    apod(function(data, error){
      if(error){
        return res.render('apod_error', { error : error.message});
      }
      return res.render('picture', {apod : data});
    });

  } else {
    next(); //send to next handler. since there isn't one, this will up at a 404 error handler, and send a 404 response
  }
});

module.exports = router;
