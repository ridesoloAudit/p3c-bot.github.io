if (localStorage.getItem('masternode')) {
	$(".dashboard-link").attr("href", "/interact.html?masternode=" + localStorage.getItem('masternode'))
}

var startDate = new Date('2018-07-01 19:02:42 -0400'); //What date to start counting from
var now = Math.floor(Date.now() / 1000); //Current timestamp in seconds
var clockStart = now - startDate.getTime() / 1000; //What to set the clock at when page loads
// var clock2 = $('.flip-clock').FlipClock(opts).setTime(clockStart); //Start clock
var clock = $('.flip-clock').FlipClock(clockStart, {
	clockFace: 'DailyCounter',
});