/**
 *  @author Lallement
 *  This class describe the behavior of simple astronomical objects (stars, planets, moons, etc.)
 */
'use strict';
class SimpleObject extends AstronomicalObject {

    /* ################################ Constructor ################################ */
    constructor(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere) {
        super(name, mass, dimensions, type, age);
        this._area = area;
        this._escapeVelocity = escapeVelocity;
        this._rotationPeriod = rotationPeriod;
        this._revolutionPeriod = revolutionPeriod;
        this._avgT = avgT;
        this._distanceToParent = distanceToParent;
        this._gravity = gravity;
        this._atmosphere = atmosphere;
    }

    /* ################################ Getters & Setters ################################ */
    get area() { return this._area }
    get escapeVelocity() { return this._escapeVelocity }
    get rotationPeriod() { return this._rotationPeriod }
    get revolutionPeriod() { return this._revolutionPeriod }
    get avgT() { return this._avgT }
    get distanceToParent() { return this._distanceToParent }
    get gravity() { return this._gravity }
    get atmosphere() { return this._atmosphere }

    set area(area) { this._area = area }
    set escapeVelocity(escapeVelocity) { this._escapeVelocity = escapeVelocity }
    set rotationPeriod(rotationPeriod) { this._rotationPeriod = rotationPeriod }
    set revolutionPeriod(revolutionPeriod) { this._revolutionPeriod = revolutionPeriod }
    set avgT(avgT) { this._avgT = avgT }
    set distanceToParent(distanceToParent) { this._distanceToParent = distanceToParent }
    set gravity(gravity) { this._gravity = gravity }
    set atmosphere(atmosphere) { this._atmosphere = atmosphere }

    /* ################################ Methods ################################ */
    parent() { return (this.constructor.name === 'Moon') ? this.planet : (this.constructor.name === 'Planet') ? this.system.center : null }

    rotationH() { return Math.round((this._rotationPeriod * 24) * 100) / 100 }

    revolutionY() { return (this.constructor.name === 'Star') ? '2.37×10⁸' : Math.round((this._revolutionPeriod / 365.25) * 100) / 100 }

    fillCard() {
        super.fillCard();
        document.getElementById('area-data').innerHTML = this._area;
        document.getElementById('escape-data').innerHTML = this._escapeVelocity;
        document.getElementById('rotation-data').innerHTML = `${this.rotationH()} hours / ${this._rotationPeriod} days`;
        document.getElementById('revolution-data').innerHTML = `${this._revolutionPeriod} days / ${this.revolutionY()} years`;
        document.getElementById('avgT-data').innerHTML = this._avgT;
        document.getElementById('parent-data').innerHTML = (this.constructor.name === 'Star') ? 'Sagittarius A*' : this.parent().link();
        document.getElementById('distance-data').innerHTML = this._distanceToParent;
        document.getElementById('gravity-data').innerHTML = this._gravity;
        document.getElementById('atmosphere-data').innerHTML = this._atmosphere;
        document.getElementById('simple-catg').replaceClass('hidden-catg', 'visible-catg');
    }
}