const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let gameBoard = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(gameBoard[cellIndex] != "" || !running ){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for( const condition of winConditions){
        const cellA = gameBoard[condition[0]];
        const cellB = gameBoard[condition[1]];
        const cellC = gameBoard[condition[2]];

        if( cellA == "" || cellB == "" || cellC == "" ){
            continue;
        }
        if( cellA == cellB && cellB == cellC ){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    }
    else if( !(gameBoard.includes("")) ){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }

}

function restartGame() {
    gameBoard = ["","","","","","","","",""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    cells.forEach(cell => cell.textContent = "")
}

