(function() {
//inserts year in the footer dynamically
var footersYear = function() {
	var today = new Date();
	var year = today.getFullYear();
	document.getElementById('fyear').textContent = year;
}
//call it 
footersYear();
	






	
		
})(); //self exec func
