/**
 *   @author Lallement
 *   This class describe the behavior of asteroid belts
 */
'use strict';
class AsteroidBelt extends CompoundObject {
    /* ################################ Constructor ################################ */
    constructor(name, mass, dimensions, type, age, mainObjects, innerPlanet, outerPlanet) {
        super(name, mass, dimensions, type, age, mainObjects);
        this._innerPlanet = innerPlanet;
        this._outerPlanet = outerPlanet;
    }

    /* ################################ Getters & Setters ################################ */
    get innerPlanet() { return this._innerPlanet }
    get outerPlanet() { return this._outerPlanet }

    set innerPlanet(innerPlanet) { this._innerPlanet = innerPlanet }
    set outerPlanet(outerPlanet) { this._outerPlanet = outerPlanet }

    /* ################################ Methods ################################ */
    toHtml() { return `<div id='${this.name.toLowerCase()}' class='object ${this.className()}'></div>` }

    fillCard() {
        super.fillCard();
        document.getElementById('location-data').innerHTML = (this._outerPlanet) ? `Between the orbit of ${this._innerPlanet.link()} and ${this._outerPlanet.link()}` : `Beyond the orbit of ${this._innerPlanet.link()}`;
        document.getElementById('asteroid-belt-catg').replaceClass('hidden-catg', 'visible-catg');
    }
}