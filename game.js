var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){

    userClickedPattern = [];
    level++;

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour)

   
   $("#level-title").html ("Level " + level)
   
   
   
};

       $(".btn").click(function(){
           var userChosenColour = $(this).attr("id");
           userClickedPattern.push(userChosenColour);
           checkAnswer(userClickedPattern.length - 1)
           // console.log (userClickedPattern);
           playSound(userChosenColour);
           animatePress(userChosenColour)
       });

function playSound(name){
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
        $("#" + currentColour).addClass("pressed")
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed")
        },100)
};

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() { nextSequence(); }, 1000);
            userClickedPattern = [ ];
        }
    }else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#container").addClass("game-over")
        setTimeout(function(){
            $("#container").removeClass("game-over")
        },200);
        $("#level-title").html ("Game Over, Press any key to restart");
        startOver();
};

};

$(document).on('keypress',function() {
    if(started=== false){
        nextSequence();
        started = true;
        $("#level-title").html ("Level " + level)
    }
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false
} 