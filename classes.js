//ES6 classes (syntactical sugar over prototypes)

class Circle {
    constructor (radius){ 
        this.radius = radius; 
        this.move = function(){} //instance method
    }
    draw(){ 
        console.log('draw'); //method added to prototype, defined in 'body' of class 
    }
}

//hoisting (functions)

sayHello(); //okay to call function before it's declaration
sayGoodbye(); //variable not intitailized 

function sayHello(){console.log('hello')} //function declaration (hoisted) raised to top of code 

const sayGoodbye = function(){console.log('goodbye')}; //function expression (not hoisted)

//declarations
class Circle{ //class declaration (not hoisted to top like functions)
}

const Square = class{ //class expression (not used often)
}; 

//static vs. instance methods
class Circle {
    constructor (radius){ 
        this.radius = radius; 
        this.move = function(){} //instance method
    }
    draw(){ 
        console.log('draw'); //method added to prototype, defined in 'body' of class 
    }

    static parse(str){ //static member
        const radius = JSON.parse(str).radius; 
        return new Circle(radius); 
    }
}

const circle = Circle.parse('{"radius": 1}'); //available on the class not instance 
console.log(circle); 

//static member example
class Math2{
    static abs(value){}
}

Math2.abs(); //not working with particular obj. 

//this keyword
'use strict' 

const Circle = function(){
    this.draw = function(){
        console.log(this); 
    }
};

const c = new Circle(); 
c.draw();//method call (method on obj -> this points to own obj)

const draw = c.draw; //store funct. in variable
draw(); //function call (not part of obj -> points to global obj)

//executed in 'use strict' 
class Circle {
    draw(){
        console.log(this); //acts like 'use restrict'
    }
}

const c = new Circle();
const draw = c.draw;
draw();  //won't point to global object 

//private members

//symbols (make private)
const _radius = Symbol(); //a unique identifier (cannot new up a Symbol)
const _draw = Symbol();

class Circle{
    constructor(radius){
        this[_radius] = radius; //sort of private field
    }

    [_draw](){ 
    }
}

const c = new Circle(1); 
const key = Object.getOwnPropertySymbols(c)[0]; //this isn't done often but breaks abstraction 
console.log(c[radius]);

//WeakMaps - hashmap to store private properties (no reference to key, garbage collected)

const _radius = new WeakMap(); 
const _move = new WeakMap();

class CircleFunction{
    constructor(radius){
    _radius.set(this, radius); //stores obj, value off instance in a hashmap (key = .this obj, value = radius)
   
    _move.set(this, () => {
        console.log('move', this); //arrow function points to instance of circle object 
    });
}

    draw(){
        _move.get(this)(); //returns function, call function

        console.log('draw'); 
    }
}

const c = new CircleFunction(1); 


//getters / setters (ES6)

const _radius = new WeakMap();

class Circle{
    constructor(radius){
        _radius.set(this, radius);
    }

    get radius(){
        return _radius.get(this); 
    }

    set radius(value){
        if(value <= 0) throw new Error('Invalid radius'); 
        _radius.set(this, value); 
    }
}

const c = new Circle(1); 

//inheritance (ES6)

class Shape {
    constructor(color){
        this.color = color; 
    }

    move(){
        console.log('move'); 
    }
}

class Circle extends Shape{
    constructor(color, radius){
        super(color); 
        this.radius = radius; 
    }
    draw() {
        console.log('draw'); 
    }
}

const c = new Circle('red', 1); 

//method overriding (ES6) - change behavior in Child 

class Shape{
    move(){
        console.log('move');
    }
}

class Circle extends Shape {
    move(){
        super.move(); //call Parent implementation 
        console.log('circle move'); //JS engine walks from child to parent (first looks at child instance, then prototype of child) 
    }
}

const c = new Circle(); 

//excercise


//stack - from scratch 
_items = new WeakMap();

class Stack {
    constructor(){
       _items.set(this, []); //(key = this obj, value = [])
    }

    push(obj){
        _items.get(this).push(obj); //.get on Hashmap to return array, .push will add item to end of array 
    }

    pop(){
        const items = _items.get(this); //store in const to simplify code

        if(items.length === 0) 
            throw new Error('stack is empty'); 

        return items.pop(); //call pop method on items array 
    }

    peek(){
        const items = _items.get(this);

        if(items.length === 0)
            throw new Error('Stack is empty'); 

        return items[items.length - 1]; //return object on top  
    }

    get count(){
        return _items.get(this).length; 
    }

}

let s = new Stack();