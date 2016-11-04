//Vista mostrar quiz
exports.list = function(req, res){
  if(req.app.isAdminLogged){    
    req.getConnection(function(err,connection){
           
            var query = connection.query('SELECT * FROM quiz',function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );
         
                res.render('quiz',{page_title:"Quiz",data:rows});
             });
             //console.log(query.sql);
        });
    }
    else res.redirect('/bad_login');  
};

//Vista agregar usuario.


//Logica agregar usuario.
exports.save = function(req,res){
	if(req.app.isAdminLogged){
		var input = JSON.parse(JSON.stringify(rq.body))

		req.getConnection(function (err, connection){
			var data = {
				name	:input.name,
				link	:input.link
			};

			var query = connection.query("INSERT INTO quiz SET ? ",data, function(err, rows){
				if (err)
					console.log("Error insrting : %s ", err);
				res.redirect('/quiz');
			});
		});
	}
	else res.redirect('/bad_login');
};