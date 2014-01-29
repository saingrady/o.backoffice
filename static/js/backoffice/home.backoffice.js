console.log("HomeBackoffice.backoffice");

//Auto complete
//Normal Inheritance 
HomeBackoffice.prototype = new BaseBackoffice();
HomeBackoffice.prototype.constructor = HomeBackoffice;
HomeBackoffice.prototype.parent = BaseBackoffice.prototype;

// Properties
function HomeBackoffice(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
	//if plug-ins style
	//$.extend(HomeBackoffice.prototype, BaseBackoffice.prototype);

}

// Define
HomeBackoffice.prototype.CONTAINER_DEFAULT = "#homeContainer #page_default";
HomeBackoffice.prototype.PAGE_DEFAULT = "../admin/default.html";

HomeBackoffice.prototype.CONTAINER_BOOKS = "#homeContainer #page_book-s";
HomeBackoffice.prototype.PAGE_BOOKS = "../admin/book-s.html";

HomeBackoffice.prototype.CONTAINER_AUTHORS = "#homeContainer #page_author-s";
HomeBackoffice.prototype.PAGE_AUTHORS = "../admin/author-s.html";

HomeBackoffice.prototype.CONTAINER_TAGS = "#homeContainer #page_tag-s";
HomeBackoffice.prototype.PAGE_TAGS = "../admin/tag-s.html";


// Methods

/**
 * init default home page
 * */
//@override
HomeBackoffice.prototype.initRecords = function (){
	
			// Shortcut
			var o = this;
			
			// just message
			o.info("Welcome O.Backoffice");
};

/**
 * Load page
 * */
HomeBackoffice.prototype.loadPage = function (container, page){
	
	
	// Shortcut
	var o = this;
	
	/*
	if ($(container).children().length > 0){
		$("#homeContainer").children().hide();
		$(container).show();
		return;
	}
	*/
	
	o.loadHtmlContent(container, page);

};

/**
 * html page name to load into the homeContainer
 * @param html
 */
HomeBackoffice.prototype.loadHomeContainer = function (html){
	
			// Shortcut
			var o = this;
			
			console.log("loadHomeContainer");
			console.log(html);
			o.loadHtmlContent($('#homeContainer'), html);
}; 
		

/**
 * Brand
 * */
HomeBackoffice.prototype.openBrandEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(homeBackoffice);
	o.loadPage(o.CONTAINER_DEFAULT, o.PAGE_DEFAULT);

};

/**
 * Book
 * */
HomeBackoffice.prototype.openBookEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(bookBackoffice);
	o.loadPage(o.CONTAINER_BOOKS, o.PAGE_BOOKS);
	
};

/**
 * Author
 * */
HomeBackoffice.prototype.openAuthorEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(authorBackoffice);
	o.loadPage(o.CONTAINER_AUTHORS, o.PAGE_AUTHORS);
	
};

/**
 * Tag
 * */
HomeBackoffice.prototype.openTagEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(tagBackoffice);
	o.loadPage(o.CONTAINER_TAGS, o.PAGE_TAGS);
	
};


/***/
HomeBackoffice.prototype.confirmDeleteEvent = function (event){
	
			// Shortcut
			//var o = this;
			
			console.log("setConfirmDelete");
			
			var that = event.target;
			
			if ("yes-delete-btn" == that.id) {
				BaseBackoffice.confirmDelete = true;
			} else if ("no-delete-btn" == that.id) {
				BaseBackoffice.confirmDelete = false;
			}
			
			console.log(BaseBackoffice.confirmDelete);
}; 


//=========== IoC =============== //
//Instantiate
//Statefull
//Database
//global for one instance
var homeBackoffice = new HomeBackoffice();





