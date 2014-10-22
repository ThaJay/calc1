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
	    calcField       = "0",
        isPressed       = false,
        rst             = function () {
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
	        calcField += jQ.text();
	        ans.text(calcField);
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
        if (calcField[0] === "*" | calcField[0] === "/" | Boolean(calcField.match(/[+\-/*]{2}/g))) {
            ans.text("invalid");
            isPressed = true;
        }
        else {
            calcField = calcField.replace(/[^-()\d/*+.]/g, '');
            calcField = Math.round(eval(calcField) * 10000) / 10000;
            ans.text(calcField);
            isPressed = true;
        };
    });
    //reset
    reset.click(function () {
        rst()
    });
});
