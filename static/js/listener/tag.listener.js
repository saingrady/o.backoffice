/*------------------------*/
/*bind event of Dom object*/
/*------------------------*/

// =========== Web =============== //
// Request Mapping
// Main()

console.log("tag.listener");

//Auto complete
//Normal Inheritance 
TagListener.prototype = new BaseListener();
TagListener.prototype.constructor = TagListener;
TagListener.prototype.parent = BaseListener.prototype;

//Properties
function TagListener(){
	// Shortcut
	var o = this;
	BaseListener.apply(o, arguments);
	//$.extend(TagListener.prototype, BaseListener.prototype);
	
}


//Methods
/**
* init 
* */
//@override
TagListener.prototype.initListener = function (nameSpace){
	
	// Shortcut
	var o = this;
	o.parent.initListener.call(o, nameSpace);

	
};

// =========== IoC =============== //
// Statefull
// Instantiate  
var tagListener = new TagListener();

//init
//tagListener.initListener("page_tag");
tagListener.initListener(Tag.prototype.NAME_SPACE);
