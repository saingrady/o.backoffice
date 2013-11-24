/*************************************************************
**	BASE API: GET, POST, DELETE, etc.
*************************************************************/
console.log("base.api");

function BaseAPI() {
}
	
// GET 
BaseAPI.prototype.getRequest = function(requestUrl,requestData,responseHandler,failureHandler) {
											// should return for callback
											return $.get(requestUrl , requestData, function(response){
												responseHandler(response);
											},"json")
											.error(function(jqXHR, textStatus, errorThrown){
												failureHandler(jqXHR, textStatus, errorThrown);
											});
									};

// POST
BaseAPI.prototype.postRequest = function(requestUrl,requestData,responseHandler,failureHandler) {

											return $.post(requestUrl , requestData, function(response, textStatus, jqXHR){
												responseHandler(response, textStatus, jqXHR);
											},"json")
											.error(function(jqXHR, textStatus, errorThrown){
												failureHandler(jqXHR, textStatus, errorThrown);
											});
										};

// DELETE 
BaseAPI.prototype.deleteRequest = function(requestUrl,responseHandler,failureHandler){

											$.ajax({
												type: "DELETE",
												url: requestUrl,
												crossDomain: true,
												accept: "*",
												dataType: "json",
												success: function(data, textStatus, jqXHR) {
													responseHandler(data);
												},
												error: function(jqXHR, textStatus, errorThrown) {
													failureHandler(jqXHR, textStatus, errorThrown);
												}
											});
										};

										

// Error Handler
BaseAPI.prototype.failureHandler = function(jqXHR, textStatus, errorThrown){

											switch(jqXHR.status){
												case 401:
													alert("What is 401 ?");	
													break;
												case 403:
													alert("What is 403 ?");	
													break;
												default:
													alert(errorThrown);
											}
										};

									
