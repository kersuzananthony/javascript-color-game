var colors;
var pickedColor;
var difficultyLevel = 6;

var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("color_display");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var extremeButton = document.querySelector("#extreme");

resetButton.addEventListener("click", startGame);
easyButton.addEventListener("click", function() {
    hardButton.classList.remove("selected");
    extremeButton.classList.remove("selected");
    this.classList.add("selected");
    changeGameLevel(3)
});
hardButton.addEventListener("click", function() {
    this.classList.add("selected");
    extremeButton.classList.remove("selected");
    easyButton.classList.remove("selected");
    changeGameLevel(6)
});
extremeButton.addEventListener("click", function() {
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    changeGameLevel(9);
});

startGame();

function startGame() {
    colors = generateRandomColors(difficultyLevel);
    pickedColor = pickedRandomColor();
    colorDisplay.textContent = pickedColor;
    h1.style.background = "#232323";
    resetButton.textContent = "New Color";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }

        // Click listener
        squares[i].addEventListener("click", function() {
            if (this.style.background === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.background = pickedColor;
                resetButton.textContent = "Play Again!";
            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

function changeGameLevel(level) {
    difficultyLevel = level;
    startGame();
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickedRandomColor() {
    var value = Math.floor(Math.random() * colors.length);
    return colors[value];
}

function generateRandomColors(numberOfColors) {
    var colors = [];

    for (var i = 0; i < numberOfColors; i++) {
        colors.push(randomColor());
    }

    return colors;
}

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}