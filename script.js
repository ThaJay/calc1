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
        is              = $("#is"),
        reset           = $("#c"),
        calcField       = "0",
        isPressed       = false,
        rst             = function () {
            calcField       = "0";
            ans.text(calcField);
        }

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
    //toetsenbord knopjes && calcField !== "0"
	$(document).keypress(function (event) {
	    if (event.which == 8) {
	        event.preventDefault();
	        calcField = calcField.slice(0,(calcField.length - 1));
	        ans.text(calcField);
	    }
	    else if (
            (event.which >= 48 && event.which <= 57) |
            (event.which >= 188 && event.which <= 191) |
            (event.which >= 96 && event.which <= 111) |
            event.which == 13 |
            event.which == 16 |
            event.which == 27
            ) {
	        event.preventDefault();
	        if (calcField === "0") {
	            calcField = ""
	        };
	        calcField += (event.key + "");
	        ans.text(calcField);
	        isPressed = false;
	    };
	});

//	KeyboardJS.on("1", function () {
//	    if (calcField === "0") {
//	        calcField = ""
//	    };
//	    calcField += "1";
//	    ans.text(calcField);
//	    isPressed = false;
//	});
    
    //reset
	reset.click(function () {
	    rst()
	});
    
    //Rekenen maar!
    is.click(function () {
        calcField = calcField.replace(/[.]{2,}/g, ".");
        if (
            Boolean(calcField[0].match(/[*/]/g)) |
            Boolean(calcField.match(/[+\-/*]{2,}/g)) |
            Boolean(calcField.match(/[+\-/*][.]+[+\-/*]/g))
            ){
            ans.text("invalid");
            isPressed = true;
        }
        else {
            calcField = calcField.replace(/[^-()\d/*+.]/g, '');
            calcField = Math.round(eval(calcField) * 1e3) / 1e3;
            ans.text(calcField);
            isPressed = true;
        };
    });
});
