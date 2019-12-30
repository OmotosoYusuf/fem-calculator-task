// the screen will take input from the clicks on the number
// once a number is clicked it displays on the screen
//once an arithmetic operation is about to start, the calculator uses the clicks on the display numbers to give out results

//User clicks on the number(s) and arithmetic operator(s), then ask for an output by pressing the equal button


let buffer = "0";
let runningTotal = 0;
let previousOperation = null;
const screen = document.querySelector(".screen");

//Taking the values as user clicks the buttons

document.querySelector(".calc-buttons").addEventListener("click", function(event){
    buttonClick(event.target.innerText);
});

//taking each value for a button click

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

//handling the numbers from the button clicked
function handleNumber(value){
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

//handle the symbols from the button clicked
function handleSymbol(value){
    switch (value){
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperation = null;
            break;
        case '=':
            if (previousOperation === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperation = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }

}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);  
    }

    previousOperation = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperation === "+") {
        runningTotal += intBuffer;
    } else if (previousOperation === "-"){
        runningTotal -= intBuffer;
    } else if (previousOperation === "×"){
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}