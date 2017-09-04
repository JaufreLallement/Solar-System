/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* ------------------------------------------ MELKOR GLOBAL FRAMEWORK JS ------------------------------------------ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- FUNCTIONS ----------------------------------------------------------- */

/**
 * Returns the height of the viewport
 * @return {double} : height of the viewport
 */
function getWindowHeight() { return Math.max(document.documentElement.clientHeight, window.innerHeight) }


/**
 * Returns the width of the viewport
 * @return {double} : width of the viewport
 */
function getWindowWidth() { return Math.max(document.documentElement.clientWidth, window.innerWidth) }


/**
 * Returns the collection on which the scroll will be done depending on the used browser
 * @return {HTMLCollection} body : valid collection on which apply the scroll effect, document.documentElement - Firefox, document.body - Chrome
 */
function checkBody() {
    document.documentElement.scrollTop += 1;
    const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
    document.documentElement.scrollTop -= 1;
    return body;
}


/**
 * This function returns the left position of the element relatively to the screen
 * @return {double} : relative left position of the element
 */
HTMLElement.prototype.getScreenLeft = function() { return this.getBoundingClientRect().left }


/**
 * This function returns the top position of the element relatively to the screen
 * @return {double} : relative top position of the element
 */
HTMLElement.prototype.getScreenTop = function() { return this.getBoundingClientRect().top }


/**
 * This function returns the left position of a DOM element relatively to the document
 * @return {double} : left position
 */
HTMLElement.prototype.getLeft = function() { return Math.round(this.getBoundingClientRect().left - document.body.getBoundingClientRect().left) }


/**
 * This function returns the top position of a DOM element relatively to the document
 * @return {double} : top position
 */
HTMLElement.prototype.getTop = function() { return Math.round(this.getBoundingClientRect().top - document.body.getBoundingClientRect().top) }


/**
 * Set the position of the element
 * @param {double} x : x position to set to the element
 * @param {double} y : y position to set to the element
 * @return
 */
HTMLElement.prototype.setPosition = function(x = 0, y = 0) {
    this.style.left = x + 'px';
    this.style.top = y + 'px';
    return `x: ${x}, y: ${y}`;
}


/**
 * This function returns the coordinates that allows the screen to be centered on the element in arguments
 * @param {Object} element : corresponds to the DOM element on which we want to center the screen
 * @return {double[]} : centered coordinates [x, y]
 */
HTMLElement.prototype.getCenteredCoords = function() { return [this.getLeft() - window.innerWidth / 2 + this.offsetWidth / 2, this.getTop() - window.innerHeight / 2 + this.offsetHeight / 2] }


/**
 * This function returns the x coordinates of the center of the element
 * @param {Object} element : the element of which we want to know the x coordinate of its center
 * @return {double[]} : x coordinate of the center of the element
 */
HTMLElement.prototype.getCoords = function() { return [this.getLeft() + this.offsetWidth / 2, this.getTop() + this.offsetHeight / 2] }


/**
 * Add the given class to the element
 * @param {String} className : class to add to the element
 * @return {String} : classes of the element after the modification
 */
HTMLElement.prototype.addClass = function(className) { this.className += (this.className.includes(className)) ? '' : (this.className.length === 0) ? className : ` ${className}` }


/**
 * Remove the given class from the element
 * @param {String} className : class to remove from the element
 * @return {String} : classes of the element after the modification
 */
HTMLElement.prototype.removeClass = function(className) { if (this.className.includes(className)) this.className = this.className.replace(className, '').trim() }


/**
 * Replace the given class of the element by another
 * @param {String} prevClass : class to replace
 * @param {String} newClass : new class
 * @return {String} : classes of the element after the modification
 */
HTMLElement.prototype.replaceClass = function(prevClass, newClass) { if (this.className.includes(prevClass)) this.className = this.className.replace(prevClass, newClass) }


/**
 * Add the given class to each element that has the given class
 * @param {String} className : class to add to the elements
 * @return {boolean} : true - the array contains elements, false - the array is empty
 */
HTMLCollection.prototype.addClass = function(className) {
    if (this.length > 0) {
        for (let element of this) {
            element.addClass(className);
        }
        return true;
    } else {
        return false;
    }
}


/**
 * Remove the given class from each element that has the given class
 * @param {String} className : class to remove from the elements
 * @return {boolean} : true - the array contains elements, false - the array is empty
 */
HTMLCollection.prototype.removeClass = function(className) {
    if (this.length > 0) {
        for (let element of this) {
            element.removeClass(className);
        }
        return true;
    } else {
        return false;
    }
}


/**
 * Replace the given class by another for each element
 * @param {String} prevClass : class to replace
 * @param {String} newClass : new class
 * @return {boolean} : true - the array contains elements, false - the array is empty
 */
