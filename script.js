const board = document.querySelector(".board");

function removeBorder(){
    document.querySelectorAll(".square").forEach(sq => {
        sq.classList.remove("selected");
    });
}

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");

        if ((i + j) % 2 === 0) square.classList.add("black");
        else square.classList.add("white");

        square.classList.add("square");
        board.appendChild(square);

        square.dataset.row = i;
        square.dataset.col = j;

        const circle = document.createElement("div");

        // square.addEventListener("click", (e) => {
        //     let row = Number(e.target.dataset.row);
        //     let col = Number(e.target.dataset.col);

        // console.log([i,j]);
        // console.log(boardState[i,j]);
        // });
    }
}


const boardState = Array(8).fill(null).map(() => Array(8).fill(null));

// #_______________________________________________________________#
// #_______________________________________________________________#

// filling black side pieces
boardState[0] = [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" }
]

boardState[1] = Array(8).fill(null).map(() => ({ type: "pawn", color: "black" }));

// filling white side pieces
boardState[6] = Array(8).fill(null).map(() => ({ type: "pawn", color: "white" }));

boardState[7] = [
    { type: "rook", color: "white" },
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" }
]

// #_______________________________________________________________#
// #_______________________________________________________________#

function getSymbol(piece) {
    const symbols = {
        pawn: "P",
        rook: "R",
        knight: "KN",
        bishop: "B",
        queen: "Q",
        king: "K"
    };

    return piece.color === "white" ? symbols[piece.type] : symbols[piece.type].toLowerCase();
}

function renderBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        let row = Number(square.dataset.row);
        let col = Number(square.dataset.col);

        let piece = boardState[row][col];
        square.textContent = "";
        
        if (piece) {
            square.textContent = getSymbol(piece);
        }
    })
}

renderBoard();

let selected = null; let selectedPiece = null;
board.addEventListener("click", (e) => {
    if (!e.target.classList.contains("square")) return;
    
    let row = Number(e.target.dataset.row);
    let col = Number(e.target.dataset.col);

    if(selected && selected.row === row && selected.col === col){
        selected = null;
        removeBorder();
        return;
    };
    
    if (!selected) {
        if (!boardState[row][col]) return;
        selected = { row, col };
        e.target.classList.add("selected");
        selectedPiece = boardState[row][col];
        return;
    }

    selectedPiece = selected ? boardState[selected.row][selected.col] : null;

    let toPiece = boardState[row][col], fromPiece = selectedPiece;
    if(toPiece && fromPiece && toPiece.color === fromPiece.color) return; // prevents black from killing black and vica versa
    
    


    let from = selected;
    let to = {row, col};

    
    boardState[to.row][to.col] = boardState[from.row][from.col];
    boardState[from.row][from.col] = null;
    selected = null;

    removeBorder();
    
    console.log([row, col]);
    console.log(boardState[row][col]);

    renderBoard();
});
