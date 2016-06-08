var colors;
var pickedColor;
var difficultyLevel = document.querySelector("button.selected").getAttribute("data-level");

var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("color_display");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
        for (var i = 0; i < modeButtons.length; i++) {
            modeButtons[i].classList.remove("selected");
        }

        this.classList.add("selected");

        changeGameLevel(this.getAttribute("data-level"));
    });
}

resetButton.addEventListener("click", startGame);

startGame();

function startGame() {
    colors = generateRandomColors(difficultyLevel);
    pickedColor = pickedRandomColor();
    colorDisplay.textContent = pickedColor;
    h1.style.background = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

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