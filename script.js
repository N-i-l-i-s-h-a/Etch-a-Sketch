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
    isErasing = false;
    isDrawing = false;
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
    isErasing = false;
    const colorIn = document.querySelector("#col");
    let colorCh = colorIn.value;   
    colorIn.addEventListener('change', (e) => colorCh = e.target.value);
    const bigGrid = document.querySelector(".canvas");
    bigGrid.addEventListener('mousedown', () => isDrawing = true);
    bigGrid.addEventListener('mouseup', () => isDrawing = false);
    bigGrid.addEventListener('mouseleave', () => isDrawing = false);
    const smallGrids = document.querySelectorAll(".small"); 
    smallGrids.forEach(smallGrid => 
        {   
            smallGrid.addEventListener('mouseenter', function(){
                if(isDrawing){
                    smallGrid.classList.add("small");
                    smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                    smallGrid.style.backgroundColor =  `${colorCh}`;
            }});
            smallGrid.addEventListener('click', function(){
                smallGrid.classList.add("small");
                smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                smallGrid.style.backgroundColor =  `${colorCh}`;
            });
        }            
    );       
}

//in order to generate a random number between 0 to 255
function randomNum(){
    return Math.floor(Math.random() * 1000) % 400;
}

//this is called after the rainbow btn is clicked, it is similar to draw() but its value of selected color keeps changing
function randomColor(){
    const sq = (document.querySelector("#slide")).value;
    const dim = 496 / sq;
    const rnb = document.querySelector(".Rainbow");
    rnb.classList.add("selected");
    const bigGrid = document.querySelector(".canvas");
    bigGrid.addEventListener('mousedown', () => isDrawing = true);
    bigGrid.addEventListener('mouseup', () => isDrawing = false);
    const smallGrids = document.querySelectorAll(".small"); 
    smallGrids.forEach(smallGrid => 
        {   
            smallGrid.addEventListener('mouseenter', function(){
                if(isDrawing){
                    smallGrid.classList.add("small");
                    smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                    smallGrid.style.backgroundColor =  `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
            }});
            smallGrid.addEventListener('click', function(){
                smallGrid.classList.add("small");
                smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                smallGrid.style.backgroundColor =  `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
            });
        }            
    ); 
    const colorIn = document.querySelector("#col");
    colorIn.addEventListener('click', function(){
        isDrawing = false;
        draw(dim);
        rnb.classList.remove("selected");
    });
    const rst = document.querySelector(".Clear");
    rst.addEventListener('click', function(){
        rnb.classList.remove("selected");
    });
    const ers = document.querySelector(".Eraser");
    ers.addEventListener('click', function(){
        rnb.classList.remove("selected");
    });
}

//this function is triggered after the eraser button is clicked, it is similar to draw() but it uses a different state variable(isDrawing)
function eraser(){
    isDrawing = false;
    const ers = document.querySelector(".Eraser");
    ers.classList.add("selected");
    const sq = (document.querySelector("#slide")).value;
    const dim = 496 / sq;
    const bigGrid = document.querySelector(".canvas");
    let bgcol = bigGrid.style.backgroundColor;
    bigGrid.addEventListener('mousedown', () => isErasing = true);
    bigGrid.addEventListener('mouseup', () => isErasing = false);
    bigGrid.addEventListener('mouseleave', () => isErasing = false);
    const smallGrids = document.querySelectorAll(".small"); 
    smallGrids.forEach(smallGrid => 
        {   
            smallGrid.addEventListener('mouseenter', function(){
                if(isErasing){
                    smallGrid.classList.add("small");
                    smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                    smallGrid.style.backgroundColor =  `${bgcol}`;
            }});
            smallGrid.addEventListener('click', function(){
                smallGrid.classList.add("small");
                smallGrid.style.cssText = `width: ${dim}px; height: ${dim}px;`
                smallGrid.style.backgroundColor =  `${bgcol}`;
            });
        }            
    ); 
    const colorIn = document.querySelector("#col");
    colorIn.addEventListener('click', function(){
        ers.classList.remove("selected");
        draw(dim);
    });
    const rst = document.querySelector(".Clear");
    rst.addEventListener('click', function(){
        ers.classList.remove("selected");
    });
    const rnb = document.querySelector(".Rainbow");
    rnb.addEventListener('click', function(){
        ers.classList.remove("selected");
    });
}