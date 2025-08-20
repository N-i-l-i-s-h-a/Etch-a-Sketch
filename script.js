//when the complete DOM is loaded, event listener places 16*16 smaller grids inside the bigger grid
document.addEventListener('DOMContentLoaded', function(){
    const bigGrid = document.querySelector(".canvas");
    const squares = 16 * 16;
    for(let i = 1; i <= squares; i++){
        const smallGrid = document.createElement("div");
        smallGrid.classList.add("small");
        bigGrid.appendChild(smallGrid);
    }
    return draw(31);
});

//after erase button is clicked, the state isErasing is set true
let isErasing = false;

//global state that determines when the mouseenter event triggers coloring
let isDrawing = false;

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
        smallGrid.classList.add("small");
        smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
        bigGrid.appendChild(smallGrid);
    }
    return draw(dim);
}

//draw function that colors small grids either when the mousedown event occurs or when the mouse hovers over the small grids after some grid was dblclicked somewhere 
function draw(dim){
    const colorIn = document.querySelector("#col");
    let colorCh = colorIn.value;   
    colorIn.addEventListener('change', (e) => colorCh = e.target.value);
    const bigGrid = document.querySelector(".canvas");
    bigGrid.addEventListener('mousedown', () => isDrawing = true);
    bigGrid.addEventListener('mouseleave', () => isDrawing = false);
    document.addEventListener('mouseup', () => isDrawing = false);
    const smallGrids = document.querySelectorAll(".small"); 
    smallGrids.forEach(smallGrid => 
        {   
            smallGrid.addEventListener('mouseenter', function(){
                if(isDrawing){
                    smallGrid.classList.add("small");
                    smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                    smallGrid.style.backgroundColor =  `${colorCh}`;
            }});
            smallGrid.addEventListener('mousedown', function(){
                smallGrid.classList.add("small");
                smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                smallGrid.style.backgroundColor =  `${colorCh}`;
            });
        }            
    );       
}


function eraser(){
    const sq = (document.querySelector("#slide")).value;
    const dim = 496 / sq;
    const bigGrid = document.querySelector(".canvas");
    let bgcol = bigGrid.style.backgroundColor;
    bigGrid.addEventListener('mousedown', () => isErasing = true);
    bigGrid.addEventListener('mouseleave', () => isErasing = false);
    bigGrid.addEventListener('mouseup', () => isErasing = false);
    const smallGrids = document.querySelectorAll(".small"); 
    smallGrids.forEach(smallGrid => 
        {   
            smallGrid.addEventListener('mouseenter', function(){
                if(isErasing){
                    smallGrid.classList.add("small");
                    smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                    smallGrid.style.backgroundColor =  `${bgcol}`;
            }});
            smallGrid.addEventListener('mousedown', function(){
                smallGrid.classList.add("small");
                smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                smallGrid.style.backgroundColor =  `${bgcol}`;
            });
        }            
    ); 
    const colorIn = document.querySelector("#col");
    colorIn.addEventListener('click', function(){
        isErasing = false;
        draw(dim);
    });
}