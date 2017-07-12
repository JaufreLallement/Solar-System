/**
 *  @author Lallement
 *  This class describe the general behavior of astronomical objects (simple objects, compound objects, extended objects, etc.)
 */
'use strict';
class AstronomicalObject {

    /* ################################ Constructor ################################ */
    constructor(name, mass, dimensions, type, age = '4.570×10⁹') {
        this._name = name;
        this._mass = mass;
        this._dimensions = dimensions;
        this._type = type;
        this._age = age;
    }

    /* ################################ Getters & Setters ################################ */
    get name() { return this._name }
    get mass() { return this._mass }
    get dimensions() { return this._dimensions }
    get type() { return this._type }
    get age() { return this._age }
    get description() { return this._description }

    set name(name) { this._name = name }
    set mass(mass) { this._mass = mass }
    set dimensions(dimensions) { this._dimensions = dimensions }
    set typetype(type) { this._type = type }
    set age(age) { this._age = age }
    set description(description) { this._description = description }

    /* ################################ Methods ################################ */
    link() { return `<span class='object-link clickable ${this._name.toLowerCase()}-link'>${this._name}</span>` }

    className() { return this.constructor.name.toLowerCase() }

    fillCard() {
        document.getElementById("card-title").innerHTML = (this._name === 'Moon') ? `The ${this._name}` : this._name;
        document.getElementById("card-img").src = `img/desc/${this._name.toLowerCase()}_desc.jpg`;
        document.getElementById("mass-data").innerHTML = this._mass;
        document.getElementById("dimensions-lib-data").innerHTML = (typeof this._dimensions === 'number') ? "Radius" : "Dimensions";
        document.getElementById("dimensions-data").innerHTML = this._dimensions;
        document.getElementById('age-data').innerHTML = this._age;
        document.getElementById("type-data").innerHTML = this._type;
        if (this.constructor.name !== 'Star') document.getElementsByClassName('fillfollow')[0].id = `${this._name.toLowerCase()}-follow`;
        document.getElementsByClassName('card-catg').replaceClass('visible-catg', 'hidden-catg');
        document.getElementById('astronomical-catg').replaceClass('hidden-catg', 'visible-catg');
    }

    toHtml() {
        return `<div id='${this.name.toLowerCase()}-container' class='${this.className()}-container container'>` +
            `   <div id='${this.name.toLowerCase()}' class='object ${this.className()}'>` +
            `   </div>` +
            `</div>`;
    }
}