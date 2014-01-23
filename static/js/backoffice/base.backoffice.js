//the base reference will have no instantication
//top hierarchy
//var baseAPI = new BaseAPI();


console.log("base.backoffice");


//Properties
function BaseBackoffice(){
	
	// Shortcut
	var o = this;
	
	//listing
    o.records = new Object();
    
    //o.records.table
	//o.records.currentRecord
	//o.records.currentData 
	
	//read only or not
	//o.records.modeRead
	
    //display or not
	//o.records.modeDisplay
    
    //filter
    o.records.filter = new Object();
    
    //paging
    o.records.paging = new Object();
    o.records.paging.cursorKeys = new Array();
    o.records.paging.pager = new Object();
    o.records.paging.from = '';
    
    
	o.validateFunctionName;
	o.PAGE_SIZE = 10;
	o.UPLOAD_IMAGE_MAX = 5;
	
}

//Static: super global, stateful, IoC, database
//basket reference to current page and record(s)
//basket is generic, it could be any object like book, user, etc...
BaseBackoffice.basket = new Object();
BaseBackoffice.cart = new Object(); // reserved
BaseBackoffice.confirmDelete = false;
BaseBackoffice.msg = "";

//================================================================================ //

//Define
//can @override
BaseBackoffice.prototype.NAME_SPACE = "";
BaseBackoffice.prototype.CONTAINER_RECORD = "";
BaseBackoffice.prototype.PAGE_RECORD = "";
BaseBackoffice.prototype.NAV_RECORDS = "";
BaseBackoffice.prototype.TABLE_RECORD = "";
BaseBackoffice.prototype.FILTER_RECORDS = "";
BaseBackoffice.prototype.TABLE_RECORDS = "";
BaseBackoffice.prototype.CACHE_RECORDS = "";
BaseBackoffice.prototype.MULTIPLE_SUFFIX = "-s";

//=========== DAO =============== //
BaseBackoffice.prototype.recordAPI = new BaseAPI();

//=========== Service =============== //
//Methods

/**
* Init records
* */
// can @override
BaseBackoffice.prototype.initRecords = function (isFilterInit){
	
			console.log("initRecords");
			
			// Shortcut
			var o = this;
			//var o = BaseBackoffice.basket;
		
			//optional 
			jQuery.ajaxSetup({async:false});
			o.preInitRecords();
			jQuery.ajaxSetup({async:true});
			
			o.processing();
			o.setBtnClass(o.NAME_SPACE);

			if (isFilterInit){
				o.initFilters();
			}

			var requestData = new Object();

			// clear cache
		    localStorage.setItem(o.CACHE_RECORDS, undefined);

			//get filters here
			o.getFilter(o.records, requestData);
			
			//get paging
			o.getPaging(o.records, requestData);
			
			o.recordAPI.getRecord(requestData, function(jRecords){
				
						o.records.TABLE_RECORDS = jRecords;
						
						//setPaging("NEXT", books, 10, jRecords.cursorKey, "#booksPager .pager #previous-lnk", "#booksPager .pager #next-lnk");

						$.each(o.records.TABLE_RECORDS, function(index, value){
							
							var record = o.getTemplateDom().tmpl(o.getTemplateValue(value));
							
							$(record).data("store", value);

							$(record).appendTo(o.TABLE_RECORDS);
							
							console.log(record);
							
						});

						
						//set paging
						//setPaging("#brandsPager .pager #previous-btn", "#brandsPager .pager #next-btn", brands, 10, jBrands.cursorKey);
					    //displayPagePosition("#booksPager #pagePosition", books);

						o.processed();
						
						// for example: created, updated, etc. 
						if (o.getMsg()) {
							o.success(o.getMsg());
						}
						
						//optional 
						jQuery.ajaxSetup({async:false});
						o.postInitRecords(jRecords);
						jQuery.ajaxSetup({async:true});
						
			}, o.recordAPI.failureHandler);

			
};

/**
* Init record
* */		
//can @override
BaseBackoffice.prototype.initRecord = function (){
	
			console.log("initRecord");
			
			// Shortcut
			var o = this;
			
			//optional 
			jQuery.ajaxSetup({async:false});
			o.preInitRecord();
			jQuery.ajaxSetup({async:true});
			
			var record = o.getRecordData(o.records.currentRecord);

			if (record) {
				o.giveDomData(o.TABLE_RECORD, record);
			}

			o.updateMode(o.TABLE_RECORD, o.records);
			
			// duplicate notifyContainer to buttom of page
			//$("#homeContainer").after($("#notifyContainer").clone(true));
			
			//optional 
			jQuery.ajaxSetup({async:false});
			o.postInitRecord();
			jQuery.ajaxSetup({async:true});

};

/**
* get template value
* */		
//can @override
BaseBackoffice.prototype.getTemplateValue = function (value){
		return value;
};

/**
* get template dom
* */		
//can @override
BaseBackoffice.prototype.getTemplateDom = function (){
		return $("#recordTemplate");
};

/**
* Pre Init records
* */		
//can @override
BaseBackoffice.prototype.preInitRecords = function (){
			// override version
};

/**
* Post Init records
* */		
//can @override
BaseBackoffice.prototype.postInitRecords = function (jRecords){
			// override version
};

/**
* Pre Init record
* */		
//can @override
BaseBackoffice.prototype.preInitRecord = function (){
			// override version
};

/**
* Post Init record
* */		
//can @override
BaseBackoffice.prototype.postInitRecord = function (){
			// override version
};

/**
* Init filter
* */		
//can @override
BaseBackoffice.prototype.initFilters = function (){
	//override version
};

/**
* Add new
* */	
//can @override
BaseBackoffice.prototype.addNewRecordEvent = function (event){
	
			// Shortcut
			var o = this;
	
			//clean old data first
			o.cleanOldData(o.records);
			
			//reset
			o.records.modeRead = false;
			o.records.modeDisplay = "inline-block";
			
			o.loadHtmlContent($(o.CONTAINER_RECORD), o.PAGE_RECORD);
			o.changeModeEdit();
			
};
		
	
/**
* View Link
*/
//can @override
BaseBackoffice.prototype.viewLnkRecordEvent = function (event){
	
			// Shortcut
			var o = this;
			
			o.setCurrentRecord( event.target , o.records ); 
			o.viewRecord(o.records, $(o.CONTAINER_RECORD), o.PAGE_RECORD); 
};
		
/**
* Edit Link
*/
//can @override
BaseBackoffice.prototype.editLnkRecordEvent = function (event){
	
			// Shortcut
			var o = this;
			
			o.setCurrentRecord( event.target, o.records ); 
		
			o.editBtnRecordEvent();
};
		
/**
* Delete Link
*/
//can @override
BaseBackoffice.prototype.deleteLnkRecordEvent = function (event){

			// Shortcut
			var o = this;
			
			o.setCurrentRecord( event.target , o.records ); 
			
			o.deleteBtnRecordEvent();
};
		
/**
* Edit Button
*/
//can @override
BaseBackoffice.prototype.editBtnRecordEvent = function (event){
	
			// Shortcut
			var o = this;
			o.editRecord( o.records, $(o.CONTAINER_RECORD), o.PAGE_RECORD); 
};
		
/**
* Delete Button
*/
//can @override
BaseBackoffice.prototype.deleteBtnRecordEvent = function (event){
			
			// Shortcut
			var o = this;
			
			//confirmation
			$('#deleteModal').modal('show');
			//$('#deleteModal').modal({ keyboard: false });
			$('#deleteModal').on('hidden', function () {
				  // do something
				if (BaseBackoffice.confirmDelete) {
					
						o.recordAPI.deleteRecord(o.records.currentData.id, function(jcountry){
							
				        	o.prepareMsg("Deleted successfully.");
				        	
				        	//reset paging
				        	o.resetPaging(o.records);

				        	//reload page
				        	o.reloadPage();
							
						}, o.recordAPI.failureHandler);
				}
				$('#deleteModal').unbind('hidden');
				
			});
			
};
	
