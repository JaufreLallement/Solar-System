/**
 *  @author Lallement
 *  This class describe the behavior of the specific astronomical object: star
 */
'use strict';
class Star extends SystemDirectObject {

    /* ################################ Constructor ################################ */
    constructor(system, name = 'Sun', mass = '1.989×10³⁰', dimensions = 696342, type = 'Yellow dwarf', age = '4.570×10⁹', area = '6.0877×10¹²', escapeVelocity = 617.54, rotationPeriod = 25.05, revolutionPeriod = '8.66×10¹⁰', avgT = 5778, distanceToParent = '2.50×10¹⁷', gravity = 273.95, atmosphere = 'Hydrogen, Helium', specter = 'GV', luminosity = '3.828×10²⁶', surfaceT = 5750, coreT = '1.57×10⁷', coronaT = '5×10⁶') {
        super(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere, system);
        this._specter = specter;
        this._luminosity = luminosity;
        this._surfaceT = surfaceT;
        this._coreT = coreT;
        this._coronaT = coronaT;
    }

    /* ################################ Getters & Setters ################################ */
    get specter() { return this._specter }
    get luminosity() { return this._luminosity }
    get surfaceT() { return this._surfaceT }
    get coreT() { return this._coreT }
    get coronaT() { return this._coronaT }

    set specter(specter) { this._specter = specter }
    set luminosity(luminosity) { this._luminosity = luminosity }
    set surfaceT(surfaceT) { this._surfaceT = surfaceT }
    set coreT(coreT) { this._coreT = coreT }
    set coronaT(coronaT) { this._coreT = coronaT }

    /* ################################ Methods ################################ */
    toHtml() { return `<div id='${this.name.toLowerCase()}' class='object ${this.className()}'></div>` }

    fillCard() {
        super.fillCard();
        document.getElementById('planets-data').innerHTML = this.system.planetsLink();
        document.getElementById('star-catg').replaceClass('hidden-catg', 'visible-catg');
    }
}