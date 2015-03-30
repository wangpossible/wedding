var express = require('express');
var markdown = require('markdown-js');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res) {
  res.render('events.md',{layout:false,title:'活动集锦'});
});

router.get('/2014/:title.html',function(req,res){
	var path=['2014/',req.params.title,'.md'].join('');
	res.render(path,{layout:false,title:'楚汉单车俱乐部'});
});

module.exports = router;
