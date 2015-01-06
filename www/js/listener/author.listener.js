/*------------------------*/
/*bind event of Dom object*/
/*------------------------*/

// =========== Web =============== //
// Request Mapping
// Main()

console.log("author.listener");

//Auto complete
//Normal Inheritance 
AuthorListener.prototype = new BaseListener();
AuthorListener.prototype.constructor = AuthorListener;
AuthorListener.prototype.parent = BaseListener.prototype;

//Properties
function AuthorListener(){
	// Shortcut
	var o = this;
	
	BaseListener.apply(o, arguments);
	//$.extend(AuthorListener.prototype, BaseListener.prototype);
	
}


//Methods
/**
* init 
* */
//@override
AuthorListener.prototype.initListener = function (nameSpace){
	
	// Shortcut
	var o = this;
	o.parent.initListener.call(o, nameSpace);
	
};

// =========== IoC =============== //
// Statefull
// Instantiate  
var authorListener = new AuthorListener();

//init
//authorListener.initListener("page_author");
authorListener.initListener(AuthorBackoffice.prototype.NAME_SPACE);

