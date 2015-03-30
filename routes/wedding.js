var express = require('express');
var router = express.Router();

/* GET wedding page. */
router.get('/', function(req, res) {
  res.render('wedding', { title: '我们结婚吧'});
});

module.exports = router;
