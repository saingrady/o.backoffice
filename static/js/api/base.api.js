/*************************************************************
**	BASE API: GET, POST, DELETE, etc.
*************************************************************/
console.log("base.api");

function BaseAPI() {
}
	
// GET 
BaseAPI.prototype.getRequest = function(requestUrl,requestData,responseHandler,failureHandler) {
											return this.request("GET", requestUrl, requestData, "json", "application/json", responseHandler, failureHandler);
									};

// POST
BaseAPI.prototype.postRequest = function(requestUrl,requestData,responseHandler,failureHandler) {
											return this.request("POST", requestUrl, requestData, "json", "application/json", responseHandler, failureHandler);
									};

// DELETE 
BaseAPI.prototype.deleteRequest = function(requestUrl,responseHandler,failureHandler){
											return this.request("DELETE", requestUrl, {}, "json", "application/json", responseHandler, failureHandler);
									};

										

// Ajax Request
BaseAPI.prototype.request = function (requestMethod, requestUrl, requestData, dataType, contentType, responseHandler,failureHandler){
							                
							                $.ajax({
							                    type: requestMethod,
							                    url: requestUrl,
							                    crossDomain: true,
							                    accept: "*",
							                    data: requestData,
							                    dataType: dataType,
							                    contentType: contentType,
							                    error: function(jqXHR, textStatus, errorThrown) {
							                    	failureHandler(jqXHR, textStatus, errorThrown);
							                    },
							                    success: function(data, textStatus, jqXHR) {
							                    	responseHandler(data);
							                    },
							                    complete: function(jqXHR, textStatus) {
							                        // can track something
							                    }
							                });
							                
							            }

// Error Handler
BaseAPI.prototype.failureHandler = function(jqXHR, textStatus, errorThrown){

											switch(jqXHR.status){
												case 401:
													//alert("What is 401 ?");	
													baseBackoffice.error("401: Unauthorized");
													break;
												case 403:
													//alert("What is 403 ?");
													baseBackoffice.error("403: Forbidden");
													break;
												default:
													//alert(errorThrown);
													baseBackoffice.error(errorThrown);
											}
										};