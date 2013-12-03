console.log("common");

//Properties
function Common(){
	
}

//Methods

Common.prototype.test = function (){
	return "hello test";
};


/*
jQuery.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        jqXHR.setRequestHeader('Authorization', ("Basic " + window.btoa("o:o")));
    }
});
*/