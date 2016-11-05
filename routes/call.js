//Redirección y consulta de la encuesta
exports.start_surveys = function(req, res){
	if(req.session.isUserLogged){

		var proyect = req.params.proyectname;

		if(typeof req.session.quizes == 'undefined'){

		    req.getConnection(function (err, connection) {

		        connection.query("SELECT * FROM quiz WHERE idproyect = ?",[proyect], function(err, rows)
		        {
		            if(err)
		                console.log("Error : %s ", err);
		            
		            req.session.quizes = rows;		             
		        });
		        
		    });			
		}

		var rand = Math.floor(Math.random() * req.session.quizes.length);

		req.session.selected_number = rand;

		req.getConnection(function (err, connection) {

			connection.query("SELECT * FROM contact WHERE NOT EXIST (SELECT * FROM call WHERE idquiz = ?)", [req.session.quizes[rand].idquiz], function(err, rows)
				{
					if(err)
		                console.log("Error : %s ", err);

		            res.render('call',{page_title:"Call",data:rows});

				})

		});

	}
	else res.redirect('/bad_login');
}