console.log("base.listener.js");

//Properties
function BaseListener(){
	
}

//Methods

/**
 * init
 * */
//can @override
BaseListener.prototype.initListener = function (nameSpace){
	
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#add-new-btn" , "addNewRecordEvent");
	
	/* --------------------------Buttons--------------------------*/
	
	
	// Delete btn
	this.setDelegateClickListener("#delete-btn"+"."+nameSpace, "deleteBtnRecordEvent");
	
	// Edit btn
	this.setDelegateClickListener("#edit-btn"+"."+nameSpace, "editBtnRecordEvent");
	
	// Save btn
	this.setDelegateClickListener("#save-btn"+"."+nameSpace, "saveBtnRecordEvent");
	
	// Cancel btn
	this.setDelegateClickListener("#view-cancel-btn"+"."+nameSpace, "cancelBtnRecordEvent");
	this.setDelegateClickListener("#edit-cancel-btn"+"."+nameSpace, "cancelBtnRecordEvent");
	
	/* --------------------------Filters--------------------------*/
	
	// Filter btn
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#filter-btn", "filterBtnRecordsEvent");
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#apply-btn", "applyFilterRecordsEvent");
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#clear-btn", "clearFilterRecordsEvent");
	this.setDelegateChangeListener(".filter-dropdown", "filterDropdownEvent");
	
	/* --------------------------Links--------------------------*/

	// View link
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#tables" + " " + ".view-lnk", "viewLnkRecordEvent");

	// Edit link
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#tables" + " " + ".edit-lnk", "editLnkRecordEvent");

	// Delete link
	this.setDelegateClickListener("#" + nameSpace + "s" + " " + "#tables" + " " + ".delete-lnk", "deleteLnkRecordEvent");
	
	 
	/* --------------------------Pager--------------------------*/
		
	//setDelegateClickListener("#authorsPager .pager #previous-lnk", previousPagerBook);
	//setDelegateClickListener("#authorsPager .pager #next-lnk", nextPagerBook);

	/* --------------------Image Upload: choose, change, submit--------------- */

	// dynamic-class choose image
	//setDelegateClickListener(".imageUpload", chooseImage);

	// dynamic-class image file change
	//setDelegateChangeListener(".imageFile", imageChange);

	// dynamic-class form will choose an image, upload and display it
	//setDelegateSubmitListener(".imageForm", displayFormImage);
};



/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setDelegateClickListener = function (selector, handler){
    
	/*
	$(document).delegate(selector, "click", function() {
	    //call later
	    handler(selector); //this will be always Window
        });  
	*/
	
	/*
	$('body').delegate(selector, "click", function() {
		if (isValidUserLogin()) {
			handler.apply( this, arguments );
		}
	} );
	 */
	
	console.log(this);
	
	// Shortcut
	var o = this;
	$('body').delegate(selector, "click", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });  


};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setDelegateChangeListener = function (selector, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selector, "change", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });  
};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setDelegateSubmitListener = function (selector, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selector, "submit", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });  
};


/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setDelegateDragoverListener = function (selector, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selector, "dragover", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });
};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setDelegateDropListener = function (selector, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selector, "drop", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });
};


BaseListener.prototype.EventHandler = function (event, handler){
	
        //cannot reference to obj at runtime, so need extra function
        //obj[handler](event);
        //this.getBasket()[handler](event);
    	if ( BaseBackoffice.basket[handler] ) {
    		BaseBackoffice.basket[handler](event);
    	} else if (home[handler]){
    		// default pass to home
    		home[handler](event);
    	} else {
    		console.log("cannot find handler " + handler);
    	}
};