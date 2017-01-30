<?php


/**
*   This class describe the general behavior of the solar system objects (sun, planets, planetoids, sattelites, etc.)
*/
class SolarSystemObject {

    /* ---------------------------------- CLASS ATTRIBUTES ---------------------------------- */
    /**
    *   @var {String} name : name of the object
    */
    private $name =  null;

    /**
    *   @var {String} className : class(es) of the DOM element corresponding to the object
    */
    private $className = 'object';

    /**
    *   @var {double} mass : mass of the object
    */
    private $mass = null;

    /**
    *   @var {double} revolutionPeriod : revolution period of the object. Arround the sun for the solar system objects and arround the galactic center for the sun himself
    */
    private $revolutionPeriod = null;

    /**
    *   @var {double} rotationPeriod : rotation period of the object
    */
    private $rotationPeriod = null;

    /**
    *   @var {double} systemCenterDist : distance between the object and the center of the system (Earth - Sun, Sun - Milky Way center).
    */
    private $systemCenterDist = null;


    /* ---------------------------------- CONSTRUCTORS ---------------------------------- */
    /**
    *   Main constructor with arguments
    *   @param $name : name to give to the object
    *   @param $mass : mass of the created object
    *   @param $revolution : revolution period of the object arround another
    *   @param $rotation : rotation period of the object arround itself
    *   @param $dist : distance between the object and the other arround which it orbits
    */
    public function __construct($name, $mass, $revolution, $rotation, $dist) {
        $this->name = $name;
        $this->mass = $mass;
        $this->revolutionPeriod = $revolution;
        $this->rotationPeriod = $rotation;
        $this->systemCenterDist = $dist;
    }


    /* ---------------------------------- GETTERS & SETTERS ---------------------------------- */
    /**
    *   Getter for the name attribute of the object
    *   @return name : name of the object
    */
    public function getName() {
        return $this->name;
    }

    /**
    *   Getter for the mass attribute of the object
    *   @return mass : mass of the object
    */
    public function getMass() {
        return $this->mass;
    }

    /**
    *   Getter for the revolutionPeriod attribute of the object
    *   @return revolutionPeriod : revolution period of the object
    */
    public function getRevolutionPeriod() {
        return $this->revolutionPeriod;
    }

    /**
    *   Getter for the rotationPeriod attribute of the object
    *   @return rotationPeriod : rotation period of the object
    */
    public function getRotationPeriod() {
        return $this->rotationPeriod;
    }

    /**
    *   Getter for the systemCenterDist attribute of the object
    *   @return systemCenterDist : distance between the object and the object arround which it orbits
    */
    public function getSystemCenterDist() {
        return $this->systemCenterDist;
    }

    /**
    *   Setter for the name attribute of the object
    *   @param name : name to attribute to the object
    */
    public function setName($name) {
        $this->name = $name;
    }

    /**
    *   Setter for the mass attribute of the object
    *   @param mass : mass to attribute to the object
    */
    public function setMass($mass) {
        $this->mass = $mass;
    }

    /**
    *   Setter for the revolutionPeriod attribute of the object
    *   @param revolutionPeriod : revolution period to attribute to the object
    */
    public function setRevolutionPeriod($revolution) {
        $this->revolutionPeriod = $revolution;
    }

    /**
    *   Setter for the rotationPeriod attribute of the object
    *   @return rotationPeriod : rotation to attribute to the object
    */
    public function setRotationPeriod($rotation) {
        $this->rotationPeriod = $rotation;
    }

    /**
    *   Setter for the systemCenterDist attribute of the object
    *   @param systemCenterDist : distance between the object and the object arround which it orbits
    */
    public function setSystemCenterDist($distance) {
        $this->systemCenterDist = $distance;
    }


    /* ---------------------------------- FUNCTIONS ---------------------------------- */
    /**
    *   This function returns the link 
    */
    public function getObjectLink() {
        $id = mt_rand(0, 10);
        return "<span id='{$this->name}-link{$id}' class='object-link clickable'>".$this->name."</span>";
    }
}