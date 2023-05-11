var express = require('express');
var router = express.Router();

var Page = require('../models/page');


/*router.get('/', function (req, res) {
  Page.find({}).sort({sorting: 1}).exec(function (err, pages) {
    res.render('admin/pages', {
        pages: pages
    });
});
});
*/
router.get('/', async function (req, res) {
  try {
    const pages = await Page.find({}).sort({sorting: 1});
    res.render('admin/pages', { pages });
  } catch (err) {
    console.log(err);
    req.flash('danger', 'An error occurred');
    res.redirect('/admin');
  }
});

//get add page
router.get('/add-page', function (req, res) {
  var title = "";
  var slug = "";
  var content = "";

  res.render('admin/add_page', {
    title: title,
    slug: slug,
    content: content
  });
})

router.post('/add-page', function (req, res) {
  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('content', 'content must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
  if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();
  var content = req.body.content;

  var errors = req.validationErrors();
  if (errors) {
    res.render('admin/add_page', {

      errors: errors,
      title: title,
      slug: slug,
      content: content

    });
  } else {

    // page.findOne({slug,slug},function(err,doc){
    //   if (page) {
    //     req.flash('danger', 'page slug exists choose another');
    //    res.render('admin/add_page', {
 
    //     title: title,
    //      slug: slug,
    //      content: content
 
    //      });

    // }
    // else{

    // }
  
 // });
 Page.findOne({ slug: slug })
  .then(function(existingPage) {
    if (existingPage) {
      req.flash('danger', 'page slug exists choose another');
      return res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
      });
    } else {
      var page = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 0
      });
      return page.save().then(function(savedPage) {
        req.flash('success', 'page added');
        res.redirect('/admin/pages/pages');
      });
    }
  })
  .catch(function(err) {
    console.log(err);
    req.flash('danger', 'an error occurred');
    res.redirect('/admin/pages');
  });



      
  }



});
module.exports = router;