/**
 * View Record
 */
BaseBackoffice.prototype.viewRecord = function (records, container, page /*, deleteHandler, cancelHandler, saveHandler*/ ){
		console.log("viewRecord");
		
		// Shortcut
		var o = this;
		
		//var data = $(this).parents('[id^=tr_record_]').data('store');
		//console.log(that);
		//console.log(this);
	    //var data = getCurrentRecord(this);
		//var data = getCurrentRecord(that);
		//records.currentRecord = data;
		var data = records.currentData;
		
		//---------------------------------------
		
		console.log(data);
		//success('view' + data + data.id);
		
		//Modal is the best choice to isolate operating on any record
		//$('#myModal').modal({backdrop:'static'});
		//$('#myModal').modal('show');
	    //$('#myModal').modal('hide');
		
		//book.data = data;
		
		
		records.modeRead = true;
		records.modeDisplay = "none";
		
		//loadHtmlContent($("#page_book"), "../admin/book.html");
		o.loadHtmlContent(container, page);
		
		//---------------------------------------
		
		// assign edit, delete handler
		o.changeModeView(/*editRecord, deleteRecord*/);

}; 
	
/**
 * Edit Record
 */
BaseBackoffice.prototype.editRecord = function (records, container, page){
		console.log("editRecord");
		
		
		// Shortcut
		var o = this;
		
		//console.log(that);
		//var data = $(this).parents('[id^=tr_record_]').data('store');
	    //var data = getCurrentRecord(this);
		//var data = getCurrentRecord(that);
		//records.currentRecord = data;
		var data = records.currentData;
		
		//---------------------------------------
		
		console.log(data);
		//success('edit' + data + data.id);
		//book = data;
		
		
		records.modeRead = false;
		records.modeDisplay = "inline-block";
		//records.modeDisplay = "block";
		//block: new line
		//inline-block: not new line
		
		//loadHtmlContent($("#page_book"), "../admin/book.html");
		o.loadHtmlContent(container, page);
		
		//---------------------------------------
		
		// assign cancel, save handler
		o.changeModeEdit(/*refreshBook, saveRecord*/);
		
		
};
	
/**
 * Delete Record
 */
BaseBackoffice.prototype.deleteRecord = function (records){
		console.log("deleteRecord");
		
		// Shortcut
		var o = this;
		
		//var data = $(this).parents('[id^=tr_record_]').data('store');
	    //var data = getCurrentRecord(this);
		//var data = getCurrentRecord(that);
		//records.currentRecord = data;
		var data = records.currentData;
		
		//---------------------------------------

		//book = data;
		
		//cascade, biz
		
		//tr.remove >> data.remove 
		//	$(this).parents('[id^=tr_record_]').remove();
		
		//before delete
		console.log(records.table);
		

	    //console.log(removeOneRecord(this, book, books));
		console.log(o.removeOneRecord(records));
		/*
		//books[i].remove
		var index = books.indexOf(book);
		
		if (index > -1) {
			bookDeleted = books.splice(index,1);
			console.log(bookDeleted);
		}
		*/
		
		//after delete
		console.log(records.table);
		console.log(records.currentRecord);
		//success('delete' + data + data.id);
		
};

/***/
BaseBackoffice.prototype.changeModeView = function (/*editHandler, deleteHandler*/){
		console.log("changeModeView");
		
		// Shortcut
		var o = this;
		
		o.hideAllNotify();
		$('#viewNotify').show();
		
		//$('body').delegate("#btn-edit", "click", function(){ editHandler(); });
		//$('body').delegate("#btn-delete", "click", function(){ deleteHandler(); });
		
		// duplicate notifyContainer to buttom of page
		$("#homeContainer").after($("#notifyContainer").clone(true));
};
	
/***/
BaseBackoffice.prototype.changeModeEdit = function (/*cancelHandler, saveHandler*/){
		console.log("changeModeEdit");
		
		// Shortcut
		var o = this;
		
		o.hideAllNotify();
		$('#editNotify').show();	
		
		//$('body').delegate("#btn-cancel", "click", function(){ cancelHandler(); });
		//$('body').delegate("#btn-save", "click", function(){ saveHandler(); });
		
		// duplicate notifyContainer to buttom of page
		$("#homeContainer").after($("#notifyContainer").clone(true));
};

/***/
BaseBackoffice.prototype.saveBtnAfter = function (selector){
		jQuery.ajaxSetup({async:false});
		$(selector).trigger("click"); //messaging("");
		messaging("Saved.");
		jQuery.ajaxSetup({async:true});
};

/**
* Cancel Button
*/
//can @override
BaseBackoffice.prototype.cancelBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			$(o.NAV_RECORDS).trigger("click");
};

/***/	
BaseBackoffice.prototype.removeOneRecord = function (records){
		var deletedRecord = null;
		//var record = getCurrentRecord(selector);
		
		
		
		//sotres[i].remove
		console.log(records.currentData);
		var index = records.table.indexOf(records.currentData);
		
		if (index > -1) {
			// remove logical data
			deletedRecord = records.table.splice(index,1);
			console.log(deletedRecord);
		}
		
		//remove from table
		//$(selector).parents('[id^=record_]').remove();
		// remove physical appearance
		$(records.currentRecord).remove();
		
		
		return deletedRecord;
		
};

/**
* Define mandatory fields
*/
//can @override
BaseBackoffice.prototype.setMandatoryFields = function (){
	// Shortcut
	//var o = this;
	
	// can define image mandatory here
	//o.setImageMandatory("#imageUrl1");
	//o.setImageMandatory("#imageUrl2");

};
	
	
/**
* Validate
*/
//can @override
BaseBackoffice.prototype.validateRecord = function (){
	// Shortcut
	var o = this;
	
	if (!o.isValid($(o.TABLE_RECORD).find(":input"), {offset: [0, 4]}) |
			!o.isValid($(o.TABLE_RECORD).find("img"), {offset: [0, 87]})) {
		return false;
	}
	return true;
};
		
/**
* Save Button
*/
//can @override
BaseBackoffice.prototype.saveBtnRecordEvent = function (event){
	
	console.log("saveBtnRecord");
	
	// Shortcut
	var o = this;
	
	// define mandatory
	o.setMandatoryFields();
	
	//validation
	//o.validateFunctionName = "validateRecord";
	if (!o.validateRecord()) {
		return;
	}

	// Reset paging when save more record
	//resetPaging(brands);

   //var requestData = Converter.prototype.getJsonString(o.getRequestData(o.TABLE_RECORD));
	var requestData = o.getRequestData(o.TABLE_RECORD);
	console.log("requestData: ", requestData);

	
	if ((o.records.currentData !== undefined) && (o.records.currentData !== null)) {
  	// OLD
  	console.log("old");
  	console.log(requestData);
      o.recordAPI.updateRecord(o.records.currentData.id, requestData, function(jRecord){
      	o.prepareMsg("Updated successfully.");
      	//reload page
      	o.reloadPage();
      }, o.recordAPI.failureHandler);
  	
  } else {
      // NEW
  	console.log("new");
      console.log(requestData);
  	o.recordAPI.createRecord(requestData, function(jRecord){
  		o.prepareMsg("Created successfully.");
  		//reload page
  		o.reloadPage();
  	}, o.recordAPI.failureHandler);
  }

};

