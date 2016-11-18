//Redirección y consulta de la encuesta
exports.start_surveys = function(req, res){
	if(req.session.isUserLogged){

		var idproject = req.params.idproject;

		req.getConnection(function (err, connection) {

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
						req.session.selected_quizes = selected_quizes;	

						console.log(rows)

			            res.render('call',{page_title:"Call",data:rows,link:selected_quizes[rand].link});

					});	       
	        });
		});	
	}
	else res.redirect('/bad_login');
}

exports.save = function(req, res){
	if(req.session.isUserLogged){

		var status_result = req.params.result;
		var idcontact = req.params.idcontact;

		req.getConnection(function (err, connection)
			{
				var nowdate = new Date();
				var data = {
					idcontact	:input.name,
					idquiz		:req.session.selected_quizes[req.session.selected_number].idquiz,
					duration	:60, //hay que implementar esto con la grabación
					date		:nowdate.toLocaleDateString(),
					status		:input
				};
				connection.query("INSERT INTO call set ? ",data,function(err, rows){
					if (err) console.log("Error inserting : %s", err);

					res.redirect('/call/' + req.session.selected_idproject);
				});
			})

	}
	else res.redirect('/bad_login');
}