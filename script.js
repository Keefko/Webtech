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

class FormatedDate {

	constructor(myDate){

		this.day =String(myDate.getDate()).padStart(2,'0');
		this.month = String(myDate.getMonth() +1).padStart(2,'0');
		this.year = myDate.getFullYear();

	}
}

var searchFlag =[false, false];			// searchFlag[0] popisuje hladanie cez meno, searchFlag[1] popisuje hladanie cez datum

var listOfNamedays = new Array();			//globalny list sviatkov


$(document).ready(function(){

	$.getJSON('meniny.json', function(data){
		$.each(data.meniny.zaznam,function(i,val){

			var nameDay = new Nameday(val.den, val.SKsviatky,val.CZsviatky, stringParser(val.SK),
				stringParser(val.SKd), stringParser(val.CZ), stringParser(val.HU),stringParser(val.PL),stringParser(val.AT));
			listOfNamedays.push(nameDay);
		});
		setTodaysInfo();		//musi to byt kvoli tomu, ze to funguje asynchronne
	});




	$("#cDatum").change(function () {


		disableInput(this,"#cMeno");		//prevencia aby nezadal aj meno aj datum, vymaze
		searchFlag[1] = validateMonth(this);			//bud hladam na zaklade datumu alebo mena
		searchFlag[0] = false;

		//enableSearchButton(searchFlag[1]);
	});

	$("#cMeno").change(function () {

		validateName(this);
		disableInput(this,"#cDatum");		//prevencia aby nezadal aj meno aj datum, vymaze
		searchFlag[1] = false;			//bud hladam na zaklade datumu alebo mena
		searchFlag[0] = validateName(this);

		//enableSearchButton(searchFlag[0]);

	});

	$("#cButtonSearch").click(function () {

		$('#cResultDiv').fadeOut('slow');
		fireSearch();
		$('#cMeno').val('');
		$('#cMeno').prop("disabled",false);
		$('#cDatum').val('');
		$('#cDatum').prop("disabled",false);

	});

	$("#cNewSearchButton").click(function () {

		$('#cResultDiv').fadeOut('slow');
		$('#cMeno').val('');
		$('#cMeno').prop("disabled",false);
		$('#cDatum').val('');
		$('#cDatum').prop("disabled",false);
		enableSearchButton(false);

	});


	$('[data-toggle="tooltip"]').tooltip();

	//$("#cButtonSearch").attr("disabled", true);

});


function fireSearch() {		//spustac funkcii

	if(searchFlag[0] === true){
		$('#cResultDiv').fadeOut('slow');
		setNextNamedays(matchNameWithDate($('#cMeno').val(),$('#cCountrySelect').val()));

	}
	else if(searchFlag[1] === true) {
		$('#cResultDiv').fadeOut('slow');
		setNextNamedays(formatDate($("#cDatum").val()));
	}
	//enableSearchButton(false);
	searchFlag[0]=false;
	searchFlag[1] =false;

}

/*function enableSearchButton(flag) {


	if(flag){
		$('#cButtonSearch').attr("disabled", false);
	}
	else {
		$('#cButtonSearch').attr("disabled", true);
	}

}
*/




function findTodaysDate(){		//nastavi dnesny datum, vracia formu ako v jsone

	var today = new Date();
	var todayNum;

	let formatedDate = new FormatedDate(today);

	today = formatedDate.day + '.' + formatedDate.month + '.'+ formatedDate.year;
	todayNum = formatedDate.month + formatedDate.day;
	$("#cTodaysDate").text(today);

	return todayNum;
}


function formatDate(date) {
									//vstup formatu den.mesiac.
	var parts = new Array();		//vystup bude pole parts[0] = mesiac parts[1] =den

	var splitDate = date.split('.');

	parts[0] = splitDate[1];
	parts[1] = splitDate[0];

	return parts;
}