/**
* Reload page
* */	
//can @override
BaseBackoffice.prototype.reloadPage = function(){
	
	// Shortcut
	var o = this;
	
	o.cancelBtnRecordEvent();
	
};

/**
* Toggle Filter
* */	
//can @override
BaseBackoffice.prototype.filterBtnRecordsEvent = function(event){
	
	// Shortcut
	var o = this;
	o.filterBtn(o.FILTER_RECORDS);
};

/**
* Apply Filter
* */
//can @override
BaseBackoffice.prototype.applyFilterRecordsEvent = function (event){
	// override version
},

/**
* Clear Filter
* */
//can @override
BaseBackoffice.prototype.clearFilterRecordsEvent = function (event){
	
	// Shortcut
	var o = this;
	
	console.log("clearFilterRecord");
	o.records.filter = new Object();

	$(o.TABLE_RECORDS + " " + "tr").not(":first").remove();
	o.initRecords(true);
};

/**
* Filter dropdown
* */
//can @override
BaseBackoffice.prototype.filterDropdownEvent = function (event){

	// Shortcut
	var o = this;
	o.applyFilterRecordsEvent(event);
	
};


/**
* Previous Pager
* */
//can @override
BaseBackoffice.prototype.previousPagerRecordEvent = function (event){

	// Shortcut
	var o = this;
	o.previousPager(o.records, 10, initBrands);
};

/**
* Next Pager
* */
//can @override
BaseBackoffice.prototype.nextPagerRecordEvent = function (event){

	// Shortcut
	var o = this;
	o.nextPager(o.records, 10, initBrands);
};

/**
* Paging
* */
//can @override
BaseBackoffice.prototype.pageEvent = function(pageNumber, event){
	// Shortcut
	var o = this;
	
	console.log(pageNumber);
    console.log(event.target);
    
    //set pager
    o.records.paging.pager["cursorKey"] = (pageNumber-1) * 10;
    o.records.paging.pager["pageSize"] = 10;
    
    //reload
    $(o.TABLE_RECORDS).html("");
    o.initRecords();
    
};
// ================================================================================ //

// support Methods

/**
 * init base
 * */
BaseBackoffice.prototype.initBaseBackoffice = function (){
	
		// Shortcut
		var o = this;
		
		console.log("initBaseBackoffice");

		o.ajaxSetting();
		
		o.setCustomValidator();

		// drag and drop
		o.setDataTransfer();
};
	
BaseBackoffice.prototype.getBasket = function (){
	// always reference to obj at runtime, not use copy
    if (BaseBackoffice.basket) {
    	return BaseBackoffice.basket;
    }
};

BaseBackoffice.prototype.updateBasket = function (obj){
    return BaseBackoffice.basket = obj;
};

BaseBackoffice.prototype.prepareMsg = function (msg){
    return BaseBackoffice.msg = msg;
};

BaseBackoffice.prototype.clearMsg = function (){
    return BaseBackoffice.msg = "";
};

BaseBackoffice.prototype.getMsg = function (){
    return BaseBackoffice.msg;
};

/***/
BaseBackoffice.prototype.getBasic = function (){
	var basicUsername='', basicPassword='';
    var tok = basicUsername + ':' + basicPassword;
    var hash = window.btoa(tok);
    return 'Basic ' + hash;
};
	
/***/    
BaseBackoffice.prototype.ajaxSetting = function (){
    	/*
    	$.ajaxSetup( {
    	    async: false,
    	    cache: false,
    	    data: null
    	});
    	*/
    		
	    /*
    	// every ajax request from now so on		
    	jQuery.ajaxSetup({
    	    beforeSend: function (jqXHR, settings) {
    	        jqXHR.setRequestHeader('Authorization', baseBackoffice.getBasic());
                    // processing();
    	    },
    	
    	    complete: function (jqXHR, textStatus) {
    	        // do something
    		// processed();
    	    },
                
    	    //async: false, // if everyting synchronous, it breaks ajax concept. still have slow performance. 
                //synchronize not all time is not ok, synchronize sometime is ok
    	    //jQuery.ajaxSetup({async:false});
                //... sequencial asynchronous statements required
    	    //jQuery.ajaxSetup({async:true});

    	    cache: false,
    	    data: null
            });
    	
    	$( document ).ajaxStart(function() {
    		$( "#loading" ).show();
    	});

    	$( document ).ajaxStop(function() {
    		$( "#loading" ).hide();
    	});
    	*/
};
    
   
/**
 * define custom validator here
 * data-xxx
 * */
