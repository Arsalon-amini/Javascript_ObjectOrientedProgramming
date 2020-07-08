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