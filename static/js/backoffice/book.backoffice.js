console.log("BookBackoffice.backoffice");

// Auto complete
// Normal Inheritance 
BookBackoffice.prototype = new BaseBackoffice();
BookBackoffice.prototype.constructor = BookBackoffice;
BookBackoffice.prototype.parent = BaseBackoffice.prototype;

// Global Shortcut
// var o;

// =========== Domain/JSON =============== //
// Properties
function BookBackoffice(){
	
	// Shortcut
	var o = this;
	
	// Global Shortcut 
	// o = this;
	BaseBackoffice.apply(o, arguments);
	
}

//============================@OVERRIDE/CUSTOMIZE============================ //

//Define
//@override
BookBackoffice.prototype.NAME_SPACE = "page_book";
BookBackoffice.prototype.PAGE_RECORD = "../admin/book.html";
BookBackoffice.prototype.CONTAINER_RECORD = "#homeContainer" + " " + "#" + BookBackoffice.prototype.NAME_SPACE;
BookBackoffice.prototype.NAV_RECORDS = "#" + BookBackoffice.prototype.NAME_SPACE + BookBackoffice.prototype.MULTIPLE_SUFFIX + "_nav";
BookBackoffice.prototype.FILTER_RECORDS = "#" + BookBackoffice.prototype.NAME_SPACE + BookBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#filters";
BookBackoffice.prototype.TABLE_RECORDS = "#" + BookBackoffice.prototype.NAME_SPACE + BookBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#tables";
BookBackoffice.prototype.TABLE_RECORD = "#" + BookBackoffice.prototype.NAME_SPACE + " " + "#table";
BookBackoffice.prototype.CACHE_RECORDS = BookBackoffice.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
BookBackoffice.prototype.recordAPI = new BookAPI();

// =========== Service =============== //
// Methods

/**
 * Init records
 * */
//@override
BookBackoffice.prototype.initRecords = function (isFilter){
			// Shortcut	
			var o = this;
			o.parent.initRecords.call(o, isFilter);
			
			/*
			// paging
			$("#pagination").pagination({
	            items: 100,
	            itemsOnPage: 10,
	            onPageClick: function(pageNumber, event) {
	            	console.log(pageNumber);
	            }
	        });
	        */
			
};

/**
 * Init record
 * */		
//@override
BookBackoffice.prototype.initRecord = function (){
			// Shortcut
			var o = this;
			o.parent.initRecord.call(o);
			
};

/**
* get template value
* */		
//@override
BookBackoffice.prototype.getTemplateValue = function (value){
		// Shortcut
		var o = this;
		return o.parent.getTemplateValue.call(o, value);
};

/**
* get template dom
* */		
//@override
BookBackoffice.prototype.getTemplateDom = function (){
		// override
		return $("#recordWithImageTemplate");
};

/**
* Pre Init records
* */		
//@override
BookBackoffice.prototype.preInitRecords = function (){
			// Shortcut
			var o = this;
			o.parent.preInitRecords.call(o);
};	

/**
* Post Init records
* */		
//@override
BookBackoffice.prototype.postInitRecords = function (jRecords){
			// Shortcut
			var o = this;
			o.parent.postInitRecords.call(o);
			
		    //set page
		    //$("#page_books #pagination").pagination('drawPage', pageNumber);
			//$("#page_books #pagination").pagination('updateItems', jRecords["totalSize"]);
};

/**
* Pre Init record
* */		
//@override
BookBackoffice.prototype.preInitRecord = function (){
			// Shortcut
			var o = this;
			//o.parent.preInitRecord.call(o);
			
			o.generateDropdownAuthor("#author", true);
			o.generateDropdownTag("#tags", false);
			
			//o.generateDynamicImageUploadForm("imageUploadForm_imageUrl", "", "imageUrl", "imageFile", "imageUpload", "#imageUrlContainer");
			//$("#imageUrl").addClass("logo_img");
};