BaseBackoffice.prototype.setCustomValidator = function (){

    	// for :input text
    	$.tools.validator.fn("[data-number-required=number-required]", "Please input only number", function(input, value) {
    		return /^-?[0-9]*(\.[0-9]+)?$/.test(value);
    	});

    	// for :input text
    	$.tools.validator.fn("[data-telephone-number=telephone-number]", "Please enter a valid telephone number.", function(input, value) {
    		return /^\+\d+$/.test(value);
    	});

    	// for :input select
    	$.tools.validator.fn("[data-select-required=select-required]", "Please select an item", function(input, value) {
    		return (("" != value) && (undefined != value));
    	});
    	
    	// for :input password
    	$.tools.validator.fn("[data-password-required=password-required]", "Password should contain text with special character at least 8 characters.", function(input, value) {
    		return (/(?=^.{8,}$)(?=[^A-Za-z]*[A-Za-z])(?=[^!,@,#,$,%,^,&,*,?,_,~,-,(,)]*[!,@,#,$,%,^,&,*,?,_,~,-,(,)])/.test(value));
    	});

    	// for img
    	$.tools.validator.fn("[data-image-required=image-required]", "Please upload an image", function(input, value) {
    		return ("" != $(input).attr("src"));
    	});

    	// for static pop up select
    	$.tools.validator.fn("[data-static-required=static-required]", "Please select an item", function(input, value) {
    		return (("" != $(input).text()) && (undefined != $(input).text()));
    	});
    	
    	// for dynamic pop up select
    	$.tools.validator.fn("[data-dynamic-required=dynamic-required]", "Please add an item", function(input, value) {
    		return ($(input).children().length > 0);
    	});

    	// for url
    	$.tools.validator.fn("[data-url-optional=url-optional]", "Please enter a valid URL", function(input, value) {
    		if (("" != value) && (undefined != value)) 
    			return (/^(https?):\/\/.+$/i.test(value));
    		else 
    			return true;
    	});
    	
    	// for img size
    	$.tools.validator.fn("[data-img-size-optional=img-size-optional]", "Please upload a valid image size", function(input, value) {
    		if ("" != $(input).attr("src")) {
    			return (($(input)[0].naturalWidth == $(input).data("width")) && ($(input)[0].naturalHeight == $(input).data("height"))); 
    		} else 
    			return true;
    	});

    	// for img url
    	$.tools.validator.fn("[data-img-url-valid=img-url-valid]", "Please re-upload a valid image", function(input, value) {
    		if ("" != $(input).attr("src")) {
    			return (/^(https?):\/\/.+$/i.test($(input).attr("src"))); 
    		} else 
    			return true;
    	});

};
    
/***/
BaseBackoffice.prototype.setDataTransfer = function () {
	
		// add the dataTransfer property for use with the native 'drop' event
		// to capture information about files dropped into the browser window
		jQuery.event.props.push( "dataTransfer" );
	
};

/**
 * Specifying name attribute is mandatory
 * for example: <input type="text" id="bookName" name="bookName" required="required"></input> 
 * */
BaseBackoffice.prototype.isValid = function (selectors, offset){
	
	  if ( $(selectors).length == 0 ) return true;
	
	  //input.validator({position: 'top  center', message: '<div><em/></div>',offset: [5, 110]});
	
	  //[10, -20] moves the tooltip position 10px downwards and 20px to the left.
	  //input.validator({offset: [0, 87]});
	
	  // initialize validator for a bunch of input fields
	  var inputs = $(selectors).validator(offset);
	  // perform validation programmatically
	  return inputs.data("validator").checkValidity();
	  
};
  
/***/
//set on the fly
BaseBackoffice.prototype.setImageMandatory = function (selector){
	  	$(selector).attr("data-image-required", "image-required");
};
  
/***/
//set on the fly
BaseBackoffice.prototype.setUrlValid = function (selector){
	$(selector).attr("data-url-optional", "url-optional");
}; 
  
/***/
//set on the fly
BaseBackoffice.prototype.setImageSizeValid = function (selector, width, height){
	$(selector).attr("data-img-size-optional", "img-size-optional");
	$(selector).attr("data-width", width);
	$(selector).attr("data-height", height);
	$(selector).attr("data-img-url-valid", "img-url-valid");
};
  
  
/**
 * Handle fail ajax request
 */
BaseBackoffice.prototype.failureHandler = function (jqXHR, textStatus, errorThrown){
  	//hideAllLoadingAnimations();
  	var responseStatus = jqXHR.status; 
  	if(UNAUTHORIZED_RESPONSE_CODE == responseStatus){
  		document.location = "/index.html";
  	}
};
  
/**
 * Change active element, navigation, etc.
 */
BaseBackoffice.prototype.resetActive = function (selectorOld, selectorNew){
  	$(selectorOld).removeClass("active");
  	$(selectorNew).addClass("active");
};
  
/**
 * Change visible element, mainContainer, etc.
 */
BaseBackoffice.prototype.resetVisible = function (selectorOld, selectorNew){
  	$(selectorOld).hide();
  	$(selectorNew).show();
};
  
/***/
BaseBackoffice.prototype.updateMode = function (container, records, callback){
	
		// Shortcut
		var o = this;
	
	    //define what are in mode-red:

	    /*
		$(container + ' [type=text]').addClass('mode-read');
		$(container + ' select').addClass('mode-read');
		$(container + ' textarea').addClass('mode-read');
		$(container + ' [type=email]').addClass('mode-read');
		$(container + ' [type=url]').addClass('mode-read');
	    */

	    $(container + ' :input').addClass('mode-read');

	    o.setClassModeRead(container, records.modeRead);
	    
	    //define what are in mode-display:
	    $(container + ' :button').addClass('mode-display');
	    o.setClassModeDisplay(container, records.modeDisplay);

	/*
	$( "#test" ).click(function() {
		var that = this;
		  f1("1", function(){
			f2(2, 3, that)
		  });
	});
	*/	
	    if  (callback) callback();
		
		
	    //success("Done.");

};
	
/***/
BaseBackoffice.prototype.cleanOldData = function (records){
		//clear 
		records.currentRecord = null;
		records.currentData = null;
};

/***/
BaseBackoffice.prototype.setCurrentRecord = function (that, records){
	
		// Shortcut
		var o = this;
	
		console.log("setCurrentRecord");
		
		//records.table
		//records.currentRecord
		//records.currentData //not use modal form, TR will be remove, cannot get data anymore
		records.currentRecord = $(that).parents('[id^=record_]');
		//records.currentData = this.getRecordData(records.currentRecord);
		records.currentData = o.getStoreData(records.currentRecord);
		
		console.log(records.currentRecord);
		console.log("data");
		//console.log(records.currentRecord.data("store"));
		console.log(o.getRecordData(records.currentRecord));
		return records.currentRecord;
};
	
/***/	
BaseBackoffice.prototype.getRecordData = function (record){
		console.log("getRecordData");
		//console.log($(record).data('store'));
		return $(record).data('store');
};
	
/***/	
BaseBackoffice.prototype.getStoreData = function (selector){
		if ($(selector).data('store')){
			return $(selector).data('store');	
		} else {
			return $(selector).parents('.storeData').data('store');	
		}	
};
	


	
/***/
BaseBackoffice.prototype.filterBtn = function (selector){
		//$(selector).toggle();
		$(selector).toggle( "slow", function() {
			// Animation complete.
		});
};
	
	
/***/
BaseBackoffice.prototype.hideAllNotify = function (){
		$('.notify').hide();
};

/**
 * html page name to load into the mainContainer
 * @param html
 */
BaseBackoffice.prototype.loadHtmlContent = function (selector, html){
	
		// Shortcut
		var o = this;
	
	  	// console.log("loadHtmlContain");
	  	o.processing();
	  	$(selector).html("<p>loading...</p>").load(html);
	  	o.resetVisible('#homeContainer [id^="page_"]', selector);
	  	
	  	// clean error
	  	$(".error").remove();
};
	
/***/
BaseBackoffice.prototype.processing = function (){

		// Shortcut
		var o = this;
	
		o.hideAllNotify();
	
		$("#processing").css("display", "block");
		
		//$("#success").css("display", "none");
		// could display error message in wrong positive for long time, not a good look
		$(".error").remove();
};
  

/***/
BaseBackoffice.prototype.success = function (msg){
	
		// Shortcut
		var o = this;
		
		o.hideAllNotify();
		if (msg) {
			$("#success span").text(msg);
			$("#success").css("display", "block");
			o.clearMsg();
		}
		// have messge, done.
		o.processed();
};
	
/***/
BaseBackoffice.prototype.error = function (msg){
	
	
		// Shortcut
		var o = this;
		
		o.hideAllNotify();
		
		if (msg) {
			$("#error span").text(msg);
			$("#error").css("display", "block");
			o.clearMsg();
		}
		// have messge, done.
		o.processed();
};
	
/***/
BaseBackoffice.prototype.info = function (msg){
	
		// Shortcut
		var o = this;
		
		o.hideAllNotify();
		
		if (msg) {
			$("#info span").text(msg);
			$("#info").css("display", "block");
			o.clearMsg();
		}
		// have messge, done.
		o.processed();
};

/***/
BaseBackoffice.prototype.processed = function (){
		// only hide processing, keep other notify
		$("#processing").css("display", "none");		
};
	

/***/
//override alert function of javascript
BaseBackoffice.prototype.alert = function (body, title){
		//dialog(body, title);
		//alert("inputed file path is not an image! <br> it should be: *.jpg, *.png");
		if (title == undefined) title = "ALERT";
		$("<div title=" + title + ">" + body + "</div>").dialog({
									      //modal: true,
									      open: function() { $(".ui-dialog-titlebar-close").hide(); },
									      buttons: {
										Ok: function() {
										  $( this ).dialog( "close" );
										}
									      }
									    });
};
	
/***/
//How to call:
//dialog("This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the 'x' icon.", "Basic dialog");
BaseBackoffice.prototype.dialog = function (body, title){
		$("#dialogTemplate").tmpl({'title': title, 'body': body}).dialog({
									      //modal: true,
									      open: function() { $(".ui-dialog-titlebar-close").hide(); },
									      buttons: {
										Ok: function() {
										  $( this ).dialog( "close" );
										}
									      }
									    });
};
	
/***/
BaseBackoffice.prototype.loadScripts = function (scripts){
	
		console.log("loadScripts");

		/* Script must be in order:
		1 Base API
		2 Backoffices already loaded in home.html
		3 Listeners
		4 Converters
		*/
		
		$.map( scripts , function(v,k){
			console.log(k, v);
			loadScript(k, v, function(){
				//initialization code
				console.log("done");
			});
		});
};
	
/**
 * load script first time only to common page - home page
 * we want to save loading performance
 */
BaseBackoffice.prototype.addScript = function (scriptName, scriptFile, container){
		// add script to body as default
		if (container == undefined)
		{
			container = 'body';
		}
		
		if ($("#" + scriptName).length >= 1)  return;
		
		/*
		var script = $('<script>')
				 .attr('id', scriptName)
				 .attr('type', 'text/javascript')
				 .attr('src', scriptFile);
		*/
		
		var script = $.getScript(scriptFile);
		//$(container).append(script);
		//execute it too		
		console.log(scriptFile);
		$(container).append(script);


};
	
/**
 * Load external JavaScript
 */
BaseBackoffice.prototype.loadScript = function (id, url, callback){

		if ($("#" + id).length >= 1)  return false;
		
		var script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}

		script.id = id;
		script.src = url;
		document.getElementsByTagName("body")[0].appendChild(script);
};
	
/***/
BaseBackoffice.prototype.generateProperties = function (selectors){
		
		var properties = new Object();
		
		$(selectors).each(function(){
			properties[$(this).attr("id")] = $(this).val();
		});
		
		return properties;
};
	
/***/
BaseBackoffice.prototype.updateRequestData = function (selectors, requestData){
		
		//var properties = new Object();
		
		$(selectors).each(function(){
			requestData[$(this).attr("id")] = $(this).val();
		});
		
		return requestData;
};
	
/**
 * Set group of mode readonly or not
 * input, option, etc.
 */
BaseBackoffice.prototype.setClassModeRead = function (selector, modeRead){
		//$(selector).find('.mode-read').prop("readonly", modeRead);
		$(selector).find('.mode-read').prop("disabled", modeRead);
};
	
/**
 * Set group of mode display or not
 * button, link, etc.
 */
BaseBackoffice.prototype.setClassModeDisplay = function (selector, modeDisplay){
		$(selector).find('.mode-display').css("display", modeDisplay);
};

/**
 * Callback function from Uploading image 
 * Used by iframe post form only
 */
BaseBackoffice.prototype.showImageFile = function (data, form){
		console.log("showImageFile");
		console.log(form);
		var imagePath = data.imageFile;
		$(form).find("img").attr("src",imagePath);
	    console.log(imagePath);
};
	
/**
 * Change active element, navigation, etc.
 */
BaseBackoffice.prototype.resetActive = function (selectorOld, selectorNew){
		$(selectorOld).removeClass("active");
		$(selectorNew).addClass("active");
};
	
/**
 * Change visible element, mainContainer, etc.
 */
BaseBackoffice.prototype.resetVisible = function (selectorOld, selectorNew){
		$(selectorOld).hide();
		$(selectorNew).show();
}; 
	
/***/
BaseBackoffice.prototype.setBtnClass = function (classMarker){

		var className = "btn btn-primary" + " " + classMarker;
		
		$("#edit-btn").attr("class", className);
		$("#delete-btn").attr("class", className);
		$("#view-cancel-btn").attr("class", className);
		$("#edit-cancel-btn").attr("class", className);
		$("#save-btn").attr("class", className);
		$("#filter_btn" + "_" + classMarker).attr("class", className);
		
};
	
/***/
BaseBackoffice.prototype.setFilter = function (records, filterName, filterValue){
		records.filter[filterName] = filterValue;
};

/***/
BaseBackoffice.prototype.getFilter = function (records, requestData){
		$.extend(requestData, records.filter);
};
	
/**
 * Get all and by filter have different api 
 * */
BaseBackoffice.prototype.objectSize = function (obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
};
	
/***/
BaseBackoffice.prototype.resetPaging = function (records){
		records.paging.cursorKeys = new Array(); 
		records.paging.pager = new Object();
};
	
/***/
BaseBackoffice.prototype.displayPagePosition = function (containerId, records){
		var templateData = {pageIndex: records.paging.cursorKeys.length, pageCount: Math.ceil(records.paging.totalSize / PAGE_SIZE)};

		//clear first
		$(containerId).html("");
		
		$("#paginationTemplate").tmpl(templateData).appendTo(containerId);
};

/***/
BaseBackoffice.prototype.setPaging = function (previousPager, nextPager, records, cursorKey, totalSize){
		
		if (totalSize !== undefined) {
			records.paging.totalSize = totalSize;
		}
		
		if ((records.paging.from != '') || 
				((records.paging.from == '') & (records.paging.cursorKeys.length == 0))) {
			
		    records.paging.cursorKeys.push(cursorKey);

		}
		
		//Reset pagers

		// PREVIOUS
		if (records.paging.cursorKeys.length < 2){
			$(previousPager).prop("disabled", true);
		}	else {
			$(previousPager).prop("disabled", false);
		}
		
		//NEXT
		//if (cursorKey == undefined) {
		if ((records.paging.cursorKeys.length * PAGE_SIZE) >= records.paging.totalSize) {
		    $(nextPager).prop("disabled", true);
		} else {
			$(nextPager).prop("disabled", false);
		}
		
		//Clear
		records.paging.from = '';
		
}; 

/***/
BaseBackoffice.prototype.getPaging = function (records, requestData){
		$.extend(requestData, records.paging.pager);
};
	
/**
 * Previous Pager
 * */
BaseBackoffice.prototype.previousPager = function (records, pageSize, handler){
		console.log("previousPager");
		records.paging.from = "PREVIOUS";
		//remove the unused cursorKey
		records.paging.cursorKeys.pop();
		//remove the used cursorKey
		records.paging.cursorKeys.pop();
		
		records.paging.pager["cursorKey"] = records.paging.cursorKeys[ records.paging.cursorKeys.length - 1 ];
		records.paging.pager["pageSize"] = pageSize;

		handler();
}; 
	
/**
 * Next Pager
 * */
BaseBackoffice.prototype.nextPager = function (records, pageSize, handler){
		console.log("nextPager");
		records.paging.from = "NEXT";
		
		records.paging.pager["cursorKey"] = records.paging.cursorKeys[ records.paging.cursorKeys.length - 1 ];
		records.paging.pager["pageSize"] = pageSize;
		
		handler();
};
	
/**
 * Backup Filter Html
 * */
BaseBackoffice.prototype.backupHtml = function (source, destination){
		//Copy an element including event handlers
		destination.saveHtml = $(source).clone(true);
};
	
/**
 * Restore Filter Html
 * */
BaseBackoffice.prototype.restoreHtml = function (source, destination){
		$(destination).replaceWith(source.saveHtml);
};
	
/**
 * Retrieve Filter Html
 * */
BaseBackoffice.prototype.retrieveHtml = function (records){
		return records.saveHtml;
};
	
/**
 * Remove Filter Html
 * */
BaseBackoffice.prototype.removeHtml = function (records){
		records.saveHtml = undefined;
};
	
/* --------------------------Drag and Drop------------------------ */

/***/
BaseBackoffice.prototype.handleDragOverEvent = function (evt) {
		console.log("handleDragOver");
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}; 
	
/**
 * Multiple files/folders drop
 * */
//dragAndDropMultipleFoldersAndFiles
BaseBackoffice.prototype.dragAndDropMultipleFoldersOrFilesEvent = function (evt) {
		
	
		// Shortcut
		var o = this;
	
		console.log("dragAndDropMultipleFoldersAndFiles");
		
		evt.stopPropagation();
		evt.preventDefault();

		var dataTransfer = evt.dataTransfer;
	    
		if(dataTransfer && dataTransfer.items){
			var items = dataTransfer.items, 
						len   = items.length,
						i, entry;
			for(i=0; i<len; i++){
				
				entry = items[i];

				if(entry.getAsEntry){  //Standard HTML5 API
					entry = entry.getAsEntry();
				}else if(entry.webkitGetAsEntry){  //WebKit implementation of HTML5 API.
					entry = entry.webkitGetAsEntry();
				}

				if(entry.isFile){
					//Handle FileEntry
					o.readFile(entry, function(file){
						o.uploadFile.call(o, file);
						});
				}else if(entry.isDirectory){
					//Handle DirectoryEntry
					o.readFileTree(entry, function(file){
						o.uploadFile.call(o, file);
						});
				}
			}
		}
		
};
	
/***/
//Explore trough the file tree 
//@Traverse recursively trough File and Directory entries.
BaseBackoffice.prototype.readFileTree = function (itemEntry, itemCallback){
	
		// Shortcut
		var o = this;
		
		if(itemEntry.isFile){
			o.readFile(itemEntry, itemCallback);
		}else if(itemEntry.isDirectory){
			var dirReader = itemEntry.createReader();
			dirReader.readEntries(function(entries){
				var idx = entries.length;
				while(idx--){
					o.readFileTree(entries[idx], itemCallback);
				}	
			});
		}			
}; 
	
/***/
//Read FileEntry to get Native File object.
BaseBackoffice.prototype.readFile = function (fileEntry, callback) {
		//Get File object from FileEntry
		fileEntry.file(function(callback, file){
			if(callback){
				callback(file);
			}
		}.bind(this, callback));
};
	
/***/
//Upload File
BaseBackoffice.prototype.uploadFile = function (file){
	
		// Shortcut
		var o = this;
	
		$(".loading").show();
		//console.log("uploadFile-----------------------------------------------------");
		if(file && file instanceof File){
			
			//check image extention
			if (!(file.type.match('image/jpeg') || file.type.match('image/png')))  {
				alert("inputed file path is not an image!\nit should be: *.jpg, *.png");
				return;
			}
			
			//console.log(file.name, file.size, file.type);

			var imageName = file.name.split(".")[0];
			var img ;
			
			var fileNames = file.name.split(".")[0].split("_");
			
			if (fileNames == 1) {
				//imageUrl
				imageName = fileNames[0];
			} else if (!isNaN(fileNames[fileNames.length-1])){
				//extraImageUrls_1, extraImageUrls_2, extraImageUrls_3
				imageName = fileNames[0] + "_" + parseInt(fileNames[fileNames.length-1]);
			} else {
				//imageUrl
				imageName = fileNames[0];
			}
			
			// ex: imageUrl.png, extraImageUrls_1.png
			img = $("#" + imageName)[0];
			//console.log("img:", imageName, "length:", $(img).length, "src:", $(img).attr("src"), $(img).attr("src")=="", $(img).attr("src")==undefined);
			
			// ex: extraImageUrls_2.png, extraImageUrls_3.png
			//if ( ($(img).length == 0) || ("" != $(img).attr("src")) || (undefined != $(img).attr("src")) ){
			if ( ($(img).length == 0) ) {
				//console.log("no space yet / occupied already");	
				var imageNamePrefix = imageName.split("_")[0];
				var containerName = imageNamePrefix + "Container"; 
				if ($("#" + containerName).length == 0) {
					//console.log("image not found.");
					$(".loading").hide();
					return;
				} else {
					// + Add new image in correct container
					var count = $("#" + containerName).find('img').length;
					//console.log("count: " + count);
					//Max of images 
					if (count == UPLOAD_IMAGE_MAX ) {
						//console.log("Max of images");
						return;
					}
					count = count + 1;
	        		var suffix = imageName.split("_")[1];
	        		generateDynamicExtraImageUploadForm("imageUploadForm_" + imageNamePrefix + "_" + suffix, "", imageNamePrefix + "_" + suffix, "imageFile", "imageUpload", "#" + containerName);
	        		img = $('#imageUploadForm_' + imageNamePrefix + '_' + suffix).find('img');
	        		$(img).addClass("logo_img");
	        		
					//Max of images 
					if (count == UPLOAD_IMAGE_MAX ) {
						$("#addNew" + capitalize(imageNamePrefix)).hide();
					}
				}
			}
			
			$(img).parent().find(":file").data("file", file);
			//console.log(file.name, $(img).parent().attr("id"));
			
			var fileReader = new FileReader();
			
			fileReader.onload = function (e) {
				
				// Render thumbnail.
				$(img).attr('src', e.target.result);
	        	$(img).addClass("opaque");
	        	
	        	//keyup to refresh validation
	        	$(img).keyup();
				
			};

			$(img).load(function() {
				
				//console.log(this.naturalHeight, this.naturalWidth);
				
				$(this).removeAttr("data-img-url-valid");
		
				//refresh validation after image enlarge more space
				o.validateRecord();
		
				// upload image immediately after preview image
				o.sendFormDataOneByOne($(img).parent().find(".imageFile"));
		
				$(this).unbind('load');
			
			});
			
			fileReader.readAsDataURL(file);
		}
	}; 
	

/**
 * Single file drop
 * */
BaseBackoffice.prototype.handleFileDropEvent = function (evt) {
		
		// Shortcut
		var o = this;
		
		console.log("handleFileDropEvent");
		
		
	    evt.stopPropagation();
	    evt.preventDefault();

	    var files = evt.dataTransfer.files; // FileList object.

	    var img = evt.target;
	    // Automatically set a dnd file to input file
	    //$(img).parent().find(":file")[0] = files[0];
	    
	    // if we cannot assign file to input file control directly, so assign file to its data 
	    $(img).parent().find(":file").data("file", files[0]);
	    
	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {

	      	
	      // Only process image files.
	      if (!f.type.match('image.*')) {
	        continue;
	      }
	      
	      /*
	      if (!(f.type.match('image/jpeg') || f.type.match('image/png')))  {
	          alert("inputed file path is not an image!\nit should be: *.jpg, *.png");
	          continue;
	      }	
	      */


	      var reader = new FileReader();

	      // Closure to capture the file information.
	      reader.onload = (function(theFile) {
	        return function(e) {
	            // Render thumbnail.
	        	$(img).attr('src', e.target.result);
	                $(img).addClass("opaque");

		        //keyup to refresh validation
	        	$(img).keyup();
	        };
	      })(f);

	      $(img).load(function() {
	      	
	    	  	$(this).removeAttr("data-img-url-valid");

		        //refresh validation after image enlarge more space
		        o.validateRecord();
		        
			    // upload image immediately after preview image, it should be asynchronous
		        o.sendFormDataOneByOne($(img).parent().find(".imageFile"));
			
		        $(this).unbind('load');
		        
	      });
	      
	      // Read in the image file as a data URL.
	      reader.readAsDataURL(f);
	    }
};
	

/* --------------------Upload image--------------- */
	
/***/
BaseBackoffice.prototype.checkRequiredFileName = function (input){
		// required file name
		var fileName = $(input).parent().find("img").data("requiredFileName");
		if ( fileName !== undefined  && fileName !== $(input).val().split(/(\\|\/)/g).pop()){
			alert("the image file name must be " + fileName);
			return false;
		}
		return true;
};

/**
 * Choose image file first
 */
BaseBackoffice.prototype.chooseImageEvent = function (event){
		var that = event.target;
		console.log("event:");
		console.log(event);
		// don't need to submit the form
		event.preventDefault();
		console.log("chooseImage");
	    $(that).parent().find(".imageFile").trigger("click");
}; 

/**
 * choose image - image change - display image
 * */
BaseBackoffice.prototype.previewInputFileEvent = function (event){
	
	// Shortcut
	var o = this;

	var input = event.target;
    
	if (!o.checkRequiredFileName(input)) {
		return;
	}
	
    // inputed file path is not an image of one of the above types
    if (!$(input).val().toLowerCase().match(/(?:gif|jpg|png|bmp)$/)) {
        alert("inputed file path is not an image!\nit should be: *.gif, *.jpg, *.png, *.bmp");
        return;
    }

    //processing();

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	
        	
        	console.log("onloadend");
        	
		    //preview input file
	        $(input).parent().find("img").attr('src', e.target.result);
                $(input).parent().find("img").addClass("opaque");

	        //keyup to refresh validation
	        $(input).parent().find("img").keyup();
	
	        //processed();

        };

        $(input).parent().find("img").load(function() {
        	
        		//check image solutions in pixels
        		/*
        		if ( this.naturalWidth !== $(this).data("width") || this.naturalHeight !== $(this).data("height")) {
        			alert("width x height should be: " + $(this).data("width") + " pixels x " + $(this).data("height") + " pixels");
        		}
        		*/

        		$(this).removeAttr("data-img-url-valid");

        		//refresh validation after image enlarge more space
        		o.validateRecord();

                // upload image immediately after preview image, it should be asynchronous
		        o.sendFormDataOneByOne($(input).parent().find(".imageFile"));
        		
	        
		        $(this).unbind('load');
	        
		        console.log("-----------------------------------------");

        });
        
        reader.readAsDataURL(input.files[0]);
    }
}; 

