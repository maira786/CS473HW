var main = function () {
    "use strict";

    var frizzbuzz_1 = function () {
        var $i, $output;

        for($i=1; $i<=100; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text("FizzBuzz");;
                $(".output_1").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text("Fuzz");;
                $(".output_1").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text("Buzz");;
                $(".output_1").append($output);
            }else{
                $output = $("<p>").text($i);;
                $(".output_1").append($output);
            }
        }
    };
    var frizzbuzz_2 = function ($start, $end) {
        var $i, $output;
        for($i=$start; $i<=$end; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text("FizzBuzz");;
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text("Fuzz");;
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text("Buzz");;
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);;
                $(".output").append($output);
            }
        }
    };

    $(".initiate_1 button").on("click", function (event) {
        frizzbuzz_1();
    });
    $(".initiate_2 button").on("click", function (event) {
        frizzbuzz_2($(".initiate_2 .start input").val(), $(".initiate_2 .end input").val());
    });
    $(".initiate_2 .end input ").on("keypress", function (event) {
        if (event.keyCode === 13) {
            frizzbuzz_2($(".initiate_2 .start input").val(), $(".initiate_2 .end input").val());
        }
    });
 
};

$(document).ready(main);