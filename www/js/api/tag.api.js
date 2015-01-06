/**=================================================
*	APIs
====================================================*/
console.log("tag.api");

function TagAPI() {}

TagAPI.prototype = new BaseAPI();

TagAPI.prototype.baseBackendUrl = "/api/domain/";

/** Tag api 
 * =====================
 * */
TagAPI.prototype.createRecord = function(requestData, responseHandler, failureHandler){
										//var requestUrl = this.baseBackendUrl + "book/v10";
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
										if (!tagBackoffice.records.table) {
											tagBackoffice.records.table = new Array();
										}
										tagBackoffice.records.table.push(requestData);
										
										responseHandler(tagBackoffice.records.table);
									};

TagAPI.prototype.getRecord = function(requestData, responseHandler, failureHandler){

										responseHandler(tagBackoffice.generateData());
										
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
									
TagAPI.prototype.updateRecord = function(id, requestData, responseHandler, failureHandler){
	 									var record = $.grep(tagBackoffice.records.table, function(e) { return e.id == id; })[0];
	 									tagBackoffice.mergeProperty(record, requestData);
	 									responseHandler(tagBackoffice.records.table);
	 									
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.postRequest(requestUrl, requestData, responseHandler, failureHandler);
									};

TagAPI.prototype.deleteRecord = function(id, responseHandler, failureHandler){
										tagBackoffice.deleteRecord(tagBackoffice.records);
										responseHandler(tagBackoffice.records.table);
										//var requestUrl = this.baseBackendUrl + "book/v10/" + id;
										//this.deleteRequest(requestUrl, responseHandler, failureHandler);
									};		
