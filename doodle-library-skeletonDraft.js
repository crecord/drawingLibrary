/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
 */

/*
 * Root container for all drawable elements.
 */
function Doodle (context) {
	// The drawing context for the object, generated by a canvas
    this.context = context;
    //An array of the top-level drawable elements in this doodle.
    this.children = [];
    //draws its children if child is invisible it doesn't draw.
  	}


Doodle.prototype.draw = function() {

		//console.log (this.children);
	    for (i=0; i< this.children.length; i++){
	    //console.log("inside for loop");
  		var currentChild = this.children[i];
			currentChild.draw(this.context);

  		}
};


/* Base class for all drawable objects.
 * Do not modify this class!
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        visible: true,
        top:0,

    };
    attrs = mergeWithDefault(attrs, dflt);
    // constructor code here
    this.left= attrs.left;
//    console.log(attrs.visible);
    this.visible = attrs.visible;
    this.top = attrs.top; 
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */
Drawable.prototype.draw = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};


/* Base class for objects that cannot contain child objects.
 * Do not modify this class!
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;


}
Primitive.inheritsFrom(Drawable);

/*A Text object draws text with the given attributes. Note: Text is always drawn up from the bottom of the
object. This is because there is no simple way to measure the height of a text string using canvas, so we
explicitly define it with height.

attrs: An object containing values for each of the fields in the object. If the attrs parameter is
not specified, or if one of the fields is not specified, use predefined defaults (defined for you).
*/

function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "12pt Helvetica",
        height: 12
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.content=attrs.content;
    this.fill = attrs.fill; 
    this.font = attrs.font;
    this.height = attrs.height;
    this.left = attrs.left;
    //console.log("this is the top:" + this.top);
    //console.log("this is visible:" + this.visible);
    // add constructor code here
};

Text.inheritsFrom(Drawable);
//draw: Draw the text using the values defined in attrs
   
Text.prototype.draw = function (c) {
    // your draw code here
     //console.log("this is the top:" + this.top);
	//console.log("text time");
	//console.log(this.visible);	
	if(this.visible === true){
		//console.log("text time2");
    	c.font = this.font;
    	c.fillStyle = this.fill;
    	//console.log(this.content,this.left,this.height);
    	c.fillText(this.content,this.left,this.height);
	}
};
/*A DoodleImage object draws an image.

attrs: An object containing values for each of the fields in the object. If the attrs parameter is
not specified, or if one of the fields is not specified, use predefined defaults (defined for you).
*/

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.width = attrs.width;
    this.height = attrs.height;
    this.src= attrs.src;
    //this.left=attrs.left;
    //this.top =attrs.top;
}
DoodleImage.inheritsFrom(Drawable);
//draw: Draw the image using the specified source, with the specified width and height.
DoodleImage.prototype.draw = function (context) {
    // draw code here
    //console.log(this.visible);
    if(this.visible === true){
    	var img =document.createElement("IMG");
    	img.src = this.src; 
    	//console.log (img,this.left,this.top,this.width,this.height, "I'm a string");
    	context.drawImage(img,this.left,this.top,this.width,this.height);
    }
};


function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    this.startX=attrs.startX;
    this.startY=attrs.startY;
    this.endX=attrs.endX;
    this.endY=attrs.endY;
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
    // your draw code here
}
Line.inheritsFrom(Primitive);

// draw a single line
Line.prototype.draw = function (context) {
	//console.log(this.visible);
	if(this.visible === true){
		context.lineWidth = this.lineWidth;
		context.beginPath();
		context.moveTo(this.startX,this.startY);
		context.lineTo(this.endX,this.endY);
		context.strokeStyle = this.color;
		context.stroke();
	}
};


function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
	// rest of constructor code here
	this.x = attrs.x;
	this.y = attrs.y;
	this.width = attrs.width;
	this.hieght = attrs.height;
	this.color = attrs.color;
	this.lineWidth = attrs.lineWidth;
}
Rectangle.inheritsFrom(Primitive);

Rectangle.prototype.draw = function (context) {

	if(this.visible === true){
    	context.strokeStyle= this.color;
    	context.lineWidth = this.lineWidth;
		context.strokeRect(this.x,this.y,this.width, this.hieght);
	}
};

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    this.children = [];
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill=attrs.fill;
    this.borderColor=attrs.borderColor;
    this.borderWidth = attrs.borderWidth;
    this.left = attrs.left;
    //this.top = attrs.top;
    //console.log(this.left,this.top);
    // rest of constructor code here.
    this.id="container"
}
Container.inheritsFrom(Drawable);
//draw: Draws itself and its children. If a child is not visible (visible property set to false), does not
//draw it.


//iterator = 0; 
Container.prototype.draw = function (context, n) {
    // draw code here
    //console.log("I am trying to draw my containers");
    console.log(this.children);
    //console.log(root.children);
    //				context.translate(this.children[0].left, this.children[0].top);
      //			    context.strokeStyle= this.children[0].borderColor;
    	//			context.lineWidth = this.children[0].borderWidth;
		//			context.strokeRect(0,0,this.children[0].width, this.children[0].height);
//	context.translate(this.children.left, this.children.top);
    for (var i=0; i< this.children.length; i++){    	
    	//if (n === undefined){
    	//	n=0;
    	//}
    	console.log(n);
    	console.log("iterator:" + i);

  		var currentChild = this.children[i];
  			context.save();
  			//console.log("is the top always 0:" + currentChild.left, currentChild.top);
  			context.translate(currentChild.left, currentChild.top);
  			//console.log(currentChild);
  			if(currentChild.id === "container"){
  					//context.fillStyle = currentChild.fill;
					//context.fillRect(0,0,currentChild.width, currentChild.height);
  			    	context.strokeStyle= currentChild.borderColor;
    				context.lineWidth = currentChild.borderWidth;
					context.strokeRect(0,0,currentChild.width, currentChild.height);
  			}
  			//context.clipRect(0,0,currentChild.width, currentChild.height);
  			//n +=1;
			currentChild.draw(context);
			context.restore();
			}
			
};
