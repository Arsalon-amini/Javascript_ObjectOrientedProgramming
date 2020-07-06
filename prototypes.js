//prototypes - parents 
//prototypical inheritance - Javascript inheritance (vs. classical)

//Property Descriptor 

let person = { name: 'Arsalon'};
let objectBase = Object.getPrototypeOf(person); 
let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString'); //returns property descriptor object - takes obj and target method
console.log(descriptor);

//setting descriptors

//3 args - object, target property, property descriptor object
Object.defineProperty(person, 'name', {
    writable: false, //becomes read only 
    enumerable: false, //not show up in obj.keys
    configurable: true //can delete 
})

let descriptor = Object.getOwnPropertyDescriptor(person, 'name', ); 
console.log(descriptor); 

//instance vs prototype members
function Circle(radius){
    this.radius = radius; //instance members
}

Circle.prototype.draw = function(){
    console.log('draw'); //prototype member
}

const c1 = new Circle(1); //draw method on prototype (one place in memory)
const c2 = new Circle(2);

//override prototype .toString method 
Circle.prototype.toString = function(){
    return 'Circle with radius' + this.radius; 
}

//accessing prototype and instance methods within eachother
function Circle(radius){
    this.radius = radius; //instance members

    this.move = function(){
        this.draw(); //accessing prototypical memmber
        console.log('move'); 
    }
}

Circle.prototype.draw = function(){
    this.move(); //accessing instance member in prototype member 
    console.log('draw'); //prototype member
}


//iterate instance and prototype members
let instanceMembers = Object.keys(c1); //only returns instance members 
console.log(instanceMembers); 

//returns all members (instance "own" and prototype)
for (let key in c1) 
    console.log(key); 

//modifying the prototype of built in objects (avoid this) 
Array.prototype.shuffle = function(){
    //... algorithm for shuffling
}

const array = [];
array.shuffle(); 


// Every object (except the root object) has a prototype (parent). 
// To get the prototype of an object:
Object.getPrototypeOf(obj); 

// In Chrome, you can inspect "__proto__" property. But you should 
// not use that in the code. 

// To get the attributes of a property:
Object.getOwnPropertyDescriptor(obj, 'propertyName');

// To set the attributes for a property:
Object.defineProperty(obj, 'propertyName', {
    configurable: false,    // cannot be deleted
    writable: false,
    enumerable: false
});

// Constructors have a "prototype" property. It returns the object 
// that will be used as the prototype for objects created by the constructor. 
Object.prototype === Object.getPrototypeOf({})
Array.prototype === Object.getPrototypeOf([])

// All objects created with the same constructor will have the same prototype. 
// A single instance of this prototype will be stored in the memory. 
const x = {};
const y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // returns true 

// Any changes to the prototype will be immediately visible to all objects 
// referencing this prototype. 

// When dealing with large number of objects, it's better to put their
// methods on their prototype. This way, a single instance of the methods
// will be in the memory. 
Circle.prototype.draw = function() {}

// To get the own/instance properties:
Object.keys(obj);

// To get all the properties (own + prototype): 
for (let key in obj) {}


//prototypical inheritance 
function Shape(){
   
}

Shape.prototype.duplicate = function(){
    console.log('duplicate'); 
}

//reusable logic for prototypical inheritance  
function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype); //returns an object that inherits from ShapeBase (use for circleBase)
    Child.prototype.constructor = Child(); //reset constuctor to Circle function 
}

function Circle(radius){
    this.radius = radius; 
}

extend(Circle, Shape); 

Circle.prototype.draw = function(){
    console.log('draw'); 
}


//calling the super constructor
function Shape(color){
    this.color = color; //parent prototype with parameter 
}

Shape.prototype.duplicate = function(){
    console.log('duplicate'); 
}

//calling the super constructor 
function Circle(radius, color){
    Shape.call(this, color); //super constructor argu
    this.radius = radius; 
}


Circle.prototype = Object.create(Shape.prototype); 
Circle.prototype.constructor = Circle; 