/**
* Post Init record
* */		
//@override
BookBackoffice.prototype.postInitRecord = function (){
			// Shortcut
			var o = this;
			o.parent.postInitRecord.call(o);
};


/**
 * Init filters
 * */		
//@override
BookBackoffice.prototype.initFilters = function (){
			// Shortcut
			var o = this;
			//o.parent.initFilters.call(o);
			
			o.records.filter = new Object();
			o.generateDropdownAuthor("#authors-dropdown", true);
			o.generateDropdownTag("#tags-dropdown", true);

};

/**
 * Add new
 * */	
//@override
BookBackoffice.prototype.addNewRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.addNewRecordEvent.call(o, event);
			
};
		
	
/**
 * View Link
 */
//@override
BookBackoffice.prototype.viewLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.viewLnkRecordEvent.call(o, event);
 
};
		
/**
 * Edit Link
 */
//@override
BookBackoffice.prototype.editLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editLnkRecordEvent.call(o, event);
};
		
/**
 * Delete Link
 */
//@override
BookBackoffice.prototype.deleteLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteLnkRecordEvent.call(o, event);
};
		
/**
 * Edit Button
 */
//@override
BookBackoffice.prototype.editBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editBtnRecordEvent.call(o, event);
};
		
/**
 * Delete Button
 */
//@override
BookBackoffice.prototype.deleteBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteBtnRecordEvent.call(o, event);
			
};
		
/**
 * Cancel Button
 */
//@override
BookBackoffice.prototype.cancelBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.cancelBtnRecordEvent.call(o, event);
};

/**
* Define mandatory fields
*/
//@override
BookBackoffice.prototype.setMandatoryFields = function (){
	// Shortcut
	//var o = this;
	
	// can define image mandatory here
	//o.setImageMandatory("#imageUrl");

};

/**
 * Validate
 */
//@override
BookBackoffice.prototype.validateRecord = function (){
			// Shortcut
			var o = this;
			return o.parent.validateRecord.call(o);
};
		
/**
 * Save Button
 */
//@override
BookBackoffice.prototype.saveBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.saveBtnRecordEvent.call(o, event);
};

/**
 * Iterate selectors to get
 */
//@override
BookBackoffice.prototype.getRequestData = function (mainSelector, all, prefix){
	// Shortcut
	var o = this;
	return o.parent.getRequestData.call(o, o.TABLE_RECORD);
};

/**
 * Iterate selectors to give
 */
//@override
BookBackoffice.prototype.giveDomData = function (mainSelector, data){
	// Shortcut
	var o = this;
	o.parent.giveDomData.call(o, o.TABLE_RECORD, o.getRecordData(o.records.currentRecord));
};

/**
 * Reload page
 * */
//@override
BookBackoffice.prototype.reloadPage = function(){
			// Shortcut
			var o = this;
			o.parent.reloadPage.call(o);
};

/**
 * Toggle Filter
 * */
//@override
BookBackoffice.prototype.filterBtnRecordsEvent = function(event){
			// Shortcut
			var o = this;
			o.parent.filterBtnRecordsEvent.call(o, event);
};

