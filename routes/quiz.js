//Vista mostrar quiz
exports.list = function(req, res){
 	if(req.session.isAdminLogged){
 		var idproject = req.params.idproject;
	    req.getConnection(function(err,connection){
	           
	            var query = connection.query('SELECT * FROM quiz WHERE idproject = ?',[idproject],function(err,rows)
	            {
	                if(err)
	                    console.log("Error Selecting : %s ",err );
	         
	                res.render('quiz',{page_title:"Quiz",data:rows,idproject:idproject});
	             });
	             //console.log(query.sql);
	        });
	    }
    else res.redirect('/bad_login');  
};

//Vista agregar encuesta.
exports.add = function(req,res){
	if(req.session.isAdminLogged){
		var idproject = req.params.idproject;
		res.render('add_quiz',{page_title:"Add Quiz",idproject:idproject});
	}
	else res.redirect('/bad_login');
};


//Logica agregar encuesta.
exports.save = function(req,res){
	if(req.session.isAdminLogged){
		var input = JSON.parse(JSON.stringify(req.body))

		req.getConnection(function (err, connection){
			var data = {
				name		:input.name,
				link		:input.link,
				idproject	:input.idproject
			};

			var query = connection.query("INSERT INTO quiz SET ? ",data, function(err, rows){
				if (err)
					console.log("Error insrting : %s ", err);
				res.redirect('../list/'+data.idproject);
			});
		});
	}
	else res.redirect('/bad_login');
};

exports.disable_quiz = function(req,res){
	if(req.session.isAdminLogged){
		var idquiz = req.params.idquiz;
		var activated = req.params.activated;
		var idproject = req.params.idproject;
		req.getConnection(function(err, connection){
			connection.query('UPDATE quiz SET activated = ? WHERE idquiz = ? AND idproject = ?',[activated,idquiz,idproject],function(err,rows)
			{
				if(err) console.log("Error Selecting : %s ",err);

			res.redirect('/quiz/list/'+idproject);
			});
		});
	}else res.redirect('/bad_login')
};

//Logica borrar encuesta.
exports.delete_quiz = function(req,res){
	if(req.session.isAdminLogged){
		var idquiz = req.params.idquiz;
		var idproject = req.params.idproject;
		req.getConnection(function(err, connection){
			connection.query("DELETE FROM quiz WHERE idquiz = ? ",[idquiz], function(err,rows){
				if(err)
					console.log("Error deleting : %s", err);

				res.redirect('/quiz/list/'+idproject);
			});
		});
	}
	else
		res.redirect('/bad_login');
};

