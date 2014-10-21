$(document).ready(function () {
    //er voor zorgen dat de pagina onder de navbar begint (werkt nog niet met verticale navbar(kleine schermen))
    $(document.body).css('padding-top', $('#topnavbalk').height() + 10);
	$(window).resize(function(){
		$(document.body).css('padding-top', $('#topnavbalk').height() + 10);
	});
    //blokken per rij gelijke hoogte maken. Is nu nog per rij gespecificeerd dus vereist nog een aanpassing.
	$('#row1 .block').css({
		'height': $('#row1 .block').parent().height()
	});
	$('#row2 .block').css({
		'height': $('#row2 .block').parent().height()
	});
    //hier komt de calculator logica
    //calculator var
	var ans             = $("#antwoord"),
        calcArrField    = $("#calcArrField"),
        calcArr         = [],
	    calcField       = "0",
        isPressed       = false,
        rst             = function () {
            calcArr = [];
            calcField = "0";
            ans.text(calcField);
        };
    //knopjes drukken functie
	function Knop(jQ,autoReset) {
        jQ.click(function () {
	        if (calcField === "0") {
	            calcField = ""
	        };
	        if (autoReset && isPressed) {
	            rst();
	            calcField = ""
	        };
	        calcArr.push(jQ.text());
	        calcField += calcArr[calcArr.length - 1];
	        ans.text(calcField);
	        calcArrField.text(calcArr);
	        isPressed = false;
	    });
	}
    //knopjesss
	$(".numberBtn").each(function () {
        Knop($(this),true)
	});
	$(".functionBtn").each(function () {
        Knop($(this),false)
	});
    var is      = $("#is"),
        reset   = $("#c")
    //Rekenen maar!
    is.click(function () {
        calcField.replace(/[^-()\d/*+.]/g, '');
        calcField = Math.round(eval(calcField) * 10000) / 10000;
        ans.text(calcField);
        calcArrField.text(calcArr);
        isPressed = true;
    });
    //reset
    reset.click(function () {
        rst()
    });
});