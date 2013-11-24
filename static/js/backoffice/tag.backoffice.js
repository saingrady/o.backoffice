console.log("tag.backoffice");

// Auto complete
// Normal Inheritance 
Tag.prototype = new BaseBackoffice();
Tag.prototype.constructor = Tag;
Tag.prototype.parent = BaseBackoffice.prototype;

// =========== Domain/JSON =============== //
// Properties
function Tag(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
}

//============================@OVERRIDE/CUSTOMIZE============================ //

//Define
//@override
Tag.prototype.NAME_SPACE = "page_tag";
Tag.prototype.PAGE_RECORD = "../admin/tag.html";
Tag.prototype.CONTAINER_RECORD = "#homeContainer" + " " + "#" + Tag.prototype.NAME_SPACE;
Tag.prototype.NAV_RECORD = "#" + Tag.prototype.NAME_SPACE + "s" + "_nav";
Tag.prototype.FILTER_RECORDS = "#" + Tag.prototype.NAME_SPACE + "s"+ " " + "#filters";
Tag.prototype.TABLE_RECORDS = "#" + Tag.prototype.NAME_SPACE + "s" + " " + "#tables";
Tag.prototype.TABLE_RECORD = "#" + Tag.prototype.NAME_SPACE + " " + "#table";
Tag.prototype.CACHE_RECORDS = Tag.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
Tag.prototype.recordAPI = new TagAPI();

// =========== Service =============== //
// Methods

/**
 * Init records
 * */
//@override
Tag.prototype.initRecords = function (isFilter){
			// Shortcut	
			var o = this;
			o.parent.initRecords.call(o, isFilter);
};

/**
 * Init record
 * */		
//@override
Tag.prototype.initRecord = function (){
			// Shortcut
			var o = this;
			o.parent.initRecord.call(o);
};

/**
* get template value
* */		
//@override
Tag.prototype.getTemplateValue = function (value){
		// Shortcut
		var o = this;
		return o.parent.getTemplateValue.call(o, value);
};

/**
* get template dom
* */		
//@override
Tag.prototype.getTemplateDom = function (){
		// Shortcut
		var o = this;
		return o.parent.getTemplateDom.call(o);
};


/**
* Pre Init records
* */		
//@override
Tag.prototype.preInitRecords = function (){
			// Shortcut
			var o = this;
			o.parent.preInitRecords.call(o);
};	

/**
* Post Init records
* */		
//@override
Tag.prototype.postInitRecords = function (){
			// Shortcut
			var o = this;
			o.parent.postInitRecords.call(o);
};

/**
* Pre Init record
* */		
//@override
Tag.prototype.preInitRecord = function (){
			// Shortcut
			var o = this;
			o.parent.preInitRecord.call(o);
};

/**
* Post Init record
* */		
//@override
Tag.prototype.postInitRecord = function (){
			// Shortcut
			var o = this;
			o.parent.postInitRecord.call(o);
};

/**
 * Init filters
 * */		
//@override
Tag.prototype.initFilters = function (){
			// Shortcut
			var o = this;
			o.parent.initFilters.call(o);
};


/**
 * Add new
 * */	
//@override
Tag.prototype.addNewRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.addNewRecordEvent.call(o, event);
			
};
		
	
/**
 * View Link
 */
//@override
Tag.prototype.viewLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.viewLnkRecordEvent.call(o, event);
 
};
		
/**
 * Edit Link
 */
//@override
Tag.prototype.editLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editLnkRecordEvent.call(o, event);
};
		
/**
 * Delete Link
 */
//@override
Tag.prototype.deleteLnkRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteLnkRecordEvent.call(o, event);
};
		
/**
 * Edit Button
 */
//@override
Tag.prototype.editBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.editBtnRecordEvent.call(o, event);
};
		
/**
 * Delete Button
 */
//@override
Tag.prototype.deleteBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.deleteBtnRecordEvent.call(o, event);
			
};
		
/**
 * Cancel Button
 */
//@override
Tag.prototype.cancelBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.cancelBtnRecordEvent.call(o, event);
};

/**
* Define mandatory fields
*/
//@override
Tag.prototype.setMandatoryFields = function (){
	// Shortcut
	//var o = this;
	
	// can define image mandatory here
	//o.setImageMandatory("#imageUrl");

};

/**
 * Validate
 */
//@override
Tag.prototype.validateRecord = function (){
			// Shortcut
			var o = this;
			return o.parent.validateRecord.call(o);
};
		
/**
 * Save Button
 */
//@override
Tag.prototype.saveBtnRecordEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.saveBtnRecordEvent.call(o, event);
};

/**
 * Iterate selectors to get
 */
//@override
Tag.prototype.getRequestData = function (mainSelector, all, prefix){
	// Shortcut
	var o = this;
	return o.parent.getRequestData.call(o, o.TABLE_RECORD);
};

/**
 * Iterate selectors to give
 */
//@override
Tag.prototype.giveDomData = function (mainSelector, data){
	// Shortcut
	var o = this;
	o.parent.giveDomData.call(o, o.TABLE_RECORD, o.getRecordData(o.records.currentRecord));
};

/**
 * Reload page
 * */
//@override
Tag.prototype.reloadPage = function(){
			// Shortcut
			var o = this;
			o.parent.reloadPage.call(o);
};

/**
 * Toggle Filter
 * */
//@override
Tag.prototype.filterBtnRecordsEvent = function(event){
			// Shortcut
			var o = this;
			o.parent.filterBtnRecordsEvent.call(o, event);
};

/**
* Apply Filter
* */
//@override
Tag.prototype.applyFilterRecordsEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.applyFilterRecordsEvent.call(o, event);
},

/**
* Clear Filter
* */
//@override
Tag.prototype.clearFilterRecordsEvent = function (event){
			// Shortcut
			var o = this;
			o.parent.clearFilterRecordsEvent.call(o, event);
};

/**
* Previous Pager
* */
//@override
Tag.prototype.previousPagerRecord = function (){
			// Shortcut
			var o = this;
			o.parent.previousPagerRecord.call(o);
};

/**
* Next Pager
* */
//@override
Tag.prototype.nextPagerRecord = function (){
			// Shortcut
			var o = this;
			o.parent.nextPagerRecord.call(o);
};

//================================================================================ //

/**
 * Dummy data
 * */
Tag.prototype.generateData = function(requestData){
	
	// Shortcut
	var o = this;
	
	if (!o.records.table) {
		
			o.records.table = [
							{id: 1, name: 'New', desc: 'in box'},
							{id: 2, name: 'Used', desc: 'already read'},
						] ;
	}
	
	return o.records.table;
		
};

//=========== IoC =============== //
//Instantiate
//Statefull
//Database
//global for one instance
var tag = new Tag();





