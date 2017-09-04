/**
 *   @author Lallement
 *   This class describe the behavior of the systems (planetary systems, galaxies, etc)
 */
'use strict';
class System extends CompoundObject {
    /* ################################ Constructor ################################ */
    constructor(center, orbitingObj, name = 'Helios', mass = '1.992x10³⁰', dimensions = '1.437x10¹¹', type = 'Planetary system', age = '4.570x10⁹', mainObjects = 'Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune') {
        super(name, mass, dimensions, type, age, mainObjects);
        this._center = center;
        this._orbitingObj = orbitingObj;
    }

    /* ################################ Getters & Setters ################################ */
    get center() { return this._center }
    get orbitingObj() { return this._orbitingObj }

    set center(center) { this._center = center }
    set orbitingObj(orbitingObj) { this._orbitingObj = orbitingObj }

    /* ################################ Methods ################################ */
    addOrbitingObj(object) {
        if (this._orbitingObj.indexOf(object) === -1) {
            this._orbitingObj.push(object);
        } else {
            console.log(`ERREUR: l'objet ${object.name} est déjà dans le système ${this.name}!`);
        }
    }

    removeOrbitingObj(object) {
        if (this._orbitingObj.indexOf(object) !== -1) {
            this._orbitingObj.splice(this._orbitingObj.indexOf(object), 1);
        } else {
            console.log(`ERREUR: impossible de retirer ${object.name} du système ${this.name}, objet introuvable!`);
        }
    }

    planets() {
        let planets = [];
        for (let object of this._orbitingObj) {
            if (object.constructor.name === 'Planet') planets.push(object);
        }
        return planets;
    }

    planetsLink() {
        let links = '',
            planets = this.planets();
        if (planets.length !== 0) {
            for (let i = 0; i < planets.length; i++) {
                links += (i < planets.length - 1) ? planets[i].link() + ', ' : planets[i].link();
            }
        }
        return links;
    }

    moons() {
        let moons = [];
        for (let element of this._orbitingObj) {
            if (element.className() === 'planet' && element.moons.length !== 0) moons = moons.concat(element.moons);
        }
        return moons;
    }

    belts() { return [this._orbitingObj[4], this._orbitingObj[10]] }

    findObj(id) {
        let object_name = id.charAt(0).toUpperCase() + id.slice(1);
        let array = (document.getElementById(id).className.includes('moon')) ? this.moons() : this._orbitingObj;
        return (document.getElementById(id).className.includes('star')) ? this._center : array.find((element) => { return element.name === object_name });
    }

    toHtml() {
        let main_objects = '';
        if (this._orbitingObj.length !== 0) {
            for (let object of this._orbitingObj) {
                main_objects += object.toHtml();
            }
        }
        return `<div id='${this.name.toLowerCase()}-system' class='system'>` +
            `   ${this._center.toHtml()}` +
            `   ${main_objects}` +
            `</div>`;
    }

