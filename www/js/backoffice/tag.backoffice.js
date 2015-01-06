console.log("TagBackoffice.backoffice");

// Auto complete
// Normal Inheritance 
TagBackoffice.prototype = new BaseBackoffice();
TagBackoffice.prototype.constructor = TagBackoffice;
TagBackoffice.prototype.parent = BaseBackoffice.prototype;

// =========== Domain/JSON =============== //
// Properties
function TagBackoffice(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
}

//============================@OVERRIDE/CUSTOMIZE============================ //

//Define
//@override
TagBackoffice.prototype.NAME_SPACE = "page_tag";
TagBackoffice.prototype.PAGE_RECORD = "../admin/tag.html";
TagBackoffice.prototype.CONTAINER_RECORD = "#homeContainer" + " " + "#" + TagBackoffice.prototype.NAME_SPACE;
TagBackoffice.prototype.NAV_RECORDS = "#" + TagBackoffice.prototype.NAME_SPACE + TagBackoffice.prototype.MULTIPLE_SUFFIX + "_nav";
TagBackoffice.prototype.FILTER_RECORDS = "#" + TagBackoffice.prototype.NAME_SPACE + TagBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#filters";
TagBackoffice.prototype.TABLE_RECORDS = "#" + TagBackoffice.prototype.NAME_SPACE + TagBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#tables";
TagBackoffice.prototype.TABLE_RECORD = "#" + TagBackoffice.prototype.NAME_SPACE + " " + "#table";
TagBackoffice.prototype.CACHE_RECORDS = TagBackoffice.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
TagBackoffice.prototype.recordAPI = new TagAPI();

// =========== Service =============== //
// Methods

/**
 * Dummy data
 * */
TagBackoffice.prototype.generateData = function(requestData){
	
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
var tagBackoffice = new TagBackoffice();





