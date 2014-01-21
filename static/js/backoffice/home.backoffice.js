console.log("home.backoffice");

//Auto complete
//Normal Inheritance 
Home.prototype = new BaseBackoffice();
Home.prototype.constructor = Home;
Home.prototype.parent = BaseBackoffice.prototype;

// Properties
function Home(){
	
	// Shortcut
	var o = this;
	BaseBackoffice.apply(o, arguments);
	
	//if plug-ins style
	//$.extend(Home.prototype, BaseBackoffice.prototype);

}

// Define
Home.prototype.CONTAINER_DEFAULT = "#homeContainer #page_default";
Home.prototype.PAGE_DEFAULT = "../admin/default.html";

Home.prototype.CONTAINER_BOOKS = "#homeContainer #page_book-s";
Home.prototype.PAGE_BOOKS = "../admin/book-s.html";

Home.prototype.CONTAINER_AUTHORS = "#homeContainer #page_author-s";
Home.prototype.PAGE_AUTHORS = "../admin/author-s.html";

Home.prototype.CONTAINER_TAGS = "#homeContainer #page_tag-s";
Home.prototype.PAGE_TAGS = "../admin/tag-s.html";


// Methods

/**
 * init default home page
 * */
//@override
Home.prototype.initRecords = function (){
	
			// Shortcut
			var o = this;
			
			// just message
			o.info("Welcome O.Backoffice");
};

/**
 * Load page
 * */
Home.prototype.loadPage = function (container, page){
	
	
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
Home.prototype.loadHomeContainer = function (html){
	
			// Shortcut
			var o = this;
			
			console.log("loadHomeContainer");
			console.log(html);
			o.loadHtmlContent($('#homeContainer'), html);
}; 
		

/**
 * Brand
 * */
Home.prototype.openBrandEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(home);
	o.loadPage(o.CONTAINER_DEFAULT, o.PAGE_DEFAULT);

};

/**
 * Book
 * */
Home.prototype.openBookEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(book);
	o.loadPage(o.CONTAINER_BOOKS, o.PAGE_BOOKS);
	
};

/**
 * Author
 * */
Home.prototype.openAuthorEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(author);
	o.loadPage(o.CONTAINER_AUTHORS, o.PAGE_AUTHORS);
	
};

/**
 * Tag
 * */
Home.prototype.openTagEvent = function (event){
	
	// Shortcut
	var o = this;
	o.updateBasket(tag);
	o.loadPage(o.CONTAINER_TAGS, o.PAGE_TAGS);
	
};


/***/
Home.prototype.confirmDeleteEvent = function (event){
	
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
var home = new Home();





