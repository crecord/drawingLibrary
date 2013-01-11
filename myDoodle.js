window.onload = function () {

    var canvas = document.getElementById("myCanvas");
    console.log(canvas);
    var context = canvas.getContext("2d");
    var doodle = new Doodle(context);



// sets iterator/frameRate
t = 1; 
//calls draw
drawSlow();
widthOfImgs=200;

//creates a frameRate by recursively drawing itself with delay
//also moves circle in a figure 8
function drawSlow (){
		console.log(t);
	var half = canvas.width/2; 		
	var x=half+200*Math.cos(t)*Math.sqrt(Math.pow(Math.cos(t),2)); 
	var yes=200+200*Math.cos(t)*Math.sin(t);
		drawLine1(x,yes);
		drawLine2(x,yes);
		drawLine3(x,yes);
		drawLine4(x,yes);
		drawSphere(x,yes);

		t += .05;  
	setTimeout(drawSlow, 40);
	setTimeout(deleteEveryThing, 90);
}


//clears the canvas so it can draw    
function deleteEveryThing(){
    	context.save();
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Restore the transform
		console.log("delete");
		context.restore()
}    

//uses the library to an image at the specified location
function drawSphere (rex,yon) {
		console.log("call Me");
		//debugger;  
        var waxBall = new DoodleImage({
            src: "elect.png",
            left: rex,
            top: yon,
            width: 250,
            height: 50
        });
         draw(waxBall);

    }
    
//draws using the library 
function draw (objName){
		//uses only index 0 so that is draws one as a time
    	doodle.children[0]=objName;
    	console.log (doodle.children);
    	doodle.draw();
  
    	}
    	
function drawLine1 (rex,yon){
		var followLine = new Line({
        color: "black",
        lineWidth: 1,
        startX: 0,
        startY: canvas.height,
        endX: 125+rex,
        endY: 50+yon
	});
	draw(followLine);
	
}

function drawLine2 (rex,yon){
		var followLine = new Line({
        color: "black",
        lineWidth: 1,
        startX: 20,
        startY: canvas.height,
        endX: 125+rex,
        endY: 50+yon
	});
	draw(followLine);
	
}

function drawLine3 (rex,yon){
		var followLine = new Line({
        color: "black",
        lineWidth: 1,
        startX: 100,
        startY: canvas.height,
        endX: 125+rex,
        endY: 50+yon
	});
	draw(followLine);
	
}

function drawLine4 (rex,yon){
		var followLine = new Line({
        color: "black",
        lineWidth: 1,
        startX: canvas.width,
        startY: canvas.height,
        endX: 125+rex,
        endY: 50+yon
	});
	draw(followLine);
	
}

//erase all objects
//createAnObject
//drawit
//wait


}; 