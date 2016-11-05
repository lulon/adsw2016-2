//Redirección y consulta de la encuesta
exports.start_surveys = function(req, res){
	if(req.session.isUserLogged){

		var proyect = req.params.proyectname;
		req.session.selected_proyect = proyect;

		if(typeof req.session.selected_quizes == 'undefined'){

		    req.getConnection(function (err, connection) {

		        connection.query("SELECT * FROM quiz WHERE idproyect = ?",[proyect], function(err, rows)
		        {
		            if(err)
		                console.log("Error : %s ", err);
		            
		            req.session.selected_quizes = rows;		             
		        });
		        
		    });			
		}

		var rand = Math.floor(Math.random() * req.session.selected_quizes[0].length);

		req.session.selected_number = rand;

		req.getConnection(function (err, connection) {

			connection.query("SELECT * FROM contact WHERE NOT EXISTS (SELECT idcontact FROM `call` WHERE idquiz = ?) ORDER BY RAND() LIMIT 1", [req.session.quizes[rand].idquiz], function(err, rows)
				{
					if(err)
		                console.log("Error : %s ", err);

		            res.render('call',{page_title:"Call",data:rows,link:req.session.selected_quizes[rand].link});

				})

		});

	}
	else res.redirect('/bad_login');
}

/*exports.save = function(req, res){
	if(req.session.isUserLogged){

		var input = JSON.parse(JSON.stringify(req.body));

		req.getConnection(function (err, connection)
			{
				var data = 
			})

	}
	else res.redirect('/bad_login');
}*/