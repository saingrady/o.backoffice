/**=================================================
*	APIs
====================================================*/
console.log("author.api");

function AuthorAPI() {}

AuthorAPI.prototype = new BaseAPI();

AuthorAPI.prototype.baseBackendUrl = "/api/domain/";

/** Author api 
 * =====================
 * */
AuthorAPI.prototype.createRecord = function(requestData, responseHandler, failureHandler){
										if (!author.records.table) {
											author.records.table = new Array();
										}
										author.records.table.push(requestData);
										
										responseHandler(author.records.table);
										
										// request to web service
										//var requestUrl = this.baseBackendUrl + "book/v10";
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
										
									};

AuthorAPI.prototype.getRecord = function(requestData, responseHandler, failureHandler){

										responseHandler(author.generateData());
										
										// request to web service
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
									
AuthorAPI.prototype.updateRecord = function(id, requestData, responseHandler, failureHandler){
	 									var record = $.grep(author.records.table, function(e) { return e.id == id; })[0];
	 									author.mergeProperty(record, requestData);
	 									responseHandler(author.records.table);
	 									
										// request to web service
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
									};

AuthorAPI.prototype.deleteRecord = function(id, responseHandler, failureHandler){
										author.deleteRecord(author.records);
										responseHandler(author.records.table);
										
										// request to web service
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.deleteRequest(requestUrl, responseHandler, failureHandler);
									};		
