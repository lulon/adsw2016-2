//Redirección y consulta de la encuesta
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

					connection.query("SELECT * FROM contact WHERE idcontact NOT IN (SELECT idcontact FROM `call` WHERE idquiz = ?) ORDER BY RAND() LIMIT 1", [selected_quizes[rand].idquiz], function(err, rows)
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

		req.getConnection(function (err, connection)
			{
				var nowdate = new Date();
				var data = {
					idcontact: req.session.current_idcontact.toString(),
					idquiz: req.session.selected_quizes[req.session.selected_number].idquiz.toString(),
					duration: "60", //hay que implementar esto con la grabación
					date: nowdate.toLocaleDateString(),
					status: req.params.result.toString()
				};
				connection.query("INSERT INTO `call` set ? ",data,function(err, rows){
					if (err) console.log("Error inserting : %s", err);

					res.redirect('/call/' + req.session.selected_idproject);
				});
			})

	}
	else res.redirect('/bad_login');
}