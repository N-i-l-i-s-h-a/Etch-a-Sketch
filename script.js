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
    const range = document.querySelector("#slide");
    const bigGrid = document.querySelector(".grid");
    const slider = document.querySelector(".size");
    const num = range.value;
    const squares = num * num;
    const dim = 496 / num;
    bigGrid.innerText = "";
    slider.innerText = `${num} x ${num}`;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px; box-sizing: border-box; padding: 0; margin: 0; background-color: transparent; border: 1px solid rgba(0, 0, 0, 0.701);`;
        bigGrid.appendChild(smallGrid);
    }
}