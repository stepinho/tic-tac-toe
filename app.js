const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round
let board
configuration();
const combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function configuration() {
    round = 1;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
}

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;
    check();
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = 'Winner: Circle';
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = 'Winner: Cross';
        }
    });

    if (winner !== null) {
        alert(winner);
    }
}
function reset() {
    boxes = document.getElementsByClassName("box");
    for (box of boxes) {
        box.classList.remove("fa-circle-o");
        box.classList.remove("fa-times");
    };
    configuration();
}