/* --------------------Upload file--------------- */
BaseBackoffice.prototype.chooseUrlEvent = function (event){
	// not submit its form
	event.preventDefault();
	//console.log("chooseUrl");
	$(this).parent().find(".urlFile").trigger("click");
}

/**
 * mark input url file
 * */
BaseBackoffice.prototype.markInputFileEvent = function(event){
	
    var input = this;

    // inputed file path is not an image of one of the above types
    if (!$(input).val().toLowerCase().match(/(?:htm|html)$/)) {
        alert("inputed file path is not a text!\nit should be: *.htm, *.html");
        return;
    }
    
    processing();
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {

		    //preview input file
	        $(input).parent().find("a.url").text("file loaded.");
	
	        //keyup to refresh validation
	        $(input).parent().find("a.url").keyup();
	        
	        // upload image immediately after load
	        sendFormData($(input).parent().find(".urlFile"));
	        
	        processed();

        }

        reader.readAsDataURL(input.files[0]);
    }
}

/*
getUploadUrl: function (parameters){
	var url = "/api/domainName/blob/upload" + (undefined !== parameters ? parameters : "");
	//var tok = basicUsername + ':' + basicPassword;
        //var hash = window.btoa(tok);
	//var responseData = apiRequester.makeRequest(url, hash,"cannot get upload url.");
	var responseData = apiRequester.makeRequest(url, "cannot get upload url.");
	var uploadUrl = responseData.uploadUrl.replace(/GGPP10274/i, "localhost");
	uploadUrl = uploadUrl.replace(/GGPP10348/i, "localhost");
	uploadUrl = uploadUrl.replace(/GGPP10134/i, "localhost");
	return uploadUrl;
}, 

*/
	
