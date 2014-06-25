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
	
	var suffix = BaseBackoffice.prototype.MULTIPLE_SUFFIX;
	
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#add-new-btn" , "addNewRecordEvent");
	
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
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#filter-btn", "filterBtnRecordsEvent");
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#apply-btn", "applyFilterRecordsEvent");
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#clear-btn", "clearFilterRecordsEvent");
	this.setDelegateChangeListener(".filter-dropdown", "filterDropdownEvent");
	
	/* --------------------------Links--------------------------*/

	// View link
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#tables" + " " + ".view-lnk", "viewLnkRecordEvent");

	// Edit link
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#tables" + " " + ".edit-lnk", "editLnkRecordEvent");

	// Delete link
	this.setDelegateClickListener("#" + nameSpace + suffix + " " + "#tables" + " " + ".delete-lnk", "deleteLnkRecordEvent");
	
	 
	/* --------------------------Pager--------------------------*/
		
	//setDelegateClickListener("#authorsPager .pager #previous-lnk", "previousPagerRecordEvent");
	//setDelegateClickListener("#authorsPager .pager #next-lnk", "nextPagerRecordEvent");

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
 * now and NOT future elements
 * 
 * It is useful for home page, even some library stop propagation on menu
 *
 * @param selector
 * @param handler
 */
BaseListener.prototype.setClickListener = function (selector, handler){
    
	// Shortcut
	var o = this;
   	$(selector).click(function(event){
	    	BaseListener.prototype.EventHandler.call(o, event, handler);
	});

};


/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setOnClickListener = function (selectorString, handler, context){
    
	console.log(this);
	
	// Shortcut
	var o = this;

	if (!context) {
		context = 'body';
	}
	// on() is alternative to delegate()
	$(context).on ( "click", selectorString, function(event) {
        	BaseListener.prototype.EventHandler.call(o, event, handler);
        } ) ;
	
	// more event, custom selector 
	// .on("blur","#xxx input[data-property='yyy']"


};




/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setDelegateClickListener = function (selectorString, handler, context){
    
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
	
	if (!context) {
		context = 'body';
	}
	// Shortcut
	var o = this;
	$(context).delegate(selectorString, "click", function(event) {
    		BaseListener.prototype.EventHandler.call(o, event, handler);
	});  


};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setDelegateChangeListener = function (selectorString, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selectorString, "change", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });  
};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setDelegateSubmitListener = function (selectorString, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selectorString, "submit", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });  
};


/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setDelegateDragoverListener = function (selectorString, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selectorString, "dragover", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });
};

/**
 * Set listener event to specific html list
 * now and future elements 
 *
 * @param selectorString
 * @param handler
 */
BaseListener.prototype.setDelegateDropListener = function (selectorString, handler){
	// Shortcut
	var o = this;
	$('body').delegate(selectorString, "drop", function(event) {
    	BaseListener.prototype.EventHandler.call(o, event, handler);
    });
};


BaseListener.prototype.EventHandler = function (event, handler){
	
		// Event Listener Breakpoints alternative, to see where is handler
		// Good to see Call Stack with breakpoint from here 

		if(handler instanceof Function) {
			// tracking
			console.log(handler.name);
			// basket independent / basket-free 
			handler(event);
		} else {
			// tracking
			console.log(handler);
			// basket dependent / basket-based 
			//cannot reference to obj at runtime, so need extra function
	        //obj[handler](event);
	        //this.getBasket()[handler](event);
	    	if ( BaseBackoffice.basket[handler] ) {
	    		BaseBackoffice.basket[handler](event);
	    	} else if (homeBackoffice[handler]){
	    		// default pass to home
	    		homeBackoffice[handler](event);
	    	} else {
	    		console.log("cannot find handler " + handler);
	    	}
		}
};
