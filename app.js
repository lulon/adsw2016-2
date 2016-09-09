var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var contact = require('./routes/contact'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


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
app.get('/contact', contact.list);
app.get('/contact/add', contact.add);
app.post('/contact/add', contact.save);
app.get('/contact/delete/:id', contact.delete_customer);
app.get('/contact/edit/:id', contact.edit);
app.post('/contact/edit/:id',contact.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});