HTMLCollection.prototype.replaceClass = function(prevClass, newClass) {
    if (this.length > 0) {
        for (let element of this) {
            element.replaceClass(prevClass, newClass);
        }
        return true;
    } else {
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
    for (let element of this) {
        element.addEventListener(event, func, useCapture);
    }
}


/**
 * This function add an event listener on each element of each given class
 * @param {String} event : event to listen
 * @param {function} func : function to apply when the event happen
 * @param {boolean} useCapture : true - The event handler is executed in the capturing phase; false- Default. The event handler is executed in the bubbling phase
 * @return
 */
Array.prototype.addMultipleClassListener = function(event, func, useCapture) {
    for (let className of this) {
        document.getElementsByClassName(className).addClassListener(event, func, useCapture);
    }
}


/**
 * This function apply the given style for the given property for each element of the class on which the function is called
 * @param {String} property : css property
 * @param {String} style : css style of the property
 * @return
 */
HTMLCollection.prototype.css = function(property, style) {
    for (let element of this) {
        element.style[property] = style;
    }
}


/**
 * This function set the style of a given css3 (managing compatibility with all the necessary prefixes) property for the element on which it is called
 * @param {String} property : css property to modify / set
 * @param {String} style : style to apply
 * @return
 */
HTMLElement.prototype.css3 = function(property, style) {
    let majProperty = property.capsFirstLetter();
    this.style["webkit" + majProperty] = style;
    this.style["moz" + majProperty] = style;
    this.style["ms" + majProperty] = style;
    this.style["o" + majProperty] = style;
    this.style[property] = style;
}


/**
 * This function set the style of a given css3 (managing compatibility with all the necessary prefixes) property for all the elements
 * @param {String} property : css property to modify / set
 * @param {String} style : style to apply
 * @return
 */
HTMLCollection.prototype.css3 = function(property, style) {
    for (let element of this) {
        element.css3(property, style)
    }
}


/**
 * This function returns the given string with first character in caps.
 * @return {String} : modified string.
 */
String.prototype.capsFirstLetter = function() { return this.charAt(0).toUpperCase() + this.slice(1) }


/**
 * Slides up an HTML element to hide its content
 * This function requires the mfg.css
 * @param {int} duration : duration of the animation in ms
 * @return {boolean} : true - the element exists
 */
HTMLElement.prototype.slideUp = function(duration = 1000) {
    if (this) {
        this.css3('transition', 'max-height ' + duration / 1000 + 's ease-in-out');
        this.removeClass('slide-down');
        this.addClass('slide-up');
        return true;
    } else {
        return false;
    }
}


/**
 * Slides down an HTML element to hide its content
 * This function requires the mfg.css
 * @param {int} duration : duration of the animation in ms
 * @return {boolean} : true - the element exists
 */
HTMLElement.prototype.slideDown = function(duration = 1000) {
    if (this) {
        this.css3('transition', 'max-height ' + duration / 1000 + 's ease-in-out');
        this.removeClass('slide-up');
        this.addClass('slide-down');
        return true;
    } else {
        return false;
    }
}


/**
 * This function fade in the element on which it is called
 * This function requires the mfg.css to work
 * @param {int} duration : duration of the animation in ms
 * @return {boolean} : true - the element exists, false - the element does not exist
 */
HTMLElement.prototype.fadeIn = function(duration = 1000) {
    if (this) {
        this.css3('transition', 'visibility 0s linear 0s, opacity ' + duration / 1000 + 's');
        this.removeClass('faded-out');
        this.addClass('faded-in');
        return true;
    } else {
        return false;
    }
}


/**
 * This function fade out the element on which it is called
 * This function requires the mfg.css to work
 * @param {int} duration : duration of the animation in ms
 * @return {boolean} : true - the element exists, false - the element does not exist
 */
HTMLElement.prototype.fadeOut = function(duration = 1000) {
    if (this) {
        this.css3('transition', 'visibility 0s linear ' + duration / 1000 + 's, opacity ' + duration / 1000 + 's');
        this.removeClass('faded-in');
        this.addClass('faded-out');
        return true;
    } else {
        return false;
    }
}

/**
 * Scroll to the given element
 * @param {int} duration : duration of the animation
 * @param {String} animation : type of animation to use
 * @return : the return will stop the function effect
 */
HTMLElement.prototype.scrollIt = function(duration = 200, animation = 'linear', centered = false) {
    /**
     * @const {function[]} : available types of animation
     */
    let animations = [
        linear = t => t,
        easeInQuad = t => Math.pow(t, 2),
        easeOutQuad = t => t * (2 - t),
        easeInOutQuad = t => (t < 0.5) ? 2 * t * t : -1 + (4 - 2 * t) * t
    ];

    const body = checkBody(),
        startH = body.scrollTop,
        startW = body.scrollLeft,
        startTime = Date.now(),
        documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
        documentWidth = Math.max(document.body.scrollLeft, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth),
        windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight,
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
        elementT = (centered) ? this.getCenteredCoords()[1] : this.getTop(),
        elementL = (centered) ? this.getCenteredCoords()[0] : this.getLeft();

    const destinationH = documentHeight - this.getTop() < windowHeight ? documentHeight - windowHeight : elementT,
        destinationW = documentWidth - this.getLeft() < windowWidth ? documentWidth - windowWidth : elementL;

    function scroll() {
        const now = Date.now(),
            time = Math.min(1, ((now - startTime) / duration)),
            timeFunction = animations.find(func => { return func.name === animation })(time);

        body.scrollTop = (timeFunction * (destinationH - startH)) + startH;
        body.scrollLeft = (timeFunction * (destinationW - startW)) + startW;

        if ((Math.round(body.scrollTop) === destinationH && Math.round(body.scrollLeft) === destinationW) || ((now - startTime) > (duration + 100))) {
            return;
        }
        requestAnimationFrame(scroll);
    }
    scroll();
}

/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */
/* ----------------------------------------------------------- LISTENERS ----------------------------------------------------------- */