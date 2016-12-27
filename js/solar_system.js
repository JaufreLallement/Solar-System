centerScroll();

SELECTED_OBJ = null;

/**
 * This function centers the screen when the page is opened
 * @return : return to clear the variables
 */
function centerScroll() {
	var scroll = (document.getElementById('sun').getBoundingClientRect().left - document.body.getBoundingClientRect().left) - window.innerWidth / 2 + document.getElementById('sun').offsetWidth / 2;
	window.scrollTo(scroll, 0);
	return;
}

/**
*	This function updates the lock position to the position of the selected object depending on its coordinates
*	@param {object} obj : obj on which lock the position of the window
*	@return {boolean} : true if the screen is locked on an object, else false
*/
function updateLock(obj) {
	if (obj) {
		var x = SELECTED_OBJ.offset().left - ($(window).width() / 2) + (SELECTED_OBJ.width() / 2);
		var y = SELECTED_OBJ.offset().top - ($(window).height() / 2)  + (SELECTED_OBJ.height() / 2);
		window.scrollTo(x, y);
		return true;
	} else {
		SELECTED_OBJ = null;
		return false;
	}
}


/**
*	This function updates the date display and returns the corresponding day
*	@param {date} date : date to display
*	@return {int} date_d : day of the parameter date
*/
function displayDate(date) {
	var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	date_d = date.getDate();
	date_m = date.getMonth(),
	date_y = date.getFullYear();
	document.getElementById('date').innerHTML = "<span id='day'>" + date_d + "</span> " + "<span id='month'>" + months[date_m] + "</span> " + "<span id='year'>" + date_y + "</span>";
	return date_d;
}


/**
*	Calculates the coordinates of the given object
*	@param {string} obj_id : id of the wanted object
*	@return {int, int} obj_x, obj_y : coordinates of the given object
*/
function getObjCoord(obj_id) {
	var obj_id_left = document.getElementById(obj_id).getBoundingClientRect().left - document.body.getBoundingClientRect().left,
		obj_id_top = document.getElementById(obj_id).getBoundingClientRect().top - document.body.getBoundingClientRect().top;
	return [obj_id_left + document.getElementById(obj_id).offsetWidth / 2, obj_id_top + document.getElementById(obj_id).offsetHeight / 2];
}


/**
*	Calculates the coordinates of the wanted vector
*	@param {string, string} obj_id1, obj_id2 : ids of the wanted objects
*	@return {int, int} obj_x, obj_y : coordinates of the corresponding vector
*/
function getVectCoord(obj_id1, obj_id2) {
	return [getObjCoord(obj_id2)[0] - getObjCoord(obj_id1)[0], getObjCoord(obj_id2)[1] - getObjCoord(obj_id1)[1]];
}


/**
*	Calculates the norm of the wanted vector
*	@param {string, string} obj_id1, obj_id2 : ids of the wanted objects
*	@return {int} norm : norm of the vector
*/
function getVectNorm(obj_id1, obj_id2) {
	return Math.sqrt(Math.pow(getVectCoord(obj_id1, obj_id2)[0], 2) + Math.pow(getVectCoord(obj_id1, obj_id2)[1], 2));
}


/**
*	Calculates determinant of the two wanted vector
*	@param {string, string, string, string} vect1_obj1, vect1_obj2, vect2_obj1, vect2_obj2 : nodes of the two vectors
*	@return {int} determinant : determinant of the vectors
*/
function getVectsDet(vect1_obj1, vect1_obj2, vect2_obj1, vect2_obj2) {
	return getVectCoord(vect1_obj1, vect1_obj2)[0] * getVectCoord(vect2_obj1, vect2_obj2)[1] - getVectCoord(vect1_obj1, vect1_obj2)[1] * getVectCoord(vect2_obj1, vect2_obj2)[0];
}


/**
*	Determines if there is a transit
*	@param {String} obj_id : id of the concerned object 
*	@return {boolean} transit : true if there is a transit, else false
*/
function is_Transit(obj_id) {
	if (document.getElementById(obj_id) == null) {
		window.alert('Aucun objet ne correspond à ' + obj_id);
	} else {
		var transit_dates = null;

		if (obj_id === 'venus') {
			transit_dates = [546, 659, 667, 789, 902, 910, 1032, 1145, 1153, 1275, 1388, 1396, 1518, 1526, 1631, 1639, 1761, 1769, 1874, 1882, 2004, 2012, 2117, 2125, 2247, 2255, 2360, 2368, 2490, 2498, 2603, 2611, 2733, 2741, 2846];
		} else if (obj_id === 'mercury') {
			transit_dates =  [1631, 1651, 1661, 1677, 1743, 1753, 1769, 1802, 1815, 1822, 1832, 1835, 1845, 1848, 1861, 1868, 1878, 1881, 1891, 1894, 1907, 1914, 1924, 1927, 1937, 1940, 1953, 1957, 1960, 1970, 1973, 1986, 1993, 1999, 2003, 2006, 2016, 2019, 2032, 2039, 2049, 2052, 2062, 2065, 2078, 2085, 2095, 2098, 2108, 2111, 2124, 2131, 2141, 2144, 2154];
		}
		
		var det = getVectsDet('earth', obj_id, 'earth', 'sun'),
			norm_1 = getVectNorm('earth', obj_id),
			norm_2 = getVectNorm('earth', 'sun'),
			year = parseInt($('#year').text());

		if (obj_id === 'moon') {
			var norm_3 = getVectNorm('moon', 'sun');
			return [((det > -15000 && det < 10000) && (norm_3 < norm_2)), ((det > -10000 && det < 10000) && (norm_3 > norm_2))];
		} else {
			var btw_max = (obj_id === 'mercury') ? 45000 : 25000; 
			return ((det > -20000 && det < btw_max) && (norm_1 < norm_2) && (transit_dates.indexOf(year) != -1));	
		}
	}
}

