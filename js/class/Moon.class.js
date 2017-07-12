/**
 *  @author Lallement
 *  This class describe the behavior of the objects of the solar system that are orbiting arround an object different than the sun
 */
'use strict';
class Moon extends SimpleObject {
    /* ################################ Constructor ################################ */
    constructor(planet, name = 'Moon', mass = '7.348×10²²', dimensions = 1737.4, type = 'Moon of Earth', age = '4.503×10⁹', area = '37.87×10⁶', escapeVelocity = 2.38, rotationPeriod = 27.321, revolutionPeriod = 27.321, avgT = 250, distanceToParent = '363.1-405.7×10³', gravity = 1.622, atmosphere = 'None') {
        super(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere);
        this._planet = planet;
        if (planet) planet.addMoon(this);
    }

    /* ################################ Getters & Setters ################################ */
    get planet() { return this._planet }

    set planet(planet) { this._planet = planet }

    /* ################################ Methods ################################ */
}