/**
* Apply Filter
* */
//@override
BookBackoffice.prototype.applyFilterRecordsEvent = function (event){
	
			// Shortcut
			var o = this;
			
			console.log("applyFilterRecord");
			
			// reset filter
			o.records.filter = new Object();
			
			//define filters here
			if ($(o.FILTER_RECORDS + " " + "#authors-dropdown").val()) {

				if (!$("#filter_" + $(o.FILTER_RECORDS + " " + "#authors-dropdown").attr("id") + "_" + $(o.FILTER_RECORDS + " " + "#authors-dropdown").val()).length){

					// no duplicate
					$("[id^=filter_authors-dropdown]").remove();
					
					var value = {
							id: "filter_" + $(o.FILTER_RECORDS + " " + "#authors-dropdown").attr("id") + "_" + $(o.FILTER_RECORDS + " " + "#authors-dropdown").val(),
							filterKey: "author",
							filterDropdown: "authors-dropdown",
							filterText: $("#authors-dropdown option:selected").text()
					};
					
					$("#filterTemplate").tmpl(value).data("store", value).appendTo("#page_books #filterList");
				}
				
				o.setFilter(o.records, "author", $(o.FILTER_RECORDS + " " + "#authors-dropdown").val());
			} else {
				$("[id^=filter_authors-dropdown]").remove();
			}
			
			if ($(o.FILTER_RECORDS + " " + "#tags-dropdown").val()) {

				if (!$("#filter_" + $(o.FILTER_RECORDS + " " + "#tags-dropdown").attr("id") + "_" + $(o.FILTER_RECORDS + " " + "#tags-dropdown").val()).length){

					// no duplicate
					$("[id^=filter_tags-dropdown]").remove();
					
					var value = {
							id: "filter_" +  $(o.FILTER_RECORDS + " " + "#tags-dropdown").attr("id") + "_" + $(o.FILTER_RECORDS + " " + "#tags-dropdown").val(),
							filterKey: "tags",
							filterDropdown: "tags-dropdown",
							filterText: $("#tags-dropdown option:selected").text()
					};
					
					$("#filterTemplate").tmpl(value).data("store", value).appendTo("#page_books #filterList");
				}
				
				o.setFilter(o.records, "tags", $(o.FILTER_RECORDS + " " + "#tags-dropdown").val());
			} else {
				$("[id^=filter_tags-dropdown]").remove();
			}
		
			o.resetPaging(o.records);
			$(o.TABLE_RECORDS + " " + "tr").not(":first").remove();
			
			if (!$(o.FILTER_RECORDS + " " + "#authors-dropdown").val() && !$(o.FILTER_RECORDS + " " + "#tags-dropdown").val()){
				$("#filterList").html("");
				o.success("");
			} else {
				o.prepareMsg("Filtered.");	
			}
			
			o.initRecords(false);
},

/**
* Clear Filter
* */
//@override
BookBackoffice.prototype.clearFilterRecordsEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.clearFilterRecordsEvent.call(o, event);
};


/**
* Filter dropdown
* */
//@override
BookBackoffice.prototype.filterDropdownEvent = function (event){

	// Shortcut
	var o = this;
	o.parent.filterDropdownEvent.call(o, event);
	$("#page_books #filters").hide();
	
};

/**
* Previous Pager
* */
//@override
BookBackoffice.prototype.previousPagerRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.previousPagerRecord.call(o);
};

/**
* Next Pager
* */
//@override
BookBackoffice.prototype.nextPagerRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.nextPagerRecord.call(o);
};


/**
* Paging
* */
//@override
BookBackoffice.prototype.pageEvent = function (pageNumber, event){
			// Shortcut
			var o = this;
			o.parent.pageEvent.call(o, pageNumber, event);
};

//================================================================================ //

