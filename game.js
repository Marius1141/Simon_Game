// GAME PROCESS
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameProcess = 0;

function newColor(c) {
  userPattern.push(c);
}
function nextColor() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
}
function nextStep (){
gamePattern.push(nextColor());
}
function gameplay(){
  nextStep();
  setTimeout(function(){
    $("h1").html("Level  " + gamePattern.length);
    for (let x = 0; x < gamePattern.length; x++) {
      (function(index) {
          setTimeout(function() { machinePressedKey(gamePattern[index]); }, x * 500);
      })(x);
    }
  },600);
  userPattern = [];
}
function chekingOut () {
  var igualdad = 0;
    for(a = 0; a < userPattern.length; a++){
        if (gamePattern[a] == userPattern[a]) {
          igualdad++;
        }else {
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          },100);
          var gameOver = new Audio("sounds/wrong.mp3");
          gameOver.play();
          $("h1").html("Game Over, press A to re-start");
          gamePattern = [];
      }
  }
  if (gamePattern.length == igualdad && gamePattern != 0){
    gameplay();
  }
}


// BUTTONS AND KEYS FUNCTIONALITY
for (var i = 0; i < buttonColors.length; i++) {
  var buttonSelector = "#" + buttonColors[i];
  $(buttonSelector).click(function() {
    var userChosenColor = $(this).attr("id");
    userPressedKey(userChosenColor); //Is the same as colorButton (var)
    if(gamePattern != 0){
      newColor(userChosenColor);
      chekingOut();
    }
  });
}
$(document).keydown(function(target) {
  switch (target.key) {
    case "ArrowLeft":
      var colorButton = buttonColors[0];
      userPressedKey(colorButton); //Same as userChosenColor (var)
      break;
    case "ArrowRight":
      var colorButton = buttonColors[1];
      userPressedKey(colorButton)
      break;
    case "ArrowUp":
      var colorButton = buttonColors[2];
      userPressedKey(colorButton)
      break;
    case "ArrowDown":
      var colorButton = buttonColors[3];
      userPressedKey(colorButton)
      break;
    case "Enter":
       console.log(gamePattern);
      break;
      case "Backspace":
         console.log(userPattern);
        break;
        case "a":
        if (gamePattern.length == 0) {
          gameplay();
        } else {
          console.log("El juego ya esta activado")
        }
          break;
    default:
  }
  if(gamePattern != 0 && buttonColors.includes(colorButton)){
    newColor(colorButton);
  }
  chekingOut();

});

function userPressedKey(color) {
  var idSelect = "#" + color;
  var keySound = "sounds/" + color + ".mp3";

  $(idSelect).fadeOut(80).fadeIn(80);
  var sound = new Audio(keySound);
  sound.play()
  $(idSelect).addClass("pressed");
  setTimeout(function() {
    $(idSelect).removeClass("pressed");
  }, 100);
}

function machinePressedKey(k) {
    var idSelect = "#" + k;
    var keySound = "sounds/" + k + ".mp3";

    $(idSelect).fadeOut(80).fadeIn(80);
    var sound = new Audio(keySound);
    sound.play();
}
