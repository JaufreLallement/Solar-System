                            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
                            /* ------------------------------------------ MELKOR GLOBAL FRAMEWORK JS ------------------------------------------ */
                            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- FUNCTIONS ----------------------------------------------------------- */

/**
 * This function returns the left position of the element relatively to the screen
 * @return {double} : relative left position of the element
 */
HTMLElement.prototype.getScreenLeft = function() {
	return this.getBoundingClientRect().left;
}


/**
 * This function returns the top position of the element relatively to the screen
 * @return {double} : relative top position of the element
 */
HTMLElement.prototype.getScreenTop = function() {
	return this.getBoundingClientRect().top;
}


/**
 * This function returns the left position of a DOM element relative to the window
 * @return {double} : left position
 */
HTMLElement.prototype.getLeft = function() {
	return this.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
}


/**
 * This function returns the top position of a DOM element relative to the window
 * @return {double} : top position
 */
HTMLElement.prototype.getTop = function() {
	return this.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
}


/**
 * Set the position of the element
 * @param {double} x : x position to set to the element
 * @param {double} y : y position to set to the element
 * @return
 */
HTMLElement.prototype.setPosition = function (x, y) {
	this.style.left = x + 'px';
	this.style.top = y + 'px';
	return;
}


/**
 * This function returns the coordinates that allows the screen to be centered on the element in arguments
 * @param {Object} element : corresponds to the DOM element on which we want to center the screen
 * @return {double[]} : centered coordinates [x, y]
 */
HTMLElement.prototype.getCenteredCoords = function() {
	return [this.getLeft() - window.innerWidth / 2 + this.offsetWidth / 2, this.getTop() - window.innerHeight / 2 + this.offsetHeight / 2];
}


/**
 * This function returns the x coordinates of the center of the element
 * @param {Object} element : the element of which we want to know the x coordinate of its center
 * @return {double[]} : x coordinate of the center of the element
 */
HTMLElement.prototype.getCoords = function() {
	return [this.getLeft() + this.offsetWidth / 2, this.getTop() + this.offsetHeight / 2];
}


/**
 * This function fade in or out the element on which it is called
 * This function needs the MFG.css to work
 * @return {boolean} : true if the object exists, else false
 */
HTMLElement.prototype.fade =  function() {
	if (this && this.className.indexOf('faded')) {
		 if (this.className.indexOf('faded-in') > -1) {
			 this.className = this.className.replace('-in', '-out');
		 } else {
			 var n_elements = document.getElementsByClassName('faded-in').length;
			 if (n_elements > 0) {
				 if (n_elements === 1) {
					 document.getElementsByClassName('faded-in')[0].className = document.getElementsByClassName('faded-in')[0].className.replace('-in', '-out');
				 } else {
					 document.getElementsByClassName('faded-in')[n_elements].className = document.getElementsByClassName('faded-in')[n_elements].className.replace('-in', '-out');
				 }
				 this.className = this.className.replace('-out', '-in');
			 } else {
				 this.className = this.className.replace('-out', '-in');
			 }
		 }
		return true;
	} else {
		window.alert('Impossible de trouver l\'objet correspondant à l\'identifiant ' + this.id + '!');
		return false;
	}
}


/**
 * This function add an event listener on each element of the given class
 * @param {String} event : event to listen
 * @param {function} func : function to apply when the event happen
 * @param {boolean} useCapture : true - The event handler is executed in the capturing phase; false- Default. The event handler is executed in the bubbling phase
 * @return
 */
HTMLCollection.prototype.addClassListener = function(event, func, useCapture) {
	for (i = 0; i < this.length; i++) {
		this[i].addEventListener(event, func, useCapture);
	}
	return;
}


/**
 * This function add an event listener on each element of each given class
 * @param {String} event : event to listen
 * @param {function} func : function to apply when the event happen
 * @param {boolean} useCapture : true - The event handler is executed in the capturing phase; false- Default. The event handler is executed in the bubbling phase
 * @return
 */
Array.prototype.addMultipleClassListener = function(event, func, useCapture) {
	for (j = 0; j < this.length; j++) {
		document.getElementsByClassName(this[j]).addClassListener(event, func, useCapture);
	}
	return;
}


/**
*	This function allows the user to lock the scroll to focus a specific element of the DOM
*	@param {int} speed : base speed of the scroll
*	@return
*/
HTMLElement.prototype.smoothYScrollTo = function (duration) {
	 if (duration <= 0) return;
        var element = this,
			difference = this.getTop() - document.body.scrollTop,
        	increment = difference / duration * 2;

    setTimeout(function() {
        document.body.scrollTop += increment;
        element.smoothYScrollTo(duration - 1);
    }, 10);
}


/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- LISTENERS ----------------------------------------------------------- */

