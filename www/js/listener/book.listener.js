/*------------------------*/
/*bind event of Dom object*/
/*------------------------*/

// =========== Web =============== //
// Request Mapping
// Main()

console.log("book.listener");

//Auto complete
//Normal Inheritance 
BookListener.prototype = new BaseListener();
BookListener.prototype.constructor = BookListener;
BookListener.prototype.parent = BaseListener.prototype;

//Properties
function BookListener(){
	
	// Shortcut
	var o = this;
	
	BaseListener.apply(o, arguments);
	//$.extend(BookListener.prototype, BaseListener.prototype);
	
}


//Methods
/**
* init 
* */
//@override
BookListener.prototype.initListener = function (nameSpace){
	
	// Shortcut
	var o = this;
	o.parent.initListener.call(o, nameSpace);
	
	// extra listener
	
	o.setDelegateClickListener(".removeFilter", "removeFilterEvent");
	// or
	o.setDelegateClickListener("#test", bookBackoffice.testEvent);
	
};

// =========== IoC =============== //
// Statefull
// Instantiate  
var bookListener = new BookListener();

//init
//bookListener.initListener("page_book");
bookListener.initListener(BookBackoffice.prototype.NAME_SPACE);


