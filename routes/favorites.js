var express = require('express');
var router = express.Router();

//GET favorites page
router.get('/', function(req, res, next){
  res.render('favorites', {favorites: req.session.favorites});
});

router.post('/add', function(req, res, next){
  if(!req.session.favorites){
    req.session.favorites=[];
  }

  for( var x = 0; x < req.session.favorites.length; x++){
  if(req.session.favorites[x].date == req.body.date){
    console.log('This is already a favorite');
    return res.redirect('back');
  }
}
  req.session.favorites.push(req.body);
  res.redirect('/favorites');
});

module.exports=router;