    static all() {
        let helios = new System(null, []);
        let sun = new Star(helios);

        let mercury = new Planet(helios, 'Mercury', '3.301×10²³', 2439.7, 'Terrestrial', '4.503×10⁹', '75×10⁶', 4.435, 58.6462, 87.97, 442, '46-69.817×10⁶', 3.701, 'None');

        let venus = new Planet(helios, 'Venus', '4,8685×10²⁴', 6051.8, 'Terrestrial', '4.503×10⁹', '460×10⁶', 10.46, -243.023, 224.7, 735, '107.476-108.942×10⁶', 8.87, 'Carbon dioxide, Nitrogen');

        let earth = new Planet(helios);
        let moon = new Moon(earth);

        let mars = new Planet(helios, 'Mars', '641,85×10²³', 3396.2, 'Terrestrial', '4.503×10⁹', '144×10⁶', 5.027, 1.026, 779.96, 210, '206.64-249.228×10⁶', 3.711, 'Carbon dioxide, Argon, Nitrogen', []);
        let phobos = new Moon(mars, 'Phobos', '1,072×10¹⁶', '26.8 × 22.4 × 18.4', 'Moon of Mars', '4.503×10⁹', 1548.3, 0.01139, 0.318, 0.318, 233, '9234.42-9517.58', 0.0057, 'None');
        let deimos = new Moon(mars, 'Deimos', '1,476×10¹⁵', '15 × 12.2 × 11', 'Moon of Mars', '4.503×10⁹', 495.15, 0.00556, 1.263, 1.263, 233, '23455.5-23470.9', 0.003, 'None');

        let asteroid_belt = new AsteroidBelt('Asteroid-belt', '3.0×10²¹', '4.937×10⁸', 'Debris disk', '4.503×10⁹', 'Ceres, Vesta, Pallas, Hygiea', mars, null);
        helios.addOrbitingObj(asteroid_belt);

        let jupiter = new Planet(helios, 'Jupiter', '189.86×10²⁷', 71492, 'Gas giant', '4.503×10⁹', '6.14×10¹⁰', 59.5, 0.413, 4332.59, 138.5, '740.52-816.620×10⁶', 24.796, 'Hydrogen, Helium', []);
        let io = new Moon(jupiter, 'Io', '8.931×10²²', 1821.6, 'Moon of Jupiter', '4.503×10⁹', '41.9×10⁶', 2.558, 1.769, 1.769, 110, '420-423.4×10³', 1.796, 'Sulfur dioxide');
        let europa = new Moon(jupiter, 'Europa', '4.799×10²²', 1560.8, 'Moon of Jupiter', '4.503×10⁹', '30.9×10⁶', 2.025, 3.551, 3.551, 102, '664.86-676.93×10³', 1.314, 'None');
        let ganymede = new Moon(jupiter, 'Ganymede', '14.82×10²²', 2634.1, 'Moon of Jupiter', '4.503×10⁹', '87.2×10⁶', 2.741, 7.154, 7.154, 110, '1069.2-1071.6×10³', 1.428, 'Oxygen');
        let callisto = new Moon(jupiter, 'Callisto', '10.75×10²²', 2410.3, 'Moon of Jupiter', '4.503×10⁹', '73×10⁶', 2.440, 16.69, 16.69, 134, '1869-1897×10³', 1.428, 'Carbon dioxide');

        asteroid_belt.outerPlanet = jupiter;

        let saturn = new Planet(helios, 'Saturn', '189.86×10²⁶', 60268, 'Gas giant', '4.503×10⁹', '4.27×10¹⁰', 35.5, 0.448, 10759.22, 109, '1349.47-1503.98×10⁶', 10.44, 'Hydrogen, Helium', []);
        let mimas = new Moon(saturn, 'Mimas', '3.75×10¹⁹', 198.2, 'Moon of Saturn', '4.503×10⁹', '495×10³', 0.159, 0.942, 0.942, 64, '181.9-189.2×10³', 0.064, 'None');
        let enceladus = new Moon(saturn, 'Enceladus', '3.75×10²⁰', 252.1, 'Moon of Saturn', '4.503×10⁹', '798.6×10³', 0.239, 1.37, 1.37, 75, '237.9×10³', 0.113, 'Water vapor, Nitrogen, Carbon dioxide, Methane');
        let tethys = new Moon(saturn, 'Tethys', '6.174×10²⁰', 531.1, 'Moon of Saturn', '4.503×10⁹', '3569.9×10³', 0.394, 1.887, 1.887, 86, '294.6×10³', 0.146, 'None');
        let dione = new Moon(saturn, 'Dione', '10.95×10²⁰', 561.4, 'Moon of Saturn', '4.503×10⁹', '3964.7×10³', 0.51, 2.736, 2.736, 87, '377.4×10³', 0.232, 'None');
        let rhea = new Moon(saturn, 'Rhea', '23.06×10²⁰', 763.8, 'Moon of Saturn', '4.503×10⁹', '7337×10³', 0.635, 4.52, 4.52, 76, '527.1×10³', 0.264, 'None');
        let titan = new Moon(saturn, 'Titan', '13.45×10²²', 763.8, 'Moon of Saturn', '4.503×10⁹', '83×10⁶', 2.639, 15.945, 15.945, 93.7, '1186.7-1257.1×10³', 1.352, 'Nitrogen, Methane');
        let iapetus = new Moon(saturn, 'Iapetus', '1.8×10²¹', 734.5, 'Moon of Saturn', '4.503×10⁹', '6700×10³', 0.573, 79.32, 79.32, 110, '3560.8×10³', 0.223, 'None');

        let uranus = new Planet(helios, 'Uranus', '8.681×10²⁵', 25559, 'Ice giant', '4.503×10⁹', '8.1156×10⁹', 21.3, -0.718, 30688.5, 64.5, '2734.998-3006.32×10⁶', 8.87, 'Hydrogen, Helium, Methane', []);
        let miranda = new Moon(uranus, 'Miranda', '6.59×10¹⁹', 235.8, 'Moon of Uranus', '4.503×10⁹', '700×10³', 0.193, 1.41, 1.41, 60, '123.4×10³', 0.079, 'None');
        let ariel = new Moon(uranus, 'Ariel', '13.53×10²⁰', 578.9, 'Moon of Uranus', '4.503×10⁹', '4211.3×10³', 0.559, 2.52, 2.52, 60, '191.02×10³', 0.269, 'None');
        let umbriel = new Moon(uranus, 'Umbriel', '11.72×10²⁰', 584.7, 'Moon of Uranus', '4.503×10⁹', '4296×10³', 0.52, 4.144, 4.144, 75, '266×10³', 0.2, 'None');
        let titania = new Moon(uranus, 'Titania', '35.27×10²⁰', 788.4, 'Moon of Uranus', '4.503×10⁹', '7820×10³', 0.773, 8.7, 8.7, 70, '435.9×10³', 0.367, 'Carbon dioxide?, Nitrogen?');
        let oberon = new Moon(uranus, 'Oberon', '30.14.27×10²⁰', 761.4, 'Moon of Uranus', '4.503×10⁹', '7285×10³', 0.727, 13.46, 13.46, 75, '583.5×10³', 0.346, 'None');

        let neptune = new Planet(helios, 'Neptune', '102.43×10²⁴', 24764, 'Ice giant', '4.503×10⁹', '7.6408×10⁹', 23.5, 0.671, 60182, 63.5, '4452.94-4553.946×10⁶', 11.15, 'Hydrogen, Helium, Methane', []);
        let triton = new Moon(neptune, 'Triton', '2.14×10²²', 1353.4, 'Moon of Neptune', '4.503×10⁹', '23.02×10⁶', 1.45, 5.877, -5.877, 38, 354759, 0.779, 'Nitrogen, Methane');

        let pluto = new Planet(helios, 'Pluto', '1.314×10²²', 1185, 'Dwarf planet', '4.503×10⁹', '1.779×10⁷', 1.212, 6.387, 90560, 44, '4436.8-7375.927×10⁶', 0.625, 'Nitrogen, Methane, Carbon monoxide', []);
        let charon = new Moon(pluto, 'Charon', '1.586×10²¹', 606, 'Moon of Pluto', '4.503×10⁹', '4×10⁶', 0.59, 6.387, 6.387, 53, 17536, 0.288, 'None');

        let kuiper_belt = new AsteroidBelt('Kuiper-belt', '5.9736×10²³', '9.874×10⁹', 'Debris disk', '4.503×10⁹', 'Pluto, Makemake, Haumea', pluto, null);

        let churyumov = new SystemDirectObject('Churyumov', '9.982×10¹²', '6.6 × 5.7 × 3.3', 'Jupiter-family comet', '4.503×10⁹', 46, 0.001, 0.52, 2352.21, 205, '185.98 - 850.15×10⁶', '?', 'None', helios);
        helios.addOrbitingObj(kuiper_belt);
        return helios;
    }
}