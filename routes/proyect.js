

//Vista agregar proyectos
exports.add = function(req, res){
	var isAdminLogged = req.app.get('isAdminLogged');
	if (req.session.isAdminLogged){
		res.render('add_proyect',{page_title:"Add Proyect"});
	}
	else res.redirect('/bad_login');
};

//Logica agregar proyectos.