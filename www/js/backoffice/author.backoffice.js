console.log("AuthorBackoffice.backoffice");

// Auto complete
// Normal Inheritance 
AuthorBackoffice.prototype = new BaseBackoffice();
AuthorBackoffice.prototype.constructor = AuthorBackoffice;
AuthorBackoffice.prototype.parent = BaseBackoffice.prototype;

// =========== Domain/JSON =============== //
// Properties
function AuthorBackoffice(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
}

//============================@OVERRIDE/CUSTOMIZE============================ //

//Define
//@override
AuthorBackoffice.prototype.NAME_SPACE = "page_author";
AuthorBackoffice.prototype.PAGE_RECORD = "../admin/author.html";
AuthorBackoffice.prototype.CONTAINER_RECORD = "#homeContainer" + " " + "#" + AuthorBackoffice.prototype.NAME_SPACE;
AuthorBackoffice.prototype.NAV_RECORDS = "#" + AuthorBackoffice.prototype.NAME_SPACE + AuthorBackoffice.prototype.MULTIPLE_SUFFIX + "_nav";
AuthorBackoffice.prototype.FILTER_RECORDS = "#" + AuthorBackoffice.prototype.NAME_SPACE + AuthorBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#filters";
AuthorBackoffice.prototype.TABLE_RECORDS = "#" + AuthorBackoffice.prototype.NAME_SPACE + AuthorBackoffice.prototype.MULTIPLE_SUFFIX + " " + "#tables";
AuthorBackoffice.prototype.TABLE_RECORD = "#" + AuthorBackoffice.prototype.NAME_SPACE + " " + "#table";
AuthorBackoffice.prototype.CACHE_RECORDS = AuthorBackoffice.prototype.NAME_SPACE + "_cache";

// =========== DAO =============== //
//@override
AuthorBackoffice.prototype.recordAPI = new AuthorAPI();

// =========== Service =============== //
// Methods

/**
 * Dummy data
 * */
AuthorBackoffice.prototype.generateData = function(requestData){
	
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
var authorBackoffice = new AuthorBackoffice();





