console.log("author.backoffice");

// Auto complete
// Normal Inheritance 
Author.prototype = new BaseBackoffice();
Author.prototype.constructor = Author;
Author.prototype.parent = BaseBackoffice.prototype;

// =========== Domain/JSON =============== //
// Properties
function Author(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
}

//============================@OVERRIDE/CUSTOMIZE============================ //

//Define
//@override
Author.prototype.NAME_SPACE = "page_author";
Author.prototype.PAGE_RECORD = "../admin/author.html";
Author.prototype.CONTAINER_RECORD = "#homeContainer" + " " + "#" + Author.prototype.NAME_SPACE;
Author.prototype.NAV_RECORD = "#" + Author.prototype.NAME_SPACE + "s" + "_nav";
Author.prototype.FILTER_RECORDS = "#" + Author.prototype.NAME_SPACE + "s"+ " " + "#filters";
Author.prototype.TABLE_RECORDS = "#" + Author.prototype.NAME_SPACE + "s" + " " + "#tables";
Author.prototype.TABLE_RECORD = "#" + Author.prototype.NAME_SPACE + " " + "#table";
Author.prototype.CACHE_RECORDS = Author.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
Author.prototype.recordAPI = new AuthorAPI();

// =========== Service =============== //
// Methods

/**
 * Init records
 * */
//@override
Author.prototype.initRecords = function (isFilter){
			// Shortcut	
			var o = this;
			o.parent.initRecords.call(o, isFilter);
};

/**
 * Init record
 * */		
//@override
Author.prototype.initRecord = function (){
			// Shortcut
			var o = this;
			o.parent.initRecord.call(o);
};


/**
* get template value
* */		
//@override
Author.prototype.getTemplateValue = function (value){
		// Shortcut
		var o = this;
		return o.parent.getTemplateValue.call(o, value);
};

/**
* get template dom
* */		
//@override
Author.prototype.getTemplateDom = function (){
		// Shortcut
		var o = this;
		return o.parent.getTemplateDom.call(o);
};


/**
* Pre Init records
* */		
//@override
Author.prototype.preInitRecords = function (){
			// Shortcut
			var o = this;
			o.parent.preInitRecords.call(o);
};	

/**
* Post Init records
* */		
//@override
Author.prototype.postInitRecords = function (){
			// Shortcut
			var o = this;
			o.parent.postInitRecords.call(o);
};

/**
* Pre Init record
* */		
//@override
Author.prototype.preInitRecord = function (){
			// Shortcut
			var o = this;
			o.parent.preInitRecord.call(o);
};

/**
* Post Init record
* */		
//@override
Author.prototype.postInitRecord = function (){
			// Shortcut
			var o = this;
			o.parent.postInitRecord.call(o);
};

/**
 * Init filters
 * */		
//@override
Author.prototype.initFilters = function (){
			// Shortcut
			var o = this;
			o.parent.initFilters.call(o);
};


/**
 * Add new
 * */	
//@override
Author.prototype.addNewRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.addNewRecordEvent.call(o, event);
			
};
		
	
/**
 * View Link
 */
//@override
Author.prototype.viewLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.viewLnkRecordEvent.call(o, event);
 
};
		
/**
 * Edit Link
 */
//@override
Author.prototype.editLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editLnkRecordEvent.call(o, event);
};
		
/**
 * Delete Link
 */
//@override
Author.prototype.deleteLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteLnkRecordEvent.call(o, event);
};
		
/**
 * Edit Button
 */
//@override
Author.prototype.editBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editBtnRecordEvent.call(o, event);
};
		
/**
 * Delete Button
 */
//@override
Author.prototype.deleteBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteBtnRecordEvent.call(o, event);
			
};
		
/**
 * Cancel Button
 */
//@override
Author.prototype.cancelBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.cancelBtnRecordEvent.call(o, event);
};

/**
* Define mandatory fields
*/
//@override
Author.prototype.setMandatoryFields = function (){
	// Shortcut
	//var o = this;
	
	// can define image mandatory here
	//o.setImageMandatory("#imageUrl");

};

/**
 * Validate
 */
//@override
Author.prototype.validateRecord = function (){
			// Shortcut
			var o = this;
			return o.parent.validateRecord.call(o);
};
		
/**
 * Save Button
 */
//@override
Author.prototype.saveBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.saveBtnRecordEvent.call(o, event);
};

/**
 * Iterate selectors to get
 */
//@override
Author.prototype.getRequestData = function (mainSelector, all, prefix){
	// Shortcut
	var o = this;
	return o.parent.getRequestData.call(o, o.TABLE_RECORD);
};

/**
 * Iterate selectors to give
 */
//@override
Author.prototype.giveDomData = function (mainSelector, data){
	// Shortcut
	var o = this;
	o.parent.giveDomData.call(o, o.TABLE_RECORD, o.getRecordData(o.records.currentRecord));
};

/**
 * Reload page
 * */
//@override
Author.prototype.reloadPage = function(){
			// Shortcut
			var o = this;
			o.parent.reloadPage.call(o);
};

/**
 * Toggle Filter
 * */
//@override
Author.prototype.filterBtnRecordsEvent = function(event){
			// Shortcut
			var o = this;
			o.parent.filterBtnRecordsEvent.call(o, event);
};

/**
* Apply Filter
* */
//@override
Author.prototype.applyFilterRecordsEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.applyFilterRecordsEvent.call(o, event);
},

/**
* Clear Filter
* */
//@override
Author.prototype.clearFilterRecordsEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.clearFilterRecordsEvent.call(o, event);
};

/**
* Previous Pager
* */
//@override
Author.prototype.previousPagerRecord = function (){
			// Shortcut
			var o = this;
			o.parent.previousPagerRecord.call(o);
};

/**
* Next Pager
* */
//@override
Author.prototype.nextPagerRecord = function (){
			// Shortcut
			var o = this;
			o.parent.nextPagerRecord.call(o);
};

//================================================================================ //

/**
 * Dummy data
 * */
Author.prototype.generateData = function(requestData){
	
	// Shortcut
	var o = this;
	
	if (!o.records.table) {
		
			o.records.table = [
							{id: 1, name: 'William Shakespeare', desc: 'English poet and playwright, widely regarded as the greatest writer'},
							{id: 2, name: 'Agatha Christie', desc: 'English crime writer of novels, short stories, and plays'},
							{id: 3, name: 'Barbara Cartland', desc: 'English author, one of the most prolific authors and commercially successful of the 20th century'}
						] ;
	}
	
	return o.records.table;
		
};

//=========== IoC =============== //
//Instantiate
//Statefull
//Database
//global for one instance
var author = new Author();





