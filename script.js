$( document ).ready(function() {

    var messages = {
        "msgRequired": "Add number in cell count between 4 and 100.",
        "msgBetween": "Number must be between 4 and 100.",
        "msgType": "Value should be a number"
    };

    var count = "";
    var squareDiv = $("#squareDiv");
    var errorMessage = "";

    $("#drawBtn").on("click", function () {
        count = $("#count").val();

        if (validate()){
            enable([ $("#resetBtn"), $("#colouriseBtn") ]);
            disable([ $("#drawBtn"), $("#count") ]);

            var appendedDivs = "";
            var rows = "";
            for (var i=0; i<count; i++) {
                var cols = "";
                for (var j=0; j<count; j++) {
                    cols += "<div class='sq-block sq-" + j + "-" + i + "'></div>";
                }
                rows += cols + "</div></br>";
            }
            squareDiv.append(rows);
            setSquareStyle();
        } else {
            swal(errorMessage);
        }
    });

    $("#colouriseBtn").on("click", function () {
        disable([ $("#colouriseBtn") ]);

        (function loop(raw, col) {
            setTimeout(function () {
                $(".sq-" + (count - col) + "-" + (count - raw)).css("background-color", getRandomColor());
                if(--raw) {
                    //loop by one column's squares
                    loop(raw, col);
                } else {
                    if(--col) {
                        //go to the next column
                        loop(count, col);
                    }
                }
            }, 1.5)
        })(count, count);

    });

    $("#resetBtn").on("click", function () {
        $("#count").val("");
        squareDiv.empty();
        errorMessage = "";
        //deactivate reset and colourise buttons
        disable([$("#resetBtn"), $("#colouriseBtn")]);
        //activate draw button
        enable([$("#drawBtn"), $("#count")]);
        $("#count").focus();
    });

    //deactivate
    //as param get array of jQuery elements
    function disable(el) {
        for (var i=0; i<el.length; i++) {
            el[i].attr("disabled", "disabled");
        }
    }

    //activate
    //as param get array of jQuery elements
    function enable(el) {
        for (var i=0; i<el.length; i++) {
            el[i].removeAttr("disabled");
        }
    }

    //random color generator
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[ Math.floor(Math.random() * 16) ];
        }
        return color;
    }

    //count and set square size
    function  setSquareStyle() {
        var parentWidth = squareDiv.width();
        var squareWidth = Math.floor(parentWidth / parseInt(count));

        $(".sq-block").css({
            "width": squareWidth - squareWidth * 0.2,
            "height": squareWidth - squareWidth * 0.2,
            "margin": squareWidth * 0.1
        });
    }

    //validate given number(count)
    function validate() {
        var t = false;
        if(count == "") {
            errorMessage = messages.msgRequired;
            return t;
        }
        if (typeof parseInt(count) == "number") {
            if (count >= 4 && count <= 100) {
                t = true;
            } else {
                errorMessage = messages.msgBetween;
            }
        } else {
            errorMessage = messages.msgType;
        }
        return t;
    }
});