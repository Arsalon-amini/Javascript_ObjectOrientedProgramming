//object literal syntax 
const circle1 = {
    radius: 1, 
    location: {
        x:1, 
        y:1
    },
    isVisible: true,
    draw: function(){
        console.log('draw'); 
    }
}; 

//factory function 
function createCircle(radius){
    return {
        radius, 
        draw(){
            console.log('draw'); 
        }
    }; 
}

 const circle2 = createCircle(1); 



//constructor function 
function Circle(radius){
    this.radius = radius; 
    this.draw = function(){
        console.log('draw'); 
    }
}

const circle3 = new Circle(1); //1. creates a new empty obj, 2. points variable/methods to it, 3. returns it 

//functions are objects
Circle.call({}, 1); //like new operator (internally creates new obj, passes to call method, this points to new obj)
Circle.apply({}, [1, 2, 3]); //pass array as second arg to call method 

const circle4 = new Function('radius',
`
    this.radius = radius; 
    this.draw = function(){
        console.log('draw'); 
    }
`
);


//reference type vs. value type (copied by reference (points to same), copied by value (independent))

//copied by value
let x = 10; //values are independent 
let y = x; //value copied value into a new variable, completely independent 
x = 15; 
console.log (y); //expect to see 10 (y is independent of x)

//copied by reference
let z = { value : 20}; //address of value in memory stored in variable 
let r = z; //reference copied into new variable 
r.value = 15; 
console.log(z.value); //expect to see 15


//value type
let number = 10; //independent copy of local number variable

function increase (number){
    number++; //arg value is copied into local function parameter (completely independent), after func goes out of scope
    
}

increase(number); 
console.log(number); //expected 10

//reference type
let obj = { value: 10 }; 

function increase (obj){
    obj.value++; //local param will point to same obj (reference copied into local param) - two variable pointing to same obj 
    
}

increase(obj); 
console.log(obj); //expected 11 

