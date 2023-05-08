var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var config=require('./config/database');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.database);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
console.log("Database connected successfully");
}

//init app
var app=express();
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//set public folder
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.send('working');
})
var port=3000;
app.listen(port,function(){
    console.log('server started on port '+port);
});