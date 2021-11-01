var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;
var countClick = 0;
var timer;

function nextSequence() {
  level++;
  countClick = 0;
  userClickedPattern = [];
  document.querySelector("#level-title").textContent = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var element = document.querySelector("#" + randomChosenColour);
  addFlashEffect(element);
  addSound(randomChosenColour);
  // console.log("Game = " + gamePattern);
  if(timer){
    clearTimeout(timer);
    timer=null;
  }
  timer = setTimeout(gameOver, 5000);
}

//HANDLING USER CLICK

document.querySelectorAll(".mybtn").forEach(item => {
  item.addEventListener("click",
    event => {
      if(timer){
        clearTimeout(timer);
        timer=null;
      }
      if (gameStart == true) {

        // gameStart = false;
        countClick++;

        // console.log("countClick=" + countClick);
        var userChosenColor = item.id;
          addSound(userChosenColor);
        addFlashEffect(item);
        checkUserAnswer(userChosenColor, countClick);
        // console.log("User = " + userClickedPattern);
        // console.log("Level= " + level);

      } else {
        gameOver();
      }
    }
  )
});




function checkUserAnswer(userChosenColor, countClick) {

  userClickedPattern.push(userChosenColor);
  check = countClick - 1;
  if (userClickedPattern[check] == gamePattern[check]) {

    timer = setTimeout(gameOver, 5000);

    if (countClick >= level) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    gameOver();
  }
}

function gameOver() {
  document.querySelector("#level-title").textContent = "Game Over! Press a key to restart.";
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  document.querySelector("body").classList.add("game-over");
  setTimeout(function() {
    document.querySelector("body").classList.remove("game-over");
  }, 100);
  gamePattern = [];
  userClickedPattern = [];
  gameStart = false;
  level = 0;
  countClick = 0;
  timer = null;
}

// detect keyboards press and start game -GAME START
document.addEventListener("keydown", function() {
  if (!gameStart) {
    gameStart = true;
    nextSequence();
    document.querySelector("#level-title").textContent = "Level " + level;

  }
});

function addFlashEffect(element) {
  element.classList.add("pressed");
  setTimeout(function() {
    element.classList.remove("pressed");
  }, 100);
}

function addSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}
