const board = document.querySelector(".board");

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");

        if ((i + j) % 2 === 0) square.classList.add("white");
        else square.classList.add("black");

        square.classList.add("square");
        board.appendChild(square);

        square.dataset.row = i;
        square.dataset.col = j;

        square.addEventListener("click", (e) => {
            let row = Number(e.target.dataset.row);
            let col = Number(e.target.dataset.col);

            console.log([row, col]);
        });
    }
}
