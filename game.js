var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("h1").text("level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    
    var idOfel=$(this).attr("id");
    userClickedPattern.push(idOfel);
    playSound(idOfel);
    animatePress(idOfel);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    level++;
    
    userClickedPattern=[];
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    // var audio=new Audio("sounds/"+randomChosenColour+".mp3");
    // audio.play();
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
    
}
function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
       console.log("Success");
       if(userClickedPattern.length===gamePattern.length){
           setTimeout(function(){
               nextSequence();
           },1000);
       }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $(document).keypress(function(){
        if(!started){
            $("h1").text("level "+level);
            nextSequence();
            started=true;
        }
    })
}
