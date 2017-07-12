/**
 *  @author Lallement
 *  This class describe the behavior of the objects of the solar system that are not orbiting arround an object except the sun.
 */
'use strict';
class SystemDirectObject extends SimpleObject {
    /* ################################ Constructor ################################ */
    constructor(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere, system) {
        super(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere);
        this._system = system;
        if (system) {
            if (this.constructor.name === 'Star') {
                system.center = this;
            } else {
                system.addOrbitingObj(this);
            }
        }
    }

    /* ################################ Getters & Setters ################################ */
    get system() { return this._system }

    set system(system) { this._system = system }

    /* ################################ Methods ################################ */

}