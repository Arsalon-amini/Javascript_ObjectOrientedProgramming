
//putting methods in prototypes was bad idea
//we knew we wouldn't have thousands of stopWatch objects in memory
//we optimized without considerating we wouldn't have 1000 instances in memory and caused issues with abstraction principle 
function StopWatch(){
    let startTime, endTime, running, duration = 0; 

    
    Object.defineProperty(this, 'startTime', {
        get: function() {return startTime; }
    }); 

    Object.defineProperty(this, 'endTime', {
        get: function() {return endTime; }
    }); 


    Object.defineProperty(this, 'duration', {
        get: function() {return duration; },
        set: function(value) {duration = value} //exposes from outside 
    }); 

    Object.defineProperty(this, 'running', {
        get: function() {return running; }
    }); 
}

StopWatch.prototype.start = function(){
    if(running)
        throw new Error('Stopwatch has already started'); 

    this.running = true; 

    this.startTime = new Date(); 
};

StopWatch.prototype.stop = function(){
    if(!running)
        throw new Error('Stopwatch is not yet started'); 

    this.running = false; 

    this.endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000; 
    this.duration += seconds; 
};

StopWatch.prototype.reset = function(){
    this.startTime = null; 
    this.endTime = null; 
    this.running = false; 
    this.duration = 0; 
};

let sw = new StopWatch();
sw.duration = 10; //we can access property from outside (not good)