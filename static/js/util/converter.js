console.log("converter");

//Properties
function Converter(){
	
}

Converter.prototype.month = ["January",
                             "February",
                             "March",
                             "April",
                             "May",
                             "June",
                             "July",
                             "August",
                             "September",
                             "October",
                             "November",
                             "December"];

//Methods

/** 
 * Convert long to date
 * better to store date in timestamp, no worry about format
 * */
Converter.prototype.convertLong = function (milis){
	
	var date = new Date(milis);
	//return $.datepicker.formatDate('DD/MM/YYYY', date);
	return date.getDate() + "/" + Converter.prototype.month[date.getMonth()] + "/" + date.getFullYear() + " " + 
	  (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":"  + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

};

/** 
 * Convert day to milis 
 **/
Converter.prototype.convertDayToMilis = function (day){
	return day * ( 24 * 60 * 60 * 1000);
};

/** 
 * Convert milis to day 
 **/
Converter.prototype.convertMilisToDay = function (milis){
	return milis / ( 24 * 60 * 60 * 1000 );
};

Converter.prototype.capitalize = function (text){
	return text.substr(0, 1).toUpperCase() + text.substr(1);
};

Converter.prototype.nextDate = function (date, forwardDays){
	return new Date(new Date(date).getTime() + forwardDays* (24*60*60*1000));
};

Converter.prototype.previousDate = function (date, backwardDays){
	return new Date(new Date(date).getTime() - backwardDays * (24*60*60*1000));
};

/**
 * Compare UTC times of end date and current date
 * expired(time left <= 0)
 * 
 * endTime: end time of UTC date
 * currentTime: current time of UTC date from current date
 **/

Converter.prototype.remainTimes = function (endTime, currentTime){
	//var timeLeft = new Date("3-Jan-2013").getTime()-new Date("3-Jan-2013").getTime();
	//0 expired
	
	//var timeLeft = new Date("3-Jan-2013").getTime()-new Date("4-Jan-2013").getTime();
	//-86400000 expired
	
	//var timeLeft = new Date("5-Jan-2013").getTime()-new Date("4-Jan-2013").getTime();
	//86400000 , not expired
	
	//var timeLeft = new Date("5-Jan-2013 10:09:08").getTime()-new Date("4-Jan-2013 10:09:08").getTime();
	//86400000 , not expired
	
	//var timeLeft = new Date("5-Jan-2013 10:09:09").getTime()-new Date("4-Jan-2013 10:09:08").getTime();
	//86401000 , not expired
	
	var timeLeft = endTime - currentTime;
	return timeLeft;

};


Converter.prototype.getUTCDate = function (date){
	return date.getUTCDate() + "/" + Converter.prototype.month[date.getUTCMonth()] + "/" + date.getUTCFullYear() + " " + 
    (date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes() + ":"  + (date.getUTCSeconds() < 10 ? '0' : '') + date.getUTCSeconds();
};

Converter.prototype.getTimes = function (date){
	return new Date(date).getTime();
};

Converter.prototype.displayTimezone = function (){
    //Display real timezone
    //for example: GMT+0700
    return new Date().toTimeString().split(" ")[1];
};

/**
 * setHours() to date
 * milliseconds
 * */
Converter.prototype.getDateAndTimes = function (datePicker, timePicker){
    var times = $(timePicker).val();
    var dateAndTimes = new Date($(datePicker).val()).setHours(times);
    return dateAndTimes;
};

/**
 * getHours() from date
 * milliseconds
 * */
Converter.prototype.getTimesFromDate = function (dateValue){
    var date = new Date(dateValue);
    return date.getHours();
};