/***/
BaseBackoffice.prototype.getUploadUrl = function (parameters, callback){
		var requestUrl = "/api/domainName/blob/upload" + (undefined !== parameters ? parameters : "");
		
		// Asynchronous required
		$.ajax({
			type: "GET",
			url: requestUrl,
			crossDomain: true,
			accept: "*",
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				
				var responseData = data;
				var uploadUrl = responseData.uploadUrl;
				
				uploadUrl = uploadUrl.replace(/GGPP10274/i, "localhost");
				uploadUrl = uploadUrl.replace(/GGPP10348/i, "localhost");
				uploadUrl = uploadUrl.replace(/GGPP10134/i, "localhost");
				
				callback(uploadUrl);
				
			}
		});
		
}; 
	
/**
 * saveBtn need to upload file first  
 * */
BaseBackoffice.prototype.sendFormDataAll = function (formName) {

	
		// Shortcut
		var o = this;
	
		var uploadUrl = o.getUploadUrl();
		//send all in one
		var formData = new FormData($("#"+formName)[0]);
		//var formData = new FormData($('form')[0]);
		//var formData = new FormData(document.forms.namedItem(formName));
		
		//send one by one
		/*
		var formData = new FormData();
		formData.append( 'file1', $('#input_file_1')[0].files[0] );
		formData.append( 'file2', $('#input_file_2')[0].files[0] );
		*/

		/*
		$(selectors).each(function(){
			formData.append( $(this).attr("id") , $(this)[0].files[0] );
		});
		*/
		
		$.ajax({
			url: uploadUrl,
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				$.each(data, function(k,v){
					$("#" + k).parent().find("img")[0].src = v[0];

					/*
						var img = $("#" + k).parent().find("img");
						var span = $("#" + k).parent().find("span");
					
						if ( img.length > 0 ) {
							img[0].src = v[0];
						} else if ( span.length > 0 ){
							span.text(v[0]);
						}
					*/
				});
				$("#"+formName).find("img").removeClass("opaque");
				console.log(data);
	 		        alert(data);
			}
		});
		
}; 
	
