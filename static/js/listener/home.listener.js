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
	this.setClickListener("#home_brand", "openBrandEvent");
		
	// menu Book 
	this.setClickListener("#page_book-s_nav", "openBookEvent");
		
	// menu Author 
	this.setClickListener("#page_author-s_nav", "openAuthorEvent");
		
	// menu Tag
	this.setClickListener("#page_tag-s_nav", "openTagEvent");


	// modal
	this.setDelegateClickListener("#no-delete-btn", "confirmDeleteEvent");
	this.setDelegateClickListener("#yes-delete-btn", "confirmDeleteEvent");

	/*--------------------------drag and drop -------------------*/
	/*
	this.setDelegateDragoverListener(".logo_img", "handleDragOverEvent");
	this.setDelegateDropListener(".logo_img", "handleFileDropEvent");
	
	this.setDelegateDragoverListener(".flag", "handleDragOverEvent");
	this.setDelegateDropListener(".flag", "handleFileDropEvent");
	
	this.setDelegateDragoverListener(".dropZone", "handleDragOverEvent");
	this.setDelegateDropListener(".dropZone", "dragAndDropMultipleFoldersOrFilesEvent");
	*/
	
	/* --------------------------Upload image ------------*/
	//dynamic-class choose image
	//this.setDelegateClickListener(".imageUpload", "chooseImageEvent");
	// dynamic-class image file change
	//this.setDelegateChangeListener(".imageFile", "previewInputFileEvent");
	
	
	/* --------------------Upload url--------------- */
	//dynamic-class choose url
	//this.setDelegateClickListener(".urlUpload", "chooseUrlEvent");
	//dynamic-class url file change
	//this.setDelegateChangeListener(".urlFile", "markInputFileEvent");
	
};

//=========== IoC =============== //
//Statefull
//Instantiate  
var homeListener = new HomeListener();

//init
homeListener.initListener();


