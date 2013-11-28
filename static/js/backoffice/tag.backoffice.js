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





