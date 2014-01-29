/**=================================================
*	APIs
====================================================*/
console.log("book.api");

function BookAPI() {}

BookAPI.prototype = new BaseAPI();

BookAPI.prototype.baseBackendUrl = "/api/domain/";

/** Book api 
 * =====================
 * */
BookAPI.prototype.createRecord = function(requestData, responseHandler, failureHandler){
										//var requestUrl = this.baseBackendUrl + "book/v10";
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
										if (!bookBackoffice.records.table) {
											bookBackoffice.records.table = new Array();
										}
										bookBackoffice.records.table.push(requestData);
										
										responseHandler(bookBackoffice.records.table);
									};

BookAPI.prototype.getRecord = function(requestData, responseHandler, failureHandler){

										responseHandler(bookBackoffice.generateData(requestData));
										
										/*
										// reuse cache
										if (localStorage.getItem('books_cache') !== undefined) {
											responseHandler(localStorage.getItem('books_cache'));
											return;
										}

										var requestUrl = this.baseBackendUrl + "book/v10/all";
										var data = this.getRequest(requestUrl, requestData, responseHandler, failureHandler);

										// store cache - Web storage - localStorage
										// 5 MB per origin in Google Chrome, Mozilla Firefox, and Opera; 
										// 10 MB per storage area in Internet Explorer
										if ((data.status == 200) && (data.statusText == "OK")){
												localStorage.setItem('books_cache', JSON.parse(data.responseText));
										}
										*/

									};		
									
BookAPI.prototype.updateRecord = function(id, requestData, responseHandler, failureHandler){
	 									var record = $.grep(bookBackoffice.records.table, function(e) { return e.id == id; })[0];
	 									bookBackoffice.mergeProperty(record, requestData);
	 									responseHandler(bookBackoffice.records.table);
	 									
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
									};

BookAPI.prototype.deleteRecord = function(id, responseHandler, failureHandler){
										bookBackoffice.deleteRecord(bookBackoffice.records);
										responseHandler(bookBackoffice.records.table);
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.deleteRequest(requestUrl, responseHandler, failureHandler);
									};		
