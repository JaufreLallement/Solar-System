/**
 *   @author Lallement  
 *   This class describe the behavior of the planets (major or minor)
 */
'use strict';
class Planet extends SystemDirectObject {
    /* ################################ Constructor ################################ */
    constructor(system, name = 'Earth', mass = '5.9736×10²⁴', dimensions = 6378.137, type = 'Terrestrial', age = '4.503×10⁹', area = '510×10⁶', escapeVelocity = 11.186, rotationPeriod = 1, revolutionPeriod = 365.25, avgT = 288.15, distanceToParent = '147.098-152.097×10⁶', gravity = 9.806, atmosphere = 'Nitrogen, Oxygen', moons = []) {
        super(name, mass, dimensions, type, age, area, escapeVelocity, rotationPeriod, revolutionPeriod, avgT, distanceToParent, gravity, atmosphere, system);
        this._moons = moons;
    }

    /* ################################ Getters & Setters ################################ */
    get moons() { return this._moons }

    set moons(moons) { this._moons = moons }

    /* ################################ Methods ################################ */

    addMoon(moon) {
        if (this._moons.indexOf(moon) === -1) {
            this._moons.push(moon);
        } else {
            console.log(`ERREUR: le satellite ${moon.name} est déjà dans la liste des moons de ${this.name}!`);
        }
    }

    removeMoon(moon) {
        if (this._moons.indexOf(moon) !== -1) {
            this._moons.splice(this._moons.indexOf(moon), 1);
        } else {
            console.log(`ERREUR: impossible de trouver le satellite ${moon.name} parmi les moons de ${this.name}!`);
        }
    }

    moonsLink() {
        let links = '';
        if (this._moons.length === 0) {
            links = 'None';
        } else {
            for (let i = 0; i < this._moons.length; i++) {
                links += (i < this._moons.length - 1) ? this._moons[i].link() + ', ' : this._moons[i].link();
            }
        }
        return links;
    }

    toHtml() {
        let moons_content = '';
        if (this._moons.length !== 0) {
            for (let moon of this._moons) {
                moons_content += moon.toHtml();
            }
        }
        return `<div id='${this.name.toLowerCase()}-container' class='${this.className()}-container container'>` +
            `   <div id='${this.name.toLowerCase()}' class='object ${this.className()}'>` +
            `       ${moons_content}` +
            `   </div>` +
            `</div>`;
    }

    fillCard() {
        super.fillCard();
        document.getElementById("moons-data").innerHTML = this.moonsLink();
        document.getElementById('planet-catg').replaceClass('hidden-catg', 'visible-catg');
    }
}