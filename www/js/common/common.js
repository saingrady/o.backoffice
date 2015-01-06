console.log("common");

//Properties
function Common(){
	
}

//Methods

Common.prototype.test = function (){
	return "hello test";
};


// set up once and one place only
jQuery.ajaxSetup({
	// not use cache of browser
	// ajax request always reached backend
    cache: false,
    beforeSend: function (jqXHR, settings) {
        jqXHR.setRequestHeader('Authorization', ("Basic " + window.btoa("o:o")));
    }
});

$( document ).ajaxComplete(function( event,request, settings ) {
	if (("401" == request.status) && ("Unauthorized" == request.statusText)){
		localStorage.removeItem('user');
		if (!window.location.indexOf("/admin/signin.html")) {
			window.location = "/admin/signin.html";
		}
	}
});

function testGlobalFunction(arg){
	alert(arg);
}

/**
 * get date by timezone
 */
function getDateByTimeZoneOffset(timeZoneOffset){
	var date = new Date();
	var UTC00 = date.getTime() + (date.getTimezoneOffset() * 60000);
	var startDate = new Date(UTC00 + (timeZoneOffset * 3600000));
	return startDate;
}