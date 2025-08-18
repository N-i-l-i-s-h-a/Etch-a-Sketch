//when the complete DOM is loaded, event listener places 16*16 smaller grids inside the bigger grid
document.addEventListener("DOMContentLoaded", function(){
    const bigGrid = document.querySelector(".canvas");
    const squares = 16 * 16;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        smallGrid.classList.add("small16");
        bigGrid.appendChild(smallGrid);
    }
});

//when input[type = range] is changed, the squares inside canvas change and the changed size is displayed
function createGrid(){
    const range = document.querySelector("#slide");
    const bigGrid = document.querySelector(".canvas");
    const slider = document.querySelector(".size");
    const num = range.value;
    const squares = num * num;
    const dim = 496 / num;
    bigGrid.innerText = "";
    slider.innerText = `${num} x ${num}`;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        smallGrid.classList.add("small16");
        smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
        bigGrid.appendChild(smallGrid);
    }
}
