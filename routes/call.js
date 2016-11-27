//Redirección y consulta de la encuesta

exports.list = function(req, res){	
  	if(req.session.isAdminLogged){
	    req.getConnection(function(err,connection){
	           
	            var query = connection.query('SELECT * FROM user',function(err,rows)
	            {
	                
	                if(err)
	                    console.log("Error Selecting : %s ",err );
	         
	                res.render('user_list',{page_title:"User Calls",data:rows});
	                    
	             });
	             //console.log(query.sql);
	        });
    }
    else res.redirect('/bad_login');  
};

exports.stats = function(req, res){
  if(req.session.isAdminLogged){
  	req.getConnection(function(err,connection){
	    var query = connection.query('SELECT * FROM call WHERE iduser = ?',req.params.iduser,function(req,res){
	      if(err) console.log("Error Selecting : %s ", err);
	      
	      //res.render('')
	    });
	});
  }
    else res.redirect('/bad_login');
};

exports.start_surveys = function(req, res){
	if(req.session.isUserLogged){

		req.getConnection(function (err, connection) {

			if(req.session.selected_idproject != 'undefined'){
				var rand = Math.floor(Math.random() * req.session.selected_quizes.length);
				connection.query("SELECT * FROM contact WHERE idcontact NOT IN (SELECT idcontact FROM `call` WHERE idquiz = ? AND status = 'success' ) ORDER BY RAND() LIMIT 1", [req.session.selected_quizes[rand].idquiz], function(err, rows)
				{
					if(err)
						console.log("Error : %s ", err);

					req.session.selected_number = rand;
					req.session.current_idcontact = rows[0].idcontact;
					res.render('call',{page_title:"Call",data:rows,link:req.session.selected_quizes[rand].link});

				});
			} else {
				var idproject = req.params.idproject;
				connection.query("SELECT * FROM quiz JOIN project ON project.idproject = quiz.idproject WHERE quiz.idproject = ?",[idproject], function(err, rows)
				{
					if(err)
						console.log("Error : %s ", err);

					var selected_quizes = rows;
					var rand = Math.floor(Math.random() * selected_quizes.length);

					connection.query("SELECT * FROM contact WHERE idcontact NOT IN (SELECT idcontact FROM `call` WHERE idquiz = ? AND status = 'success' ) ORDER BY RAND() LIMIT 1", [selected_quizes[rand].idquiz], function(err, rows)
					{
						if(err)
							console.log("Error : %s ", err);

						req.session.selected_idproject = idproject;
						req.session.selected_number = rand;
						req.session.current_idcontact = rows[0].idcontact;
						req.session.selected_quizes = selected_quizes;

						res.render('call',{page_title:"Call",data:rows,link:selected_quizes[rand].link});

					});
				});
			}
		});
	}
	else res.redirect('/bad_login');
}


exports.save = function(req, res){
	if(req.session.isUserLogged){
		var status = req.params.result;
		if (status == 'notexist'){
			res.redirect('/contact/delete/' + req.session.current_idcontact)
		} else {
            req.getConnection(function (err, connection)
            {
                var nowdate = new Date();
                var data = {
                	iduser: req.session.idUser,
                    idcontact: req.session.current_idcontact.toString(),
                    idquiz: req.session.selected_quizes[req.session.selected_number].idquiz.toString(),
                    duration: "60", //hay que implementar esto con la grabación
                    date: nowdate.toLocaleDateString(),
                    status: status
                };
                connection.query("INSERT INTO `call` set ? ",data,function(err, rows){
                    if (err) console.log("Error inserting : %s", err);

                    res.redirect('/call/' + req.session.selected_idproject);
                });
            });
        }

	}
	else res.redirect('/bad_login');
}