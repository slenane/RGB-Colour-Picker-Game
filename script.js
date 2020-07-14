/*
//DECLARING VARIABLES:

//Set hardcoded colours to demonstrate in the beginning
// let colors = [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)"
// ];

//Set a variable to keep track of the difficulty setting we are on (amount of squares)
let numSquares = 6;

//Then set colours based on a function w/ amount of squares based on this variable
let colors = generateRandomColors(numSquares);

//Select all elements with the class of squares
let squares = document.querySelectorAll(".square");

//Select the hardcoded winning colour to demonstrate
// let pickedColor = colors[3];
//Then select the winning colour based on a function
let pickedColor = pickColor();

//Select the area in which the answer will be shown in the <h1>
let colorDisplay = document.getElementById("colorDisplay");

//Update the color shown in the h1.span
colorDisplay.textContent = pickedColor;

//Select the correct/try again message after click event
let messageDisplay = document.getElementById("message");

//Change the h1 colour to be the same as the winning colour after clicked
let h1 = document.querySelector("h1");

//RESET BUTTON:

//Select the button that resets the colours
let resetButton = document.querySelector("#reset");

//Add event listener to that button
resetButton.addEventListener("click", function() {
    reset();
});

//DIFFICULTY BUTTONS:

//Initially made with separate classes
// let easyBtn = document.getElementById("easyBtn");
// let hardBtn = document.getElementById("hardBtn");

//Then made with a class instead
let modeButtons = document.querySelectorAll(".mode");

for(let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        //Use the terniary operator to do the same as below
        this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
        // if(this.textContent === "Easy") {
        //     numSquares = 3;
        // } else {
        //     numSquares = 6;
        // }
        reset();
    });
}

//Code made with id tags and individual code
// easyBtn.addEventListener("click", function() {
//     //Add/remove the selected class
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     //Set the amount of colors for difficulty
//     numSquares = 3
//     colors = generateRandomColors(numSquares);
//     //Set a new winning colour
//     pickedColor = pickColor();
//     //Set the display to show the new color
//     colorDisplay.textContent = pickedColor;
//     //Change the color of the squares and hide the bottom three
//     for(let i = 0; i < squares.length; i++) {
//         if(colors[i]) {
//             //Assign new colour to the squares
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             //Hide the extra squares
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click", function() {
//     //Add/remove the selected class
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");
//     //Set the amount of colors for difficulty
//     numSquares = 6
//     colors = generateRandomColors(numSquares);
//     //Set a new winning colour
//     pickedColor = pickColor();
//     //Set the display to show the new color
//     colorDisplay.textContent = pickedColor;
//     //Change the color of the squares and hide the bottom three
//     for(let i = 0; i < squares.length; i++) {
//         //Assign a color to all squares
//         squares[i].style.backgroundColor = colors[i];
//         //Display all squares
//         squares[i].style.display = "block";
//     }
// });

//MAIN CODE:

for(let i = 0; i < squares.length; i++) {
    //Add intial colors to squares
    squares[i].style.backgroundColor = colors[i];

    //Add click listeners to squares
    squares[i].addEventListener("click", function() {
        //Grab color of clicked square
        let clickedColor = this.style.backgroundColor;

        //Compare color to pickedColor
        if(clickedColor === pickedColor) {
            //Show correct message
            messageDisplay.textContent = "Correct!";
            //Change all colours to the correct colour
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            //Change the text of the reset button when we win
            resetButton.textContent = "Play Again?";
        } else { 
            //Change to match background colour
           this.style.backgroundColor = "#232323";
           //Show try again message
           messageDisplay.textContent = "Try Again";

        }
    });
};

//FUNCTIONS LIST:

//Change all colours to correct colour after selecting the right answer
function changeColors(color) {
    //Loop through all squares
    for(let i = 0; i < squares.length; i++) {
    //Change to match given color
    squares[i].style.backgroundColor = color;
}
};

//A function to randomly select the correct answer
function pickColor() {
    // Math.floor(Math.random() * 6 + 1); //(1)
    let random = Math.floor(Math.random() * colors.length); //(1)
    return colors[random];
};

//Function to generate random colours when the page loads
function generateRandomColors(num) {
    //Make an array
    let arr = [];
    //Repeat num times
    for(let i = 0; i < num; i++) {
        //Add num random colors to the array
        arr.push(randomColor());
    };
    //Return that array
    return arr;
};

//Function to pick a random color using the RGB color scale
function randomColor() {
    //Pick a "red" from 0 to 255
    let r = Math.floor(Math.random() * 256);
    //Pick a "green" from 0 to 255
    let g = Math.floor(Math.random() * 256);
    //Pick a "blue" from 0 to 255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Function for resetting the colours after difficulty change
function reset() {
     //Generate all new colors
     colors = generateRandomColors(numSquares);
     //Pick a new random color from array
     pickedColor = pickColor();
     //Change color display to match picked color
     colorDisplay.textContent = pickedColor;
     //Change color of squares
     for(let i = 0; i < squares.length; i++) {
         if(colors[i]) {
            squares[i].style.display = "block";
             squares[i].style.backgroundColor = colors[i];
         } else {
            squares[i].style.display = "none";
         }
     };
     h1.style.backgroundColor = "steelblue";
     resetButton.textContent = "New Colors";
     messageDisplay.textContent = "";
};

//(1) Math.floor is a function that rounds down the number to the whole
//    number. 
//    Math random generates a number between 0 and 1 (but never 0), by
//    multiplying this number by 6 + 1 we get a number between 1 and 6
//    with decimals after. Running this whole thing through Math.floor 
//    we get a whole number between 1 and 6.
//    But because we will have two options (easy and hard) we need to set 
//    it so that will change based on the number of colours.
*/

//########################################################################

////////////////////////// CLEAN UP THE CODE /////////////////////////////

//########################################################################

let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init(); 

function init() {
    setUpModeButtons();

    setUpSquares();

    reset();
};

resetButton.addEventListener("click", function() {
    reset();
});


function changeColors(color) {
    for(let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
}
};

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
};


function generateRandomColors(num) {
    let arr = [];
    for(let i = 0; i < num; i++) {
        arr.push(randomColor());
    };
    return arr;
};

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
     colors = generateRandomColors(numSquares);
     pickedColor = pickColor();
     colorDisplay.textContent = pickedColor;
     for(let i = 0; i < squares.length; i++) {
         if(colors[i]) {
            squares[i].style.display = "block";
             squares[i].style.backgroundColor = colors[i];
         } else {
            squares[i].style.display = "none";
         }
     };
     h1.style.backgroundColor = "steelblue";
     resetButton.textContent = "New Colors";
     messageDisplay.textContent = "";
}

function setUpModeButtons(){
    for(let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setUpSquares() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else { 
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
    
            }
        });
    };
}

// The init() function above will call the code for the mode and square 
// settings as soon as the page loads and then calls the reset function 
// to set the page up nicely.