/**
 * saveBtn need to upload file first  
 * */
BaseBackoffice.prototype.sendFormDataOneByOne = function (selectors) {
	
	// Shortcut
	var o = this;

	var formData;
	var biggest_image_dimension = 0;
	
	$(selectors).each(function(){
		
		
		formData = new FormData();
		biggest_image_dimension = 0;
		
		//formData.append( $(this).attr("id") , $(this)[0].files[0] );
		var file = $(this)[0].files[0];
		if (file == undefined) {
			file = $(this).data("file");
		}
		formData.append( $(this).attr("id") , file );

		
		var image = $(this).parent().find("img");
		
		var uploadUrl = "/api/smartswap/image/upload";
		
		if ( undefined !== image[0] ){
			biggest_image_dimension = Math.max( image[0].naturalWidth, image[0].naturalHeight );
			/*
			o.getUploadUrl("?retainParams=true&imageSize=" + biggest_image_dimension, function(uploadUrl){
				o.uploadTo(uploadUrl, formData, $(image).attr("id"));
			});
			*/
			o.uploadTo(uploadUrl + "/" + biggest_image_dimension, formData, $(image).attr("id"));
		} else {
			/*
			o.getUploadUrl(undefined, function(uploadUrl){
				o.uploadTo(uploadUrl, formData, $(image).attr("id"));
			});
			*/
			o.uploadTo(uploadUrl, formData, $(image).attr("id"));
		}
		
	});
			
}; 

/***/
BaseBackoffice.prototype.uploadTo = function (uploadUrl, formData, defaultId, successHandler){
	$.ajax({
		url: uploadUrl,
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		//async: false,
		
		complete: function (  jqXHR,  textStatus ) {
			//console.log('complete');
			//console.log(this.url);
			//console.log( jqXHR,  textStatus );
		},

		error: function (  jqXHR,  textStatus,  errorThrown  ) {
			//console.log('error');
			//console.log(this.url);
			//console.log( jqXHR,  textStatus,  errorThrown );
		},
		
		success: function( data,  textStatus,  jqXHR ){
			//console.log('success');
			//console.log(this.url);
			//console.log( data,  textStatus,  jqXHR );
			
			
			if (successHandler) {
				successHandler(data);
			} else {
				//do something here
				$.each(data, function(k,v){
					
					var img = $("#" + k).parent().find("img");
					if ( img.length == 0 ) {
						img = $("#" + defaultId).parent().find("img");
					} 
					
					var fileLink = $("#" + k).parent().find("a");
					
					if ( img.length > 0 ) {
						
						//keyup to refresh validation
						$(img).load(function() {
							$(".loading").hide();
							$(img).keyup();
							$(this).unbind('load');
						});
				
						//$(img[0]).val(v[0]);
						//img[0].src = v[0];
						$(img[0]).val(v);
						img[0].src = v;
						$(img).removeClass("opaque");
					} else if ( fileLink.length > 0 ){
						fileLink.attr("href",v[0]);
					}
					
				});
			}
		}
	});
};  
	 


