exports.bad_login = function(req, res){
	res.render('bad_login', { title: 'Call Service - Auth Error' });
};

exports.user_login = function(req, res){
	res.render('user_login', { title: 'Call Service - User Login' });
};


exports.admin_login = function(req, res){
	res.render('admin_login', { title: 'Call Service - Admins Login' });
};

exports.user_logout = function(req, res){
	res.app.isUserLogged = false;
	res.redirect('/');
};

exports.admin_logout = function(req, res){
	res.app.isAdminLogged = false;
	res.redirect('/');
};

exports.user_login_handler = function(req, res){

	var input = JSON.parse(JSON.stringify(req.body));

	var username = input.username;
	var password = input.password;

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM user WHERE username = ? AND password = ?',[username,password],function(err,rows)
          {
          	  if(rows.length == 0 ){
          	  	console.log('Invalid Username or Password.');
          	  	res.redirect('/bad_login');
          	  }

              if(err)
                  console.log("Error Selecting : %s ",err );
              
              if(rows.length == 1){
              	res.app.isUserLogged = true;
              	res.redirect('/contact');
              }
                       
             
           });
           
           //console.log(query.sql);
      });
  
};

exports.admin_login_handler = function(req, res){

	var input = JSON.parse(JSON.stringify(req.body));

	var username = input.username;
	var password = input.password;

    req.getConnection(function(err,connection){
         
          connection.query('SELECT * FROM admin WHERE username = ? AND password = ?',[username,password],function(err,rows)
          {
          	  if(rows.length == 0 ){
          	  	console.log('Invalid Username or Password.');
          	  	res.redirect('/bad_login');
          	  }

              if(err)
                  console.log("Error Selecting : %s ",err );
              
              if(rows.length == 1){
              	res.app.isAdminLogged = true;
              	res.redirect('/user');
              }           });
           
           //console.log(query.sql);
      });
  
};