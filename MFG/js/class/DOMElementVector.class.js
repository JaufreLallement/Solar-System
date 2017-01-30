/**
 * @author Lallement
 * This class describes the behavior of a vector between two HTMLElement
 * and implements several functions relative to vectors
 */


/**
 * Vector constructor
 * @param {HTMLElement} element_1 : first extremity of the vector 
 * @param {HTMLElement} element_2 : second extremity of the vector
 */
var DOMElementVector = function (element_1, element_2) {
    this.extremity_a = element_1;
    this.extremity_b = element_2;
}


/**
* Calculates the coordinates of the vector
* @return {double[]} x_coord, y_coord : coordinates of the vector
*/
DOMElementVector.prototype.vectorCoords = function () {
	return [this.extremity_b.getCoords()[0] - this.extremity_a.getCoords()[0], this.extremity_b.getCoords()[1] - this.extremity_a.getCoords()[1]]; 
}


/**
* Calculates the norm of the vector
* @return {double} : norm of the vector
*/
DOMElementVector.prototype.vectorNorm = function () {
	return Math.sqrt(Math.pow(this.vectorCoords()[0], 2) + Math.pow(this.vectorCoords()[1], 2)); 
}


/**
* Calculates the determinant of the two vectors (v1:this and v2:vector2)
* @param {DOMElementVector} vector2 : second vector
* @return {double} : determinant of the vectors
*/
DOMElementVector.prototype.vectorDeterminant = function (vector2) {
	return this.vectorCoords()[0] * vector2.vectorCoords()[1] - this.vectorCoords()[1] * vector2.vectorCoords()[0];
}


/**
 * Verify if the vector on which the function is called and the one in parameters are colinear
 * @param {DOMElementVector} vector2 : second vector
 * @param {int} margin : margin that should surround the determinant
 * @return {boolean} : true - the determinant is between -margin and margin, else false
 */
DOMElementVector.prototype.isCollinear = function (vector2, margin) {
	var determinant = this.vectorDeterminant(vector2);
	return (determinant > -margin && determinant < margin);
}

/**
 * Compare the norm of two vectors and return an int that represents the result
 * @param {DOMElementVector} vector2 : vector to compare to the one on which is called the function
 * @return {int} : 0 - the two norms are equal, -1 - the first norm is lower than the other, 1 - the first norm is higher than the other
 */
DOMElementVector.prototype.compareNorm = function (vector2) {
	return (this.vectorNorm() == vector2.vectorNorm()) ? 0 : (this.vectorNorm() < vector2.vectorNorm()) ? -1 : 1;
}