function matchNameday(todayNum,country){		//podla datumu najde chcene meno

	let name;

	for (var i=0; i<listOfNamedays.length;i++){

		if(listOfNamedays[i]['den'] === todayNum){
			name = listOfNamedays[i][country];

			if(!name){								//ak v kalendari nie je meno na dany den
				name = "Bez menín";
				return  name;
			}
			return name;
		}

	}

}

function matchHoliday(todayNum,country){

	let holiday;

	for (var i=0; i<listOfNamedays.length;i++){

		if(listOfNamedays[i]['den'] === todayNum){
			holiday = listOfNamedays[i][country + "sviatky"];

			if(!holiday){								//ak v kalendari nie je meno na dany den
				holiday = "";
			}
			return holiday;
		}

	}

}

function matchNameWithDate(name,country) {		//najde dátum podla zadaneho mena

	let date;
	var nameCandidate;
	let parts = new Array();

	for (var i=0; i<listOfNamedays.length;i++){

		if(!listOfNamedays[i][country]){								//ak v kalendari nie je meno na dany den

			listOfNamedays[i][country]= stringParser("");	//prerobit napriamo
		}

		var nameArray = listOfNamedays[i][country];

		for(var j =0; j<nameArray.length; j++){	//prejdem vsetky mena v poli mien

			nameCandidate = nameArray[j];

			if(compareNames(nameCandidate,name)){

				console.log(nameCandidate);
				date = listOfNamedays[i]['den'];	//mesiac.den. treba

			}

		}


	}
		if(date){

			parts [0] = date.substr(0,2); //prve dva znaky
			parts [1] = date.substr(2);			//od znaku s indexom 2 po koniec

		}
		else {

		}
		return parts;		//vrati pole
}


function setTodaysInfo(){

	const today = findTodaysDate();
	const holiday = matchHoliday(today,"sk");

	if(holiday){

		$("#cTodaysDate").append(" ,"+ holiday);
	}


	$("#cTodaysName").text(matchNameday(today,"sk"));

}

function setNextNamedays(parts){		//zada dalsich 10 menin po zadanom datume vstup 0629 format


	$('#cTable > tbody:last-child').empty();


	if(Array.isArray(parts) && parts.length === 0){		//ak pole nie je vytvorene alebo nema polozky
		$("#cSearchedName").text("Neexistuje daný záznam");
		$("#cSearchedDate").empty();
		$('#cResultDiv').fadeIn('slow');

		return;
	}


	/*

	var dateInput =$(dateInputID).val();		//string datumu zo vstupu
	var parts = startDate.split('.');
	*/
	var inputDate = new Date((new Date()).getFullYear(), parseInt(parts[0]) -1,parseInt(parts[1]));

	var country = $('#cCountrySelect').val();



	if(parts[0].length ===1){

		parts[0]= addZero(parts[0]);		//pridam 0 ak je zadane cislo bez 0 kvoli Date contructoru
	}
	if(parts[1].length ===1){

		parts[1] = addZero(parts[1]);
	}

	$("#cSearchedName").text(matchNameday(parts[0]+parts[1],country));	//parts su stringy mesiac,den
	$("#cSearchedDate").text(parts[1] + '.' + parts[0] +'.');		//napriamo datum z input textokna
	var nextDay = new Date(inputDate);


	for(let i=0; i<10; i++){

		nextDay.setDate(nextDay.getDate()+1);		//posuvam datum o den dopredu

		var nextDayFormated = new FormatedDate(nextDay);	//objekt s ciselkami


		var name = matchNameday(nextDayFormated.month + nextDayFormated.day, country);
		$('#cTable > tbody:last-child').append('<tr> ' +
			'<td>'+nextDayFormated.day+ '.' +nextDayFormated.month+'.'+'</td> ' +
			'<td>' + name + '</td>>'+
			'</tr>');

	}

	$('#cResultDiv').fadeIn('slow');
}


function addZero(num) {

	return '0'+ num;
}


