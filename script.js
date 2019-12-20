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
	$('.navbar-toggler').on('click', function(){
		if($('.navbar-toggler').attr('aria-expanded')){
			console.log($('.navbar-toggler').attr('aria-expanded'));
			$('.navbar-toggler-icon').css('display', 'none');
			$('.close').css('display','block');
		}else{
			console.log($('.navbar-toggler').attr('aria-expanded'));
			$('.navbar-toggler-icon').css('display', 'block');
			$('.close').css('display','none');
		}
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

console.log(listOfNamedays);