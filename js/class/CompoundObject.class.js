/**
 *   @author Lallement
 *   This class describe the general behavior of compound astronomical objects (systems, asteroid belts, etc.)
 */
'use strict';
class CompoundObject extends AstronomicalObject {
    /* ################################ Constructor ################################ */
    constructor(name, mass, dimensions, type, age, mainObjects) {
        super(name, mass, dimensions, type, age);
        this._mainObjects = mainObjects;
    }

    /* ################################ Getters & Setters ################################ */
    get mainObjects() { return this._mainObjects }

    set mainObjects(mainObjects) { this._mainObjects = mainObjects }

    /* ################################ Methods ################################ */
    fillCard() {
        super.fillCard();
        document.getElementById('main-data').innerHTML = this._mainObjects;
        document.getElementById('compound-catg').replaceClass('hidden-catg', 'visible-catg');
        document.getElementsByClassName('fillfollow')[0].replaceClass('faded-in', 'faded-out');
    }
}