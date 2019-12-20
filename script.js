class Nameday {
	constructor(den,sksviatky,czsviatky,sk, skd, cz, hu, pl, at){
		this.den = den;
		this.sksviatky = sksviatky;
		this.czsviatky = czsviatky;
		this.sk = sk;
		this.skd = skd;
		this.cz = cz;
		this.hu = hu;
		this.pl = pl;
		this.at = at;
	}
}

var listOfNamedays = new Array();

$(document).ready(function(){
	$('.navbar-nav > .navbar-toggler-icon').on('click', function(){
		alert("pičo");
	});
});

$(document).ready(function(){
	$.getJSON('meniny.json', function(data){
		$.each(data.meniny.zaznam,function(i,val){
			var nameDay = new Nameday(val.den, val.SKsviatky,val.CZsviatky, val.SK,val.SKd, val.CZ, val.HU,val.PL,val.AT);
			listOfNamedays.push(nameDay);
		});
	});
});