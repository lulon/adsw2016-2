exports.list = function(req, res){

    if(req.session.isAdminLogged){
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM contact',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('contact',{page_title:"Contacts",data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    }
    else res.redirect('/bad_login');
  
};
//Vista agregar contactos.
exports.add = function(req, res){
    var isAdminLogged = req.app.get('isAdminLogged');

    if(req.session.isAdminLogged){
      res.render('add_contact',{page_title:"Add Contacts"});
    }
    else res.redirect('/bad_login');
};

exports.edit = function(req, res){
    var isAdminLogged = req.session.isAdminLogged;

    if(isAdminLogged){    
    var phone = req.params.phone;
    
    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM contact WHERE phone = ?',[phone],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_contact',{page_title:"Edit Contacts",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
    }
    else res.redirect('/bad_login');
};

exports.save = function(req,res){
    var isAdminLogged = req.session.isAdminLogged;
    var fs = require("fs");
    var Papa = require("babyparse")
    if(isAdminLogged){
        var filetext = fs.readFileSync(req.body.csv, 'utf8');
        var parse = Papa.parse(filetext);
        parse.data.shift();
        req.getConnection(function (err, connection) {
            
            var query = connection.query("INSERT INTO contact (name, last_name, phone) VALUES ? ",[parse.data], function(err, rows){
      
              if (err)
                  console.log("Error inserting : %s ",err );
             
              res.redirect('/contact');  
            });
        });
    }
      else res.redirect('/bad_login');
};
    

exports.save_edit = function(req,res){


    if(req.session.isAdminLogged){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var phone = req.params.phone;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            last_name : input.last_name,
            phone   : input.phone,
            to_call   : input.to_call 
        
        };
        
        connection.query("UPDATE contact set ? WHERE phone = ? ",[data,phone], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/contact');
          
        });
    
    });
    }
    else res.redirect('/bad_login');
};


exports.delete = function(req,res){

    if(req.session.isUserLogged || req.session.isAdminLogged){
          
         var idcontact = req.params.idcontact;

         req.getConnection(function (err, connection) {

            connection.query("DELETE FROM contact WHERE idcontact = ? ",[idcontact], function(err, rows)
            {
                 if(err)
                     console.log("Error deleting : %s ",err );
                if(req.session.isUserLogged){
                    res.redirect('/call/' + req.session.selected_idproject);
                } else res.redirect('/contact');

            });

         });
    }
    else res.redirect('/bad_login');
};