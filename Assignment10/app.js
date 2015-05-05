var app = angular.module("commentModule",[]);

app.controller("commentController",function($scope){

    $scope.commentBox=["This is the first comment", "Here's the second comment", 
                        "And this is one More", "Here is another one"]; 

    $scope.addCommentFromInputBox = function(){
        if($scope.commentInputModel==null){
            window.alert("Oops, please enter a comment");
        }else{
            $scope.commentBox.push($scope.commentInputModel);
        }
    };
});