//when the complete DOM is loaded, event listener is added to place 16*16 smaller grids inside the bigger grid
document.addEventListener("DOMContentLoaded", function(){
    const bigGrid = document.querySelector(".grid");
    const squares = 16 * 16;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        smallGrid.classList.add("small16");
        bigGrid.appendChild(smallGrid);
    }
});

function createGrid(){
    const range = document.querySelector("#slider");
    const num = range.value;
    const bigGrid = document.querySelector(".grid");
    const squares = num * num;
    const dim = 496 / num;
    const slider = document.querySelector(".size");
    slider.innerText = `${num} x ${num}`;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        small.style.width = `${dim}px`;
        small.style.height = `${dim}px`;
        smallGrid.classList.add("smallGrid");
        bigGrid.appendChild(smallGrid);
    }
}