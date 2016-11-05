//Redirección y consulta de la encuesta
exports.start_surveys = function(req, res){
	if(req.session.isUserLogged){

		if(typeof req.session.quizes == 'undefined'){

		    req.getConnection(function (err, connection) {

		    	var proyect = req.params.proyectname;

		        connection.query("SELECT link FROM quiz WHERE idproyect = ?",[proyect], function(err, rows)
		        {
		    
		            if(err)
		                console.log("Error deleting : %s ", err);
		            
		            req.session.quizes = rows;

		            res.redirect('/contact');
		             
		        });
		        
		    });			
		}



	    req.getConnection(function (err, connection) {
	        
	        connection.query("SELECT FROM quiz INNER JOIN proyect ON  ",[phone], function(err, rows)
	        {
	            
	             if(err)
	                 console.log("Error deleting : %s ",err );
	            
	             res.redirect('/contact');
	             
	        });
	        
	    });
	}
	else res.redirect('/bad_login');
}