BookBackoffice.prototype.pageEvent = function(pageNumber, event){
	
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


BookBackoffice.prototype.removeFilterEvent = function (event){
	
	console.log("removeFilterEvent");
	
	// Shortcut
	var o = this;
	var that = event.target;
	var filter = $(that).parents(".filter");
	
	//remove filter
	//o.removeObjectProperty(o.records.filter, o.getStoreData(filter)["filterKey"]);
	$("#" + o.getStoreData(filter)["filterDropdown"] + " option:first").prop("selected", "selected");
	filter.remove();
	
	o.applyFilterRecordsEvent(event);
	
	
};


BookBackoffice.prototype.testEvent = function (event){
	
	console.log("testEvent");
	
	// Shortcut
	var o = this;
	var that = event.target;
	alert($(that).attr("id"));
	
};



BookBackoffice.prototype.generateDropdownAuthor = function(selector, isPleaseSelect){
	
	var o = this;
	
	// new AuthorAPI(), new instantiation, methods matter, attributes not
	o.generateDropdown(selector, isPleaseSelect, new AuthorAPI(), {});
		
};

BookBackoffice.prototype.generateDropdownTag = function(selector, isPleaseSelect){
	
	var o = this;
	// new TagAPI(), new instantiation, methods matter, attributes not
	o.generateDropdown(selector, isPleaseSelect, new TagAPI(), {});
	
};

/**
 * Dummy data
 * */
BookBackoffice.prototype.generateData = function(requestData){
	
	// Shortcut
	var o = this;
	
	if (!o.records.table) {
		
			o.records.table = [
							{id: 1, name: 'Twelfth Night', desc: 'a comedy by William Shakespeare, believed to have been written around 1601-02 as a Twelfth Night\'s entertainment for the close of the Christmas season', author: '1', tags: ['2'], imageUrl: 'http://1.bp.blogspot.com/_f3SZ5Tu916o/S7EqzY009EI/AAAAAAAAPzA/uU08R-v_luE/s400/Oldbook.gif'},
							{id: 2, name: 'And Then There Were None', desc: 'a detective novel by Agatha Christie. It was first published in the United Kingdom by the Collins Crime Club on 6 November 1939 as Ten Little Niggers, after the British nursery rhyme which serves as a major plot point', author: '2', imageUrl: 'http://1.bp.blogspot.com/_f3SZ5Tu916o/S7EqzY009EI/AAAAAAAAPzA/uU08R-v_luE/s400/Oldbook.gif'},
							{id: 3, name: 'Romeo and Juliet', desc: 'a tragedy written early in the career of William Shakespeare about two young star-crossed lovers whose deaths ultimately reconcile their feuding families', author: '1', tags: ['1'], imageUrl: 'http://1.bp.blogspot.com/_f3SZ5Tu916o/S7EqzY009EI/AAAAAAAAPzA/uU08R-v_luE/s400/Oldbook.gif'},
							{id: 4, name: 'The Disgraceful Duke', desc: 'It was very sweet story of a young sheltered girl named Shimona and a Duke known as \'His Disgrace\'', author: '3', tags: ['1'], imageUrl: 'http://1.bp.blogspot.com/_f3SZ5Tu916o/S7EqzY009EI/AAAAAAAAPzA/uU08R-v_luE/s400/Oldbook.gif'},
							{id: 5, name: 'The Poor Governess', desc: 'Hoping to examine firsthand the world of the rich and, at the same time, prevent her friend from being compromised by a philandering aristocrat, Lara Hurley temporarily assumes the position as governess to the niece of the Marquis of Keyston', author: '3', tags: ['1','2'], imageUrl: 'http://1.bp.blogspot.com/_f3SZ5Tu916o/S7EqzY009EI/AAAAAAAAPzA/uU08R-v_luE/s400/Oldbook.gif'}
							
						] ;
	}
	
	//filter
	//requestData
	//$("#offerPanelCenter img").filter("[id^=extraImageUrls_],[id^=webExtraImageUrls_]")
	if(o.objectSize(requestData) > 0){
		//clone
		var table = o.records.table;
		// + -
		// grep
		var filterTable = $.grep(table, function(e) {
				console.log(!(requestData["author"]));
				console.log(!(requestData["tags"]));
				return ((!(requestData["author"])? true : e.author == requestData["author"]) &
						(!(requestData["tags"])? true : function(e){
							var isMatch = false;
							// tags: '1,2' should match tags: '1' or '2'
							console.log(e.tags);
							if (e.tags){
								$.each( e.tags.split(","), function( i, val ) {
									if (val == requestData["tags"]){
										isMatch = true;
										return;
									}
								});
							}
							return isMatch;
						}(e))); 
		});
		
		return filterTable;
	}
	
	return o.records.table;
		
};

//=========== IoC =============== //
//Instantiate
//Statefull
//Database
//global for one instance
var bookBackoffice = new BookBackoffice();





