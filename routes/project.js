//Vista lista de projectos.
exports.list = function(req, res){
	if(req.session.isUserLogged){
		var view = 'user_indx';
	}
	 else if(req.session.isAdminLogged){
		var view = 'project';
	}
	if(req.session.isAdminLogged || req.session.isUserLogged){
     	req.getConnection(function(err,connection){
         
        	var query = connection.query('SELECT * FROM project',function(err,rows)
        	{
            	if(err)
            	    console.log("Error Selecting : %s ",err );
            	res.render(view,{page_title:"Projects",data:rows});
       		});
           
           //console.log(query.sql);
   	 	});
  	}
  else res.redirect('/bad_login');
};

//Vista agregar projectos
exports.add = function(req, res){
	var isAdminLogged = req.app.get('isAdminLogged');
	if (req.session.isAdminLogged){
		res.render('add_project',{page_title:"Add project"});
	}
	else res.redirect('/bad_login');
};

//Logica agregar projectos.
exports.save = function(req, res){
	var isAdminLogged = req.session.isAdminLogged
	if(isAdminLogged){
		var input = JSON.parse(JSON.stringify(req.body));

		req.getConnection(function(err,connection){
			var nowdate = new Date();
			var data = {
				name		:input.name,
				startdate	:nowdate.toLocaleDateString(),
				finishdate	:input.datefinish,
				customer	:input.customer
			};
			var query = connection.query("INSERT INTO project set ? ",data,function(err, rows){
				if (err) console.log("Error inserting : %s", err);

				res.redirect('/project')
			});
		});
	}
	else res.redirect('/bad_login');
};

//Logica borrar projecto.
exports.delete_project = function(req, res){
	var isAdminLogged = req.session.isAdminLogged
	if(isAdminLogged){
		var idproject = req.params.idproject;
		req.getConnection(function (err, connection){
			connection.query("DELETE FROM project WHERE idproject = ?",[idproject],function(err, rows){
				if(err) console.log("Error deleting : %s ", err);
				res.redirect('/project');
			});
		});
	}
	else res.redirect('/bad_login');
};