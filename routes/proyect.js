//Vista lista de proyectos.
exports.list = function(req, res){
	if(req.session.isAdminLogged){
     	req.getConnection(function(err,connection){
         
        	var query = connection.query('SELECT * FROM proyect',function(err,rows)
        	{
            	if(err)
            	    console.log("Error Selecting : %s ",err );
            	res.render('proyect',{page_title:"Proyects",data:rows});                            
       		});
           
           //console.log(query.sql);
   	 	});
  	}
  else res.redirect('/bad_login');
};

//Vista agregar proyectos
exports.add = function(req, res){
	var isAdminLogged = req.app.get('isAdminLogged');
	if (req.session.isAdminLogged){
		res.render('add_proyect',{page_title:"Add Proyect"});
	}
	else res.redirect('/bad_login');
};

//Logica agregar proyectos.
exports.save = function(req, res){
	var isAdminLogged = req.session.isAdminLogged
	if(isAdminLogged){
		var input = JSON.parse(JSON.stringify(req.body));

		req.getConnection(function(err,connection){
			var nowdate = new Date();
			var data = {
				name		:input.name,
				startdate	:input.datefinish,
				finishdate	:nowdate.toLocaleDateString(),
				customer	:input.customer
			};
			var query = connection.query("INSERT INTO proyect set ? ",data,function(err, rows){
				if (err) console.log("Error inserting : %s", err);

				res.redirect('/proyect/add')
			});
		});
	}
	else res.redirect('/bad_login');
};

//Logica borrar proyecto.
exports.delete_proyect = function(req, res){
	var isAdminLogged = req.session.isAdminLogged
	if(isAdminLogged){
		var idproyect = req.params.idproyect;
		req.getConnection(function (err, connection){
			connection.query("DELETE FROM proyect WHERE idproyect = ?",[idproyect],function(err, rows){
				if(err) console.log("Error deleting : %s ", err);
				res.redirect('/proyect');
			});
		});
	}
	else res.redirect('/bad_login');
};