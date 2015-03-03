var main = function () {
    "use strict";

    var frizzbuzz_1 = function () {
        var $i, $output;

        for($i=1; $i<=100; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text("FizzBuzz");
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text("Fuzz");
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text("Buzz");
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);
                $(".output").append($output);
            }
        }
    };
    var frizzbuzz_2 = function ($start, $end) {
        var $i, $output;
        for($i=$start; $i<=$end; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text("FizzBuzz");
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text("Fuzz");
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text("Buzz");
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);
                $(".output").append($output);
            }
        }
    };
    var frizzbuzz_3 = function ($arr) {
        var $i, $output;
        for($i=$arr[0]; $i<=$arr.length + 1; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text("FizzBuzz");
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text("Fuzz");
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text("Buzz");
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);
                $(".output").append($output);
            }
        }
    };
    var frizzbuzz_4 = function ($outputwords) {
        var $i, $output;

        for($i=1; $i<=100; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text($outputwords.divisibleByThree + $outputwords.divisibleByFive);
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text($outputwords.divisibleByThree);
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text($outputwords.divisibleByFive);
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);
                $(".output").append($output);
            }
        }
    };
    var frizzbuzz_5 = function ($arr, $outputwords) {
        var $i, $output;

        for($i=$arr[0]; $i<=$arr.length + 1; $i++){
            if ($i%15 ===0){
                $output = $("<p>").text($outputwords.divisibleByThree + $outputwords.divisibleByFive);
                $(".output").append($output);
            }else if ($i%3 ===0){
                $output = $("<p>").text($outputwords.divisibleByThree);
                $(".output").append($output);
            }else if ($i%5 ===0){
                $output = $("<p>").text($outputwords.divisibleByFive);
                $(".output").append($output);
            }else{
                $output = $("<p>").text($i);
                $(".output").append($output);
            }
        }
    };
    //----------------1------------------------
    $(".initiate_1 button").on("click", function (event) {
        frizzbuzz_1();
    });
    //----------------2------------------------
    $(".initiate_2 button").on("click", function (event) {
        frizzbuzz_2($(".initiate_2 .start input").val(), $(".initiate_2 .end input").val());
    });
    $(".initiate_2 .end input ").on("keypress", function (event) {
        if (event.keyCode === 13) {
            frizzbuzz_2($(".initiate_2 .start input").val(), $(".initiate_2 .end input").val());
        }
    });
    //----------------3------------------------
    var $arr= [];

    //The + button action for entering array values
    $(".initiate_3 .enter button").on("click", function (event) {
        if ($(".initiate_3 input") !== "") {
            $arr.push($(".initiate_3 input").val());
            $(".initiate_3 input").val("");
        }
    });
    //The enter keyboard key pressed to input array elements
    $(".initiate_3 input ").on("keypress", function (event) {
        if (event.keyCode === 13) {
            if ($(".initiate_3 input") !== "") {
                $arr.push($(".initiate_3 input").val());
                $(".initiate_3 input").val("");
            }
        }
    });
    $(".initiate_3 .calculate button").on("click", function (event) {
        
        frizzbuzz_3($arr);
    }); 
    //----------------4------------------------
    var $outputwords = {divisibleByThree: "", divisibleByFive: ""};

    $(".initiate_4  button").on("click", function (event) {
        
        frizzbuzz_4({ divisibleByThree: $(".initiate_4 .frizz input").val(), divisibleByFive: $(".initiate_4 .bizz input").val()});
        $(".initiate_4 .frizz input").val("");
        $(".initiate_4 .bizz input").val("");
    }); 
    //-----------------5-----------------------
    //The + button action for entering array values
    $(".initiate_5 .enter button").on("click", function (event) {
        if ($(".initiate_5 .array-input input") !== "") {
            $arr.push($(".initiate_5 .array-input input").val());
            $(".initiate_5 .array-input input").val("");
        }
    });
    //The enter keyboard key pressed to input array elements
    $(".initiate_5 .array-input input").on("keypress", function (event) {
        if (event.keyCode === 13) {
            if ($(".initiate_5 .array-input input") !== "") {
                $arr.push($(".initiate_5 .array-input input").val());
                $(".initiate_5 .array-input input").val("");
            }
        }
    });
    $(".initiate_5 .calculate button").on("click", function (event) {
        
        $outputwords.divisibleByThree= $(".initiate_5 .frizz input").val();
        $outputwords.divisibleByFive= $(".initiate_5 .bizz input").val();
        frizzbuzz_5($arr, $outputwords);
    }); 

};

$(document).ready(main);