function Shape(color){
    this.color = color; 
}

Shape.prototype.duplicate = function(){
    console.log('duplicate'); 
}

//reusable logic for prototypical inheritance  
function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype); //returns an object that inherits from ShapeBase (use for circleBase)
    Child.prototype.constructor = Child; //reset constuctor to Circle function 
}


function Circle(radius, color){
    Shape.call(this, color); //super constructor argu
    this.radius = radius; 
}

extend(Circle, Shape); 

Circle.prototype.draw = function(){
    console.log('draw'); 
}

function Square(size){
    this.size = size; 
}

extend(Square, Shape); 

const s = new Shape();
const c = new Circle(1, 'red'); 
const sq = new Square(2); 

console.log(s);
console.log(c); 
console.log(sq); 




 

