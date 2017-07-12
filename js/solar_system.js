/* -------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------ JavaScript for Solarys project ------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------------- */


/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- EARLY OPERATIONS ----------------------------------------------------------- */
/**
 * Centering of the screen
 */

let helios = System.all();
document.getElementById('solar-system-container').innerHTML += helios.toHtml();

window.scrollTo(document.getElementById('sun').getCenteredCoords()[0], 0);


/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- GLOBAL VARIABLES ----------------------------------------------------------- */
/**
 * Global variable : current selected object. Corresponds to the object which the user choose to follow, exemple : Earth, Moon, Jupiter, etc.
 * {HTMLElement} : DOM element
 */
FOLLOWED_OBJ = null;

/**
 * Global variable : vector between HTMLElement#earth and HTMLElement#sun
 * {DOMElementVector} : vector between the two HTMLElement
 */
EARTH_SUN_VECTOR = new DOMElementVector(document.getElementById('earth'), document.getElementById('sun'));

/**
 * Global variable : vector between HTMLElement#moon and HTMLElement#sun
 * {DOMElementVector} : vector between the two HTMLElement
 */
MOON_SUN_VECTOR = new DOMElementVector(document.getElementById('moon'), document.getElementById('sun'));



/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- FUNCTIONS ----------------------------------------------------------- */
/**
 *	This function updates the lock position to the position of the selected object depending on its coordinates
 *	@return {boolean} : true if the screen is locked on an object, else false
 */