/**
 * This function displays the correspunding message of transit for given object
 * @param {String} obj_id : id of the concerned object
 * @return {boolean} : false if the id does not correpond to any div, true if the message have been displayed
 */
function displayTransitMsg(obj_id) {
	if (document.getElementById(obj_id) == null) {
		window.alert('Impossible d\'afficher le message pour ' + obj_id);
	} else {
		var obj_alert = '#';
		if (obj_id === 'moon') {	
			if (getVectNorm('earth', 'sun') > getVectNorm('moon', 'sun')) obj_alert += 'solar-eclipse-alert'; 
			else obj_alert += 'lunar-eclipse-alert';
		} else {
			obj_alert += obj_id + '-transit-alert';
		}

		if ((obj_id !== 'moon' && is_Transit(obj_id)) || (obj_id === 'moon' && (is_Transit(obj_id)[0] || is_Transit(obj_id)[1]))) {
			var obj_x = getObjCoord(obj_id)[0],
				obj_y = getObjCoord(obj_id)[1];
			$(obj_alert).offset({top: obj_y - $(obj_alert).height() / 2, left: obj_x - $(obj_alert).width() / 2});
			$(obj_alert).fadeIn(400);
		} else {	
			$(obj_alert).fadeOut(400);
		}
	}
	return;
}

/**
 * This function calls the displayTransitMsg for all the concerned objects
 */
function manageTransitMsg() {
	displayTransitMsg('venus');
	displayTransitMsg('mercury');
	displayTransitMsg('moon');
	return;
}

$(document).ready(function() {


	$(document).on('mousedown', function(e) {
	    $(document).on('mousemove', function(evt) {
	        window.scrollTo(e.pageX - evt.clientX ,e.pageY - evt.clientY);
	    });
	}).on('mouseup', function() {
	    $(document).off('mousemove');
	});

	$(document).on('click', '.object, .object-link, .asteroid-belt', function(e) {
		e.stopPropagation();
		var obj = $(this).attr('id'), // Sauvegarde de l'id de l'objet cliqué
			obj_id = obj.substring(0, obj.lastIndexOf('-link') === -1 ? obj.length : obj.lastIndexOf('-link')); // Si l'id comprend la substring '-link', on la retire
		$('.desc').stop(true, true).fadeOut(500); // Fermeture des descriptions précédemment ouvertes
		$('#' + obj_id + '-desc').stop(true, true).fadeIn(500); // Affichage de la description correspondant à l'objet cliqué
	})

	.on('click', '.close', function() {
		$('.desc').stop(true, true).fadeOut(500); // Fermeture des descriptions précédemment ouvertes
	})

	.on('click', '.follow', function() {
		var obj_id = $(this).attr('id').replace('-follow', ''); // On récupère l'id de l'objet en retirant la substring en trop

		SELECTED_OBJ = $('#' + obj_id); // On met à jour l'objet sélectionné à suivre

		// Mise à jour de l'affichage
		$('.unfollow').removeClass('unfollow').addClass('follow').html('Suivre'); 
		$(this).removeClass('follow').addClass('unfollow').html('Ne plus suivre');
	})

	.on('click', '.unfollow, #unfollow-all', function() {
		SELECTED_OBJ = null; // Mise à jour de l'objet sélectionné
		$('.unfollow').removeClass('unfollow').addClass('follow').html('Suivre'); // Mise à jour de l'affichage
	});

	// Gestion de la date
	var today = new Date();
	displayDate(today);

	setInterval(function() {
		var day = displayDate(today);
		today.setDate(day + 1);
		displayDate(today);
	}, 695.24);


	// Gestion des Messages d'alertes liés aux événements astronomiques
	setInterval(function() {
		updateLock(SELECTED_OBJ); // Mise à jour du suivi de l'objet sélectionné
		manageTransitMsg();
	}, 0.001);
	
});