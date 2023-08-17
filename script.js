const rowLength = 6;
const columnLength = 7;
let trackColumns = [5, 5, 5, 5, 5, 5, 5];
let trackBoardCircle = [];

const playerOne = "Player one";
const playerTwo = "Player two";

let curentPlayer = playerOne;

const modal = document.getElementById("finnish_modal");
const start = document.getElementById("refresh");

createColumAndRow();

function createColumAndRow() {
    for (let row = 0; row < rowLength; row++) {
        let rowArray = [];
        for (let column = 0; column < columnLength; column++) {
            rowArray.push(" ");
            let boxElement = document.createElement("div");
            boxElement.id = row + "-" + column
            boxElement.classList.add("circle");
            boxElement.addEventListener("click", setCircle);
            document.getElementById("connect_four_game_table_ct").append(boxElement);
        }
        trackBoardCircle.push(rowArray);
    }
}

function setCircle() {
    let circleCordonates = this.id.split("-");
    let rowCordonate = circleCordonates[0];
    let columnCordonate = circleCordonates[1];

    rowCordonate = trackColumns[columnCordonate];
    trackBoardCircle[rowCordonate][columnCordonate] = curentPlayer;

    if (rowCordonate < 0) {
        return;
    }

    let circle = document.getElementById(rowCordonate + "-" + columnCordonate);
    checkWinner();
    if (curentPlayer === playerOne) {
        circle.classList.add("red_circle");
        curentPlayer = playerTwo;
    } else {
        circle.classList.add("blue_circle");
        curentPlayer = playerOne;
    }
    rowCordonate -= 1;
    trackColumns[columnCordonate] = rowCordonate;
}

function checkWinner() {

    for (let row = 0; row < rowLength; row++) {
        for (let column = 0; column < columnLength - 3; column++) {
            if (trackBoardCircle[row][column] != ' ') {
                if (trackBoardCircle[row][column] == trackBoardCircle[row][column + 1] && trackBoardCircle[row][column + 1] == trackBoardCircle[row][column + 2] && trackBoardCircle[row][column + 2] == trackBoardCircle[row][column + 3]) {
                    setWinner();
                    return;
                }
            }
        }
    }

    for (let column = 0; column < columnLength; column++) {
        for (let row = 0; row < rowLength - 3; row++) {
            if (trackBoardCircle[row][column] != ' ') {
                if (trackBoardCircle[row][column] === trackBoardCircle[row + 1][column] && trackBoardCircle[row + 1][column] === trackBoardCircle[row + 2][column] &&
                    trackBoardCircle[row + 2][column] === trackBoardCircle[row + 3][column]) {
                    setWinner();
                }
            }
        }
    }

    for (let column = 0; column < columnLength; column++) {
        for (let row = 0; row < rowLength - 3; row++) {
            if (trackBoardCircle[row][column] != ' ') {
                if (trackBoardCircle[row][column] === trackBoardCircle[row + 1][column + 1] && trackBoardCircle[row + 1][column + 1] === trackBoardCircle[row + 2][column + 2] &&
                    trackBoardCircle[row + 2][column + 2] === trackBoardCircle[row + 3][column + 3]) {
                    setWinner();
                }
            }
        }
    }

    for (let row = 0; row < rowLength; row++) {
        for (let column = 0; column < columnLength - 3; column++) {
            if (trackBoardCircle[row][column] != ' ') {
                if (trackBoardCircle[row][column] === trackBoardCircle[row - 1][column + 1] && trackBoardCircle[row - 1][column + 1] === trackBoardCircle[row - 2][column + 2] &&
                    trackBoardCircle[row - 2][column + 2] === trackBoardCircle[row - 3][column + 3]) {
                    setWinner();
                }
            }
        }
    }
}

function setWinner() {
    const getWinnerElement = document.getElementById("winner");

    if (curentPlayer === playerOne) {
        getWinnerElement.classList.add("red_text");
    } else {
        getWinnerElement.classList.add("blue_text");
    }
    getWinnerElement.innerText = curentPlayer + " wins!";
    modal.classList.add("open");
}

modal.classList.remove("open");

start.addEventListener("click", function () {
    location.reload();
});