BaseBackoffice.prototype.generateDynamicImageUploadForm = function (formName,labelName,imgName,inputName,buttonName,containerId){
	var templateData = {'formName': formName, 'labelName':labelName, 'imgName': imgName, 'inputName': inputName, 'buttonName': buttonName };
	// use template 
	$("#imageFormTemplate").tmpl(templateData).appendTo(containerId);
};

BaseBackoffice.prototype.generateDynamicExtraImageUploadForm = function (formName,labelName,imgName,inputName,buttonName,containerId){
	var templateData = {'formName': formName, 'labelName':labelName, 'imgName': imgName, 'inputName': inputName, 'buttonName': buttonName };
	// use template 
	$("#extraImageFormTemplate").tmpl(templateData).appendTo(containerId);
};



/**
 * Verify the input data is string obj
 *  
 * @param inputData
 * @returns {Boolean}
*/
BaseBackoffice.prototype.isString = function (inputData){
        return $.type(inputData) === "string";
};
 
/**
 * To trim left and right of String
 */
BaseBackoffice.prototype.trimString = function (str){
	
		// Shortcut
		var o = this;
	
         var newStr = str;
         
         if(o.isValidString(str)){
                 newStr = $.trim(str);
         }
         
         return newStr;
};
 
/**
  * To make sure that String is valid
  * @param str
  * @returns {Boolean}
  */
BaseBackoffice.prototype.isValidString = function (str){         
         return (str != undefined && str.length > 0);
};

/**
 * Automatically generate javascript object from all text fields in the container elements
 * All text fields must start with key prefix 
 * 
 * Iterate selectors to get
 *
 * @returns {Object}
 */
BaseBackoffice.prototype.getRequestData = function (mainSelector, all, prefix){
		var requestData = new Object();
		var selectors;
		selectors = $(mainSelector).find(":input,img");
		
		$(selectors).each(function(){
			if (all ||  $( this ).hasClass( "requestData" )){
				var data = $(this).attr("id");
				if(prefix != undefined){
					data = data.substring(prefix.length);
				}
				
				var value = $(this).val();
				
				// optional
				// if img already set val(), so it can get val() later	
				//if ($(this).is("img")){
				//	value = $(this).attr("src");
				//}
				
				
				var trimValue = BaseBackoffice.prototype.trimString(value);
				//console.log(value + "[" + value.length + "]" + " with " + trimValue + "[" + trimValue.length + "]");
				
				
				
				// multiple select as array [], not same to single select
				//if ($(this).is("select") && (trimValue)) {
				if ($(this).is("select") && $(this).prop("multiple") && (trimValue)) {
					requestData[data] = String(trimValue).split(",");
				} else {
					requestData[data] = trimValue;
				}
				
				
				//requestData[data] = trimValue;
				
				// double check, if image have no value assigned
				if ($(this).is("img") && !(value)){
					requestData[data] = $(this).attr("src");
				}

			}
		});
		
		return requestData;
}; 
	
/**
 * 
 * Iterate selectors to give
 *
 * @returns {Object}
 */
BaseBackoffice.prototype.giveDomData = function (mainSelector, data){
		var selectors;
		selectors = $(mainSelector).find(":input,img");

		$(selectors).each(function(){
			var key = $(this).attr("id");
			//choose corresponding data
			var value = data[key];
			
			// multiple select as array [], not same to single select
			if ($(this).is("select") && $(this).prop("multiple") && (value)) {
				// input select is special
				$(this).val(String(value).split(","));	
			} else {
				// inputs, img
				$(this).val(value);	
			}
			
			if ($(this).is("option")){
				console.log("option----");
			}
			
			// extra preview purpose, it might work with value already
			if ($(this).is("img")){
				$(this).attr("src", value);
			}
		});
		
}; 
	
/**
 * Set data in Dom Object
 * @param selector
 * @param key
 * @param value
 */
BaseBackoffice.prototype.setDomData = function (selector, key, value){
		//<input id="key" value="value" type="hidden"/>
		
		//hidden alternative, invisible
		selector.data(key, value);
}; 
	
/**
 * Get data from Dom Object
 * @param selector
 * @param key
 * @returns data
 */
BaseBackoffice.prototype.getDomData = function (selector, key){
		var data = selector.data(key);
		
		return data;
}; 
	
/**
 * Remove data from Dom Object
 * @param selector
 * @param key
 */
BaseBackoffice.prototype.removeDomData = function (selector, key){
		selector.removeData(key);
};

/***/
BaseBackoffice.prototype.removeObjectProperty = function (object, property){
		if (object && object[property]) {
			delete object[property];
		}
};
	
/***/
BaseBackoffice.prototype.clearEmptyProperty = function (obj){
	    var key;
	    for (key in obj) {
	        if (!obj.key) delete obj[key];
	    }
	    return obj;
}; 
	
/***/
BaseBackoffice.prototype.mergeProperty = function (objOld, objNew){
	    /*
	    var key;
	    for (key in objNew) {
	        objOld[key] = objNew[key];
	    }
	    return objOld;
	    */
	    //$.extend({abc: 1, def: 2}, {abc: 2}, {def: 3, abc: 3}) // Object {abc: 3, def: 3}
	    //merge
	    return $.extend(objOld, objNew);
}; 
	
/**
 * on before request
 *
 *	$.ajax({
 *		// business logic here
 *		beforeSend: function (jqXHR, settings ) {
 *			// disableButton
 *			// jqXHR.abort();
 *		},
 *	});
 */
BaseBackoffice.prototype.disableButton = function (button){
		
}; 
	
/**
 * on success request
 *
 *	$.ajax({
 *		// business logic here
 *		success: function (  jqXHR,  textStatus ) {
 *			// enableButton
 *		},
 *	});
 */
BaseBackoffice.prototype.enableButton = function (button){
		
}; 
	
/***/
BaseBackoffice.prototype.cloneRequestData = function (oldObject){
		// Shallow copy
		//var newObject = jQuery.extend({}, oldObject);

		// Deep copy
		var newObject = jQuery.extend(true, {}, oldObject);
		return newObject;
};

/***/
BaseBackoffice.prototype.setItem = function (itemName, item){
	//sessionStorage - stores data for one session
	//localStorage - stores data with no expiration date 
	//Remember me
	localStorage.setItem(itemName, JSON.stringify(item));
};

/***/
BaseBackoffice.prototype.getItem = function (itemName){
	return JSON.parse(localStorage.getItem(itemName));
}; 
	
/***/
BaseBackoffice.prototype.removeItem = function (itemName){
	localStorage.removeItem(itemName);
}; 	

/***/
BaseBackoffice.prototype.callDynamicFunction = function (functionName){
		window[functionName].apply();
}; 

/**
 * Generate select options
 * */
BaseBackoffice.prototype.generateDropdown = function(selector, isPleaseSelect, api, requestData){
	
	if (!requestData) {
		requestData = new Object();
		//requestData = {};
	}
	
	// clear first
	$(selector).empty();
	
	if (isPleaseSelect){
		$(selector).append($('<option></option>').val("").html("Please Select"));
	}
	
	api.getRecord(requestData, function(jRecords){
		
		$.each(jRecords, function(index, value){
			$(selector).append($('<option></option>').val(value["id"]).html(value["name"]));
		});
		
	}, api.failureHandler);	
};

// =========== IoC =============== //
// Statefull
// Instantiate
var baseBackoffice = new BaseBackoffice();

// init
baseBackoffice.initBaseBackoffice();

// call as static method
//BaseBackoffice.prototype.initBaseBackoffice();


