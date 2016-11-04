//Vista lista de usuarios.
exports.list = function(req, res){
  if(req.app.isAdminLogged){    
    req.getConnection(function(err,connection){
           
            var query = connection.query('SELECT * FROM user',function(err,rows)
            {
                
                if(err)
                    console.log("Error Selecting : %s ",err );
         
                res.render('user',{page_title:"Users",data:rows});
                    
             });
             //console.log(query.sql);
        });
    }
    else res.redirect('/bad_login');  
};

//Vista agregar usuario.
exports.add = function(req, res){
  if(req.app.isAdminLogged){ 
    res.render('add_user',{page_title:"Add Users"});
    }
    else res.redirect('/bad_login');
};

//Logica agregar usuario.
exports.save = function(req,res){
  if(req.app.isAdminLogged){ 
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            last_name : input.last_name,
            username   : input.username,
            password   : input.password 
        
        };
        
        var query = connection.query("INSERT INTO user set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/user');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
    }
    else res.redirect('/bad_login');
};

//Vista editar usuario.
exports.edit = function(req, res){
  
  if(req.app.isAdminLogged){   
    var username = req.params.username;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM user WHERE username = ?',[username],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_user',{page_title:"Edit Users",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
    }
    else res.redirect('/bad_login');
};

//Logica editar usuario.
exports.save_edit = function(req,res){

  if(req.app.isAdminLogged){     
    var input = JSON.parse(JSON.stringify(req.body));
    var username = req.params.username;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            last_name : input.last_name,
            username   : input.username,
            password   : input.password 
        
        };
        
        connection.query("UPDATE user set ? WHERE username = ? ",[data,username], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/user');
          
        });
    
    });
    }
    else res.redirect('/bad_login');
};


//Borrar usuario.
exports.delete_customer = function(req,res){

  if(req.app.isAdminLogged){           
     var username = req.params.username;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM user WHERE username = ? ",[username], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/user');
             
        });
        
     });
    }
    else res.redirect('/bad_login');
};