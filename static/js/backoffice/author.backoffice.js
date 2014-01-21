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
Author.prototype.NAV_RECORDS = "#" + Author.prototype.NAME_SPACE + Author.prototype.MULTIPLE_SUFFIX + "_nav";
Author.prototype.FILTER_RECORDS = "#" + Author.prototype.NAME_SPACE + Author.prototype.MULTIPLE_SUFFIX + " " + "#filters";
Author.prototype.TABLE_RECORDS = "#" + Author.prototype.NAME_SPACE + Author.prototype.MULTIPLE_SUFFIX + " " + "#tables";
Author.prototype.TABLE_RECORD = "#" + Author.prototype.NAME_SPACE + " " + "#table";
Author.prototype.CACHE_RECORDS = Author.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
Author.prototype.recordAPI = new AuthorAPI();

// =========== Service =============== //
// Methods

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





