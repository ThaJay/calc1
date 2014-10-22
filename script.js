$(document).ready(function () {
    
        //er voor zorgen dat de pagina onder de navbar begint
    $(document.body).css('padding-top', $('#topnavbalk').height() + 10);
    $(window).resize(function ()
    {
		$(document.body).css('padding-top', $('#topnavbalk').height() + 10);
	});
    
        //blokken per rij gelijke hoogte maken. Had het liever voor beide rijen in één keer gedaan, maar kreeg dan dezelfde hoogte voor beide rijen
	$('#row1 .block').css(
    {
		'height': $('#row1 .block').parent().height()
	});
	$('#row2 .block').css(
    {
		'height': $('#row2 .block').parent().height()
	});
    
    

        //hier komt de calculator logica

        //calculator var
    var ans             = $("#antwoord"),
        is              = $("#is"),
        reset           = $("#c"),
        nummer          = $(".numberBtn"),
        operator        = $(".operatorBtn"),
        thisDoc         = $(document),
        calcField       = "0",
        isPressed       = false

        //reset
    function rst()
    {
        calcField = "0";
        ans.text(calcField);
    }

        //naar het tekstveld!
	function toField(nummer, autoReset)
	{
	    if (calcField === "0")
	    {
	        calcField = "";
	    }
	    else if (autoReset && isPressed)
	    {
	        rst();
	        calcField = ""
	    }

	    calcField += nummer;
	    ans.text(calcField);
	    isPressed = false;
	};
    
        //klik detectie en doorgeef functionaliteit
	function Knop(jQ, autoReset) {
	    jQ.click(function () {
	        toField(jQ.text(), autoReset);
	    });
	}

	is.click(function () {
	    calculate();
	});

	reset.click(function () {
	    rst()
	});

        //knopjesss
	nummer.each(function () {
	    Knop($(this), true)
	});
	operator.each(function () {
	    Knop($(this), false)
	});


        //toetsenbord knopjes 
	thisDoc.keydown(function (event) {
	    var autRes = false
        
	        //nummers & operators
	    if (
            (event.which >= 48 && event.which <= 57) |
            (event.which >= 96 && event.which <= 107) |
            (event.which >= 109 && event.which <= 111 |
            event.which == 189 |
            event.which == 191)
            )
	    {
            event.preventDefault();

            if (
                (event.which >= 48 && event.which <= 57) |
                (event.which >= 96 && event.which <= 107)
                )
            {autRes = true;}
            
            toField(event.key, autRes);
	    }

	        //backspace
	    else if (event.which == 8 && calcField !== "0")
	    {
	        event.preventDefault();

	        if (calcField.length > 1)
	        {
	            calcField = calcField.slice(0, (calcField.length - 1));
	            ans.text(calcField);
	        }
	        else
	        {rst();}
	    }

	        //enter
	    else if (event.which == 13 | event.which == 108)
	    {
	        event.preventDefault();

	        is.click();
	    }
	});

    
        //Rekenen maar!
	function calculate()
	{
        calcField = calcField.replace(/[.]{2,}/g, ".");
        if (
            Boolean(calcField[0].match(/[*/]/g)) |
            Boolean(calcField.match(/[+\-/*]{2,}/g)) |
            Boolean(calcField.match(/[+\-/*][.]+[+\-/*]/g))
            )
        {
            ans.text("invalid");
            isPressed = true;
        }
        else
        {
            calcField = calcField.replace(/[^-()\d/*+.]/g, '');
            calcField = Math.round(eval(calcField) * 1e3) / 1e3;
            ans.text(calcField);
            isPressed = true;
        };
    };
});
