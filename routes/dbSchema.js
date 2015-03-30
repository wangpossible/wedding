var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:/myapp');
var userSchema=new mongoose.Schema({
	username:String,
	password:String,
	salt:String,
	hash:String
});
var User=mongoose.model('users',userSchema);

module.exports=User;