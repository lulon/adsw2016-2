var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var contact = require('./routes/contact'); 
var users = require('./routes/users');
var admin = require('./routes/admin');
var quiz = require('./routes/quiz');
var app = express();
var flash = require('connect-flash');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

var isUserLogged = false;
var isAdminLogged = false;

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(isUserLogged);
app.use(isAdminLogged);

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '1234',
        port : 3306, 
        database:'adsw'

    },'pool')

);



app.get('/', routes.index);

//Contacts
app.get('/contact', contact.list);
app.get('/contact/add', contact.add);
app.post('/contact/add', contact.save);
app.get('/contact/delete/:phone', contact.delete_customer);
app.get('/contact/edit/:phone', contact.edit);
app.post('/contact/edit/:phone',contact.save_edit);

//Users
app.get('/user', admin.list);
app.get('/user/add', admin.add);
app.post('/user/add', admin.save);
app.get('/user/delete/:username', admin.delete_user);
app.get('/user/edit/:username', admin.edit);
app.post('/user/edit/:username',admin.save_edit);
app.get('/user_logout', users.user_logout);
app.get('/admin_logout', users.admin_logout);
app.get('/user_login', users.user_login);
app.get('/admin_login', users.admin_login);
app.get('/bad_login', users.bad_login);
app.post('/admin_login_handler', users.admin_login_handler);
app.post('/user_login_handler', users.user_login_handler);

//Quizes
app.get('/quiz', quiz.list);
app.get('/quiz/add', quiz.add);
app.post('/quiz/add', quiz.save);
app.get('/quiz/disable/:idquiz/:activated', quiz.disable_quiz);
app.get('/quiz/delete/:idquiz', quiz.delete_quiz);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('The game starts on port ' + app.get('port'));
});