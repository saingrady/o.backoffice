/*------------------------*/
/*bind event of Dom object*/
/*------------------------*/

// =========== Web =============== //
// Request Mapping
// Main()

console.log("home.listener");

//Auto complete
//Normal Inheritance 
HomeListener.prototype = new BaseListener();
HomeListener.prototype.constructor = HomeListener;
HomeListener.prototype.parent = BaseListener.prototype;

//Properties
function HomeListener(){
	
	BaseListener.apply(this, arguments);
	//$.extend(BookListener.prototype, BaseListener.prototype);
	
}


//Methods
/**
* init 
* */
//@override
HomeListener.prototype.initListener = function (){
	
	// brand event
	this.setOnClickListener("#home_brand", "openBrandEvent");
		
	// menu Book 
	this.setOnClickListener("#page_books_nav", "openBookEvent");
		
	// menu Author 
	this.setOnClickListener("#page_authors_nav", "openAuthorEvent");
		
	// menu Tag
	this.setOnClickListener("#page_tags_nav", "openTagEvent");


	// modal
	this.setDelegateClickListener("#no-delete-btn", "confirmDeleteEvent");
	this.setDelegateClickListener("#yes-delete-btn", "confirmDeleteEvent");

	/*--------------------------drag and drop -------------------*/
	//setDelegateDragoverListener(".logo_img", handleDragOver);
	//setDelegateDropListener(".logo_img", handleFileSelect);
	//setDelegateDragoverListener(".flag", handleDragOver);
	//setDelegateDropListener(".flag", handleFileSelect);
	
};

//=========== IoC =============== //
//Statefull
//Instantiate  
var homeListener = new HomeListener();

//init
homeListener.initListener();


