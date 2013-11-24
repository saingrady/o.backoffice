console.log("converter");

/* 
 * Convert long to date
 * better to store date in timestamp, no worry about format
 * */
function convertLong(milis){

	var month=new Array();

	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";


	var date = new Date(milis);
	//return $.datepicker.formatDate('DD/MM/YYYY', date);
	return date.getDate() + "/" + month[date.getMonth()] + "/" + date.getFullYear() + " " + 
	  (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":"  + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

}


/* 
 * Convert date to long 
 * */
function convertDate(){
}


/* 
 * Convert day to milis 
 * */
function convertDayToMilis(day){
	return day * ( 24 * 60 * 60 * 1000);
    
}

/* 
 * Convert milis to day 
 * */
function convertMilisToDay(milis){
	return milis / ( 24 * 60 * 60 * 1000 );
}


function capitalize(text){
	return text.substr(0, 1).toUpperCase() + text.substr(1);
}

function nextDate(date, forwardDays) {
	return new Date(new Date().getTime() + forwardDays* (24*60*60*1000))
}

function previousDate(date, backwardDays) {
	return new Date(new Date().getTime() - backwardDays * (24*60*60*1000))
}

/*
 * Compare UTC times of end date and current date
 * expired(time left <= 0)
 * 
 * endTime: end time of UTC date
 * currentTime: current time of UTC date from current date
 * */
function compareTimes(endTime, currentTime){
	
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
}

function getUTCDate(date){
	return date.getUTCDate() + "/" + month[date.getUTCMonth()] + "/" + date.getUTCFullYear() + " " + 
    (date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes() + ":"  + (date.getUTCSeconds() < 10 ? '0' : '') + date.getUTCSeconds();
}

function getTimes(date){
	return new Date(date).getTime();
}

function displayTimezone(){
    //Display real timezone
    //for example: GMT+0700
    return new Date().toTimeString().split(" ")[1];
}

/**
 * setHours() to date
 * milliseconds
 * */
function getDateAndTimes(datePicker, timePicker){
    var times = $(timePicker).val();
    var dateAndTimes = new Date($(datePicker).val()).setHours(times);
    return dateAndTimes;
}

/**
 * getHours() from date
 * milliseconds
 * */
function getTimesFromDate(dateValue){
    var date = new Date(dateValue);
    return date.getHours();
}