function updateLock() {
    if (FOLLOWED_OBJ) {
        /*let x = FOLLOWED_OBJ.getCenteredCoords()[0],
            y = FOLLOWED_OBJ.getCenteredCoords()[1]; 
        window.scrollTo(x, y);*/
        FOLLOWED_OBJ.scrollIt();
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
HTMLElement.prototype.updateFollow = function() {
    if (this) {
        let element_f = document.getElementById(this.id + '-follow');
        if (element_f.className.indexOf('unfollow') === -1) {
            let previous_f = document.getElementsByClassName('unfollow')[0];
            if (previous_f) {
                toggleFollowInterface(previous_f, false); /** @see solar_system.js#toggleFollowInterface() */
            }
            toggleFollowInterface(element_f, true); /** @see solar_system.js#toggleFollowInterface() */
            FOLLOWED_OBJ = this;
        } else {
            toggleFollowInterface(element_f, false); /** @see solar_system.js#toggleFollowInterface() */
            FOLLOWED_OBJ = null;
        }
        return true;
    } else {
        return false;
    }
}

/**
 * This function update the speed of the orbit of an object by multiply its original orbit speed by an acceleration value
 * @param {Object} element : DOM element corresponding to the spacial object
 * @param {double} acceleration : value by which multiply original orbit speed of the element
 * @return {double} : if the element exists and if the acceleration value is between 0 and 100, returns the new speed, else display an alert
 */
function updateOrbitSpeed(element, acceleration) {
    if (element && (acceleration >= 0 && acceleration <= 100)) {
        let speed = parseFloat(getComputedStyle(element)['animationDuration']) * acceleration;
        element.style.animationDuration = speed + 's';
        return speed;
    } else {
        window.alert('Element introuvable ou acceleration invalide');
    }
}


/**
 *	This function updates the date display and returns the corresponding day
 *	@param {date} date : date to display
 *	@return {int} date_d : day of the parameter date
 */
function displayDate(date) {
    let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    date_d = date.getDate(),
        date_m = date.getMonth(),
        date_y = date.getFullYear();
    document.getElementById('date').innerHTML = "<span id='day'>" + date_d + "</span> " + "<span id='month'>" + months[date_m] + "</span> " + "<span id='year'>" + date_y + "</span>";
    return date_d;
}


/**
 *	Determines if there is a transit
 *	@param {String} obj_id : id of the concerned object 
 *	@return {boolean} transit : true if there is a transit, else false
 */
function is_Transit(obj_id) {
    if (document.getElementById(obj_id) == null) {
        window.alert('Aucun objet ne correspond à ' + obj_id);
        return;
    } else {
        let transit_dates = null;

        if (obj_id === 'venus') {
            transit_dates = [546, 659, 667, 789, 902, 910, 1032, 1145, 1153, 1275, 1388, 1396, 1518, 1526, 1631, 1639, 1761, 1769, 1874, 1882, 2004, 2012, 2117, 2125, 2247, 2255, 2360, 2368, 2490, 2498, 2603, 2611, 2733, 2741, 2846];
        } else if (obj_id === 'mercury') {
            transit_dates = [1631, 1651, 1661, 1677, 1743, 1753, 1769, 1802, 1815, 1822, 1832, 1835, 1845, 1848, 1861, 1868, 1878, 1881, 1891, 1894, 1907, 1914, 1924, 1927, 1937, 1940, 1953, 1957, 1960, 1970, 1973, 1986, 1993, 1999, 2003, 2006, 2016, 2019, 2032, 2039, 2049, 2052, 2062, 2065, 2078, 2085, 2095, 2098, 2108, 2111, 2124, 2131, 2141, 2144, 2154];
        }

        let earth_obj = new DOMElementVector(document.getElementById('earth'), document.getElementById(obj_id)),
            year = parseInt(document.getElementById('year').innerHTML);

        if (obj_id === 'moon') {
            return [(earth_obj.isCollinear(EARTH_SUN_VECTOR, 20000) && (MOON_SUN_VECTOR.compareNorm(EARTH_SUN_VECTOR) === -1)), (earth_obj.isCollinear(EARTH_SUN_VECTOR, 20000) && (MOON_SUN_VECTOR.compareNorm(EARTH_SUN_VECTOR) === 1))];
        } else {
            var margin = (obj_id === 'mercury') ? 45000 : 25000;
            return (earth_obj.isCollinear(EARTH_SUN_VECTOR, margin) && (earth_obj.compareNorm(EARTH_SUN_VECTOR) === -1) && (transit_dates.indexOf(year) != -1));
        }
    }
}

/**
 * This function displays the correspunding message of transit for given object
 * @param {String} obj_id : id of the concerned object
 * @return {boolean} : false if the id does not correpond to any div, true if the message have been displayed
 */
function displayTransitMsg(obj_id) {
    if (!document.getElementById(obj_id)) {
        window.alert('Impossible d\'afficher le message pour ' + obj_id);
    } else {
        let obj_alert;
        if (obj_id === 'moon') {
            if (EARTH_SUN_VECTOR.vectorNorm() > MOON_SUN_VECTOR.vectorNorm()) obj_alert = 'solar-eclipse-alert'; /** @see DOMElementVector.class.js#vectorNorm()  */
            else obj_alert = 'lunar-eclipse-alert';
        } else {
            obj_alert = obj_id + '-transit-alert';
        }

        /** @see solar_system.js#is_Transit()  */
        if ((obj_id !== 'moon' && is_Transit(obj_id)) || (obj_id === 'moon' && (is_Transit(obj_id)[0] || is_Transit(obj_id)[1]))) {
            let obj_x = document.getElementById(obj_id).getScreenLeft(),
                /** @see mfg.js#getScreenLeft() */
                obj_y = document.getElementById(obj_id).getScreenTop(); /** @see mfg.js#getScreenTop() */

            document.getElementById(obj_alert).setPosition(obj_x - (document.getElementById(obj_alert).clientWidth / 2.5), obj_y);
            document.getElementById(obj_alert).fadeIn(500);
        } else {
            document.getElementById(obj_alert).fadeOut(500);
        }
    }
    return;
}

/**
 * This function calls the displayTransitMsg for all the concerned objects
 */
function manageTransitMsg() {
    displayTransitMsg('venus'); /** @see solar_system.js#displayTransitMsg()  */
    displayTransitMsg('mercury'); /** @see solar_system.js#displayTransitMsg()  */
    displayTransitMsg('moon'); /** @see solar_system.js#displayTransitMsg()  */
    return;
}



/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- LISTENERS ----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {

    /**
     *  Listeners which allow the grabscroll
     */
    let grabscroll;
    document.addEventListener('mousedown', e => {
        grabscroll = function(evt) {
            window.scrollTo(e.pageX - evt.clientX, e.pageY - evt.clientY);
        };
        document.addEventListener('mousemove', grabscroll, false);
    }, false);
    document.addEventListener('mouseup', e => {
        document.removeEventListener('mousemove', grabscroll);
    }, false);

    /**
     *  Listener which allows to display or hide an object description when the user click on an object or one of its link
     */
    document.addEventListener('click', function(e) {
        e.stopPropagation();
        let target_class = e.target.className;
        if (e.target && (target_class.indexOf('object') !== -1 || target_class.indexOf('object-link') !== -1)) {
            let id = (target_class.indexOf('-link') !== -1) ? target_class.slice(target_class.lastIndexOf(' ') + 1, target_class.lastIndexOf('-link')) : e.target.id.substring(0, e.target.id.length);
            if (document.getElementById('card-desc').className.includes('faded-in')) document.getElementById('card-desc').fadeOut(500);
            helios.findObj(id).fillCard();
            document.getElementById('card-desc').fadeIn(500);
        }
    }, false);

    /**
     *  Listener which allows to close an object description when the user click on the close cross
     */
    document.getElementsByClassName('close').addClassListener('click', function() { this.parentNode.fadeOut(500) }, false);


    /**
     * Listener which allows the user to follow an object
     */
    document.getElementsByClassName('follow').addClassListener('click', function() {
        let id = this.id.replace('-follow', '');
        document.getElementById(id).updateFollow(); /** @see solar_system.js#updateFollow() */
    }, false);


    /**
     * Listener which allows the user to unfollow an object
     */
    document.getElementsByClassName('unfollow').addClassListener('click', function() {
        if (FOLLOWED_OBJ) FOLLOWED_OBJ.updateFollow(); /** @see solar_system.js#updateFollow() */
    }, false);

    document.getElementById('unfollow-all').addEventListener('click', function() {
        if (FOLLOWED_OBJ) FOLLOWED_OBJ.updateFollow(); /** @see solar_system.js#updateFollow() */
    }, false);

    /*
        let today = new Date();
        displayDate(today); 
        setInterval(() => {
            let day = displayDate(today); 
            today.setDate(day + 1);
            displayDate(today); 
        }, 695.24);
*/
    setInterval(() => {
        updateLock();
    }, 5000);

}, false);