function disableInput(originID,receiverID){

	var origin = $(originID);
	var receiver = $(receiverID);


	if(!origin.val()){

		//receiver.prop("disabled", false);	//ak vymazem textinput tak odblokujem druhy textbox
		searchFlag [0] = false;
		searchFlag [1] = false;
		return;
	}

	receiver.val('');
	closeHint(receiverID);
	//receiver.prop("disabled",true);

}


function stringParser(myString){

if(myString){

	var result = myString.replace(/\s+/g, '');	//vymaze vsetky medzery /s, g je global=vsetky
	result = result.split(',');

	return result;
}
else return "";

}

function validateName(inputID){

	var pattern = /^[a-zA-ZÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŻŹżźđĢĞģğ]+$/;		//znaky,ktore moze obsahovat meno
	var nameBox = $(inputID);
	if(!nameBox.val().match(pattern) && (!(nameBox.val() ===''))){

		nameBox.css("border-style","solid");
		nameBox.css("border-color","red");
		$("#cMeno").popover({
				placement: "bottom",
				content: "Použite len písmená, s alebo bez diakritiky",

			});
		$("#cMeno").popover('show');

		return false;
	}

	else{
		closeHint(inputID);
	}


	if(nameBox.val() ==='' || !(isNaN(nameBox.val()))){
		closeHint(inputID);
		return false;
	}
	return true;
}


function validateMonth(inputID){		//kontrola datumu z kazdej perspektivy

	var pattern =  /^[0-9]+\.[0-9]+\.$/;		//ci zadal dobry format ddtumu dd.mm. alebo 0d.0m. alebo kombinacia
	var dateBox = $(inputID);

	if((!dateBox.val().match(pattern))&& (!(dateBox.val() ===''))){

		showDateHint(inputID);
		return false;

	}

	var parts = dateBox.val().split('.');	//rozdelim na den a mesiac
	var day = parseInt(parts[0]);
	var month = parseInt(parts[1]);


	if(((day < 1 || day > 31) || (month < 1 || month > 12))){		// den je 1 az31, mesiac je 1-12

		showDateHint(inputID);
		return false;
	}

	let wrongDays = new Map([		//tie mesiace, ktore maju len 30 dni a menej

		[4, 31],
		[6, 31],
		[9,31],
		[11,31]
	]);

	if(wrongDays.has(month)){

		if(wrongDays.get(month) === day){		//osetrenie ci ma len 30 dni mesiac

			showDateHint(inputID);
			return false;
		}
	}

	if(month===2 && day>28){
		var date = new Date();

		if(!((date.getFullYear()%4 ===0) && (day===29))){		//priestupny rok
			showDateHint(inputID);
			return false;
		}
	}

	if(dateBox.val() ==='' || (!isNaN(dateBox.val()))){
		closeHint(inputID);
		return false;
	}

	closeHint(inputID);
	return true

}

function showDateHint(elementID){

	var dateBox = $(elementID);
	dateBox.css("border-style","solid");
	dateBox.css("border-color","red");
	dateBox.popover({
		placement: "bottom",
		content: "Nesprávne vyplnený dátum",

	});
	dateBox.popover('show');
}

function closeHint(elementID){

	var element = $(elementID);
	element.css("border-style","none");
	element.popover('dispose');

}

function formatName(input){

	var accents = 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ';
	var accentsOut = "AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg";

	input = input.split('');
	const inputLength = input.length;
	var output;
	var i,x;

	for(i =0; i<inputLength; i++){

		if((x= accents.indexOf(input[i])) != -1){		//https://gist.github.com/alisterlf/3490957  fillipo conti

			input[i] = accentsOut[x];
		}
	}

	output = input.join('');

	return output.toLowerCase();
}


function compareNames(nameOne, nameTwo){

	if(formatName(nameOne) === formatName(nameTwo)){

		return true;
	}
	else {
		return false;
	}

}




console.log(listOfNamedays);


