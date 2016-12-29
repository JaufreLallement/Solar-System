				/* -------------------------------------------------------------------------------------------------------------------- */
				/* ------------------------------------------ JavaScript for Solarys project ------------------------------------------ */
				/* -------------------------------------------------------------------------------------------------------------------- */


centerScroll(); /** @see solar_system.js#centerScroll() : 21 */

/**
 * Global variable : current selected object. Corresponds to the object which the user choose to follow, exemple : Earth, Moon, Jupiter, etc.
 * {Object} : DOM element
 */
SELECTED_OBJ = null;

/**
 * Global variable : current opened description. Corresponds to the description of an object of the solar system which is currently displayed.
 * Only one can be displayed at a time.
 * {Object} : DOM element
 */
OPENED_DESC = null;

/**
 * This function centers the scroll when the page is loaded
 * @return : return to clear variables
 */
function centerScroll() {
	var scroll = (document.getElementById('sun').getBoundingClientRect().left - document.body.getBoundingClientRect().left) - window.innerWidth / 2 + document.getElementById('sun').offsetWidth / 2;
	window.scrollTo(scroll, 0);
	return;
}

/**
*	This function updates the lock position to the position of the selected object depending on its coordinates
*	@return {boolean} : true if the screen is locked on an object, else false
*/
function updateLock() {
	if (SELECTED_OBJ) {
		var x = (SELECTED_OBJ.getBoundingClientRect().left - document.body.getBoundingClientRect().left) - (window.innerWidth / 2) + (SELECTED_OBJ.offsetWidth / 2);
		var y = (SELECTED_OBJ.getBoundingClientRect().top - document.body.getBoundingClientRect().top) - (window.innerHeight / 2) + (SELECTED_OBJ.offsetHeight / 2);
		window.scrollTo(x, y);
		return true;
	} else {
		return false;
	}
}

/**
 * This function change the class and the HTML content of the following "button" when the corresponding object is folowed
 * @param {Object} element : DOM element which must be updated
 * @param {boolean} state : true if the corresponding object is followed, false if it is unfollowed
 */
function toggleFollowInterface(element, state) {
	element.innerHTML = (state) ? 'Ne plus suivre' : 'Suivre';
	element.className = (state) ? element.className.replace('follow', 'unfollow') : element.className.replace('unfollow', 'follow');
}

/**
 * This function updates the classes for concerned objects
 * @param {String} obj_id : id of the object on which lock the position of the window
 * @return {boolean} : true if the id corresponds to an existing element, else false
 */
function updateFollow(obj_id) {
	var element = document.getElementById(obj_id);
	if (element) {
		var element_f = document.getElementById(obj_id + '-follow'); 
		if (element_f.className.indexOf('unfollow') === -1) {
			var previous_f = document.getElementsByClassName('unfollow')[0];
			if (previous_f) {
				toggleFollowInterface(previous_f, false); /** @see solar_system.js#toggleFollowInterface() : 46 */
			}
			toggleFollowInterface(element_f, true); /** @see solar_system.js#toggleFollowInterface() : 46 */
			SELECTED_OBJ = element;
		} else {
			toggleFollowInterface(element_f, false); /** @see solar_system.js#toggleFollowInterface() : 46 */
			SELECTED_OBJ = null;
		}
		return true;
	} else {
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
	return [getObjCoord(obj_id2)[0] - getObjCoord(obj_id1)[0], getObjCoord(obj_id2)[1] - getObjCoord(obj_id1)[1]]; /** @see solar_system.js#getObjCoord() : 99 */
}


/**
*	Calculates the norm of the wanted vector
*	@param {string, string} obj_id1, obj_id2 : ids of the wanted objects
*	@return {int} norm : norm of the vector
*/
function getVectNorm(obj_id1, obj_id2) {
	return Math.sqrt(Math.pow(getVectCoord(obj_id1, obj_id2)[0], 2) + Math.pow(getVectCoord(obj_id1, obj_id2)[1], 2)); /** @see solar_system.js#getVectCoord() : 111 */
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
			if (document.getElementById(obj_alert.replace('#', '')).className.indexOf('faded-in') === -1) {
				fadeIn(obj_alert.replace('#', ''));
			}
		} else {
			if (document.getElementById(obj_alert.replace('#', '')).className.indexOf('faded-out') === -1) {
				fadeOut(obj_alert.replace('#', ''));
			}
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

/**
 * This function displays the element in parameters with animation and attributes the element to global variabl OPENED_DESC. Combination with CSS transition.
 * @param {String} obj_id : id of the object to display
 * @return {boolean} : true if the id in parameter corresponds to an existing object, else false
 */
function fadeIn(obj_id) {
	if (document.getElementById(obj_id)) {
		var obj_classes = document.getElementById(obj_id).className;
		if (obj_classes.indexOf('desc') > -1) {
			if (OPENED_DESC != document.getElementById(obj_id)) {
				OPENED_DESC = document.getElementById(obj_id);
			}
		}
		document.getElementById(obj_id).className = obj_classes.replace('faded-out', 'faded-in');
		return true;
	} else {
		window.alert('Impossible de trouver l\'objet correspondant à l\'identifiant ' + obj_id + '!');
		return false;
	}
}

/**
 * This function hide the opened description
 * @return {boolean} : true if the object exists, else false
 */
function fadeOut(obj_id) {
	if (document.getElementById(obj_id)) {
		var obj_classes = document.getElementById(obj_id).className;
		if (OPENED_DESC == document.getElementById(obj_id)) {
			OPENED_DESC = null;
		}
		document.getElementById(obj_id).className = obj_classes.replace('faded-in', 'faded-out');
		return true;
	} else {
		console.log('coucou')
		return false;
	}
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
		var obj = $(this).attr('id'),
			obj_id = obj.substring(0, obj.lastIndexOf('-link') === -1 ? obj.length : obj.lastIndexOf('-link'));
		if (OPENED_DESC) fadeOut(OPENED_DESC.id);
		fadeIn(obj_id + '-desc');
	})

	.on('click', '.close', function() {
		fadeOut(OPENED_DESC.id);
	})

	.on('click', '.follow', function() {
		var obj_id = $(this).attr('id').replace('-follow', '');
		updateFollow(obj_id);
	})

	.on('click', '.unfollow, #unfollow-all', function() {
		if (SELECTED_OBJ) updateFollow(SELECTED_OBJ.id);
	});

	var today = new Date();
	displayDate(today);
	setInterval(function() {
		var day = displayDate(today);
		today.setDate(day + 1);
		displayDate(today);
	}, 695.24);

	setInterval(function() {
		updateLock();
		manageTransitMsg();
	}, 0.001);
	
});