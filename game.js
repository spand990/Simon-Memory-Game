var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0
var started = false

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = [];
    level = level + 1
    var n = Math.random();
    n = n * 4;
    n = Math.floor(n);
    var randomChosenColor = buttonColors[n];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level " + level)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed", 300);
    })
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence(), 1000
            })
        }
    } else {
        console.log("wrong")
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        gameOver();
    }
}

function gameOver() {
    $("body").addClass("game-over")

    setTimeout(function () {
        $("body").removeClass("game-over", 2000)
    })
    $("h1").text("Game Over ,Press any key to Restart")
    startOver();
}

function startOver() {
    started = false
    level = 0
    gamePattern = []
    userClickedPattern = []
}

function start() {
    $(document).keydown(function () {
        if (!started) {
            $("h1").text("Level" + level)
            nextSequence();
            started = true
        }
    })

}

start();



