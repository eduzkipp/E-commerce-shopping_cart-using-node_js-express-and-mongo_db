var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var config=require('./config/database');
var bodyParser=require('body-parser');
var session = require('express-session');
var expressValidator=require('express-validator');
const { body, validationResult } = require('express-validator');


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

//body-parser middleware
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
//express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  //express validator
  app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));
        //express messages middleware
        app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
var pages=require('./routes/pages.js');
var adminpages=require('./routes/admin_pages');
app.use('/admin/pages',adminpages);
app.use('/',pages);

var port=3000;
app.listen(port,function(){
    console.log('server started on port '+port);
});