const mg_nodisplay = "nodisplay";

const mgStrings = {
    mgDirections: "mgDirections",
    mgHomeScreen: "mgHomeScreen",
    mgBoard: "mgBoard",
    memoryHighlight: "memoryHighlight",
    cpuClick: "cpuClick",
    mgHighScore: "mgHighScore"
}

const mgCPUOptions = ["mgTopLeft", "mgTopRight", "mgBottomLeft", "mgBottomRight"];

let cpuMoves = [];

let isCPUMove = true;

/**
 * Sets the high score of the game based on the inputted parameter to show on-screen.
 * Defaults to 0 if no score is present.
 * 
 * @param {any} score: Parameter to set the high score.
 */
const setHighScore = (score) => {
    const highScore = localStorage.getItem(mgStrings.mgHighScore);

    if (score) {
        localStorage.setItem(mgStrings.mgHighScore, score);
    }

    else if (!highScore) {
        localStorage.setItem(mgStrings.mgHighScore, 0);
    }

    getByID(mgStrings.mgHighScore).innerText = localStorage.getItem(mgStrings.mgHighScore);
}

setHighScore();

/**Shows the directions on how to lay upon starting the game.*/
const showMGDirections = () => {
    removeAttr(getByID(mgStrings.mgDirections), mg_nodisplay);
    setAttr(getByID(mgStrings.mgHomeScreen), mg_nodisplay);
    
}

/**
 * Blinks one of the squares blue to indicate the CPU's choice in the memory game.
 * 
 * @param {any} move: Choice made by CPU.
 */
const highlightCPUMove = (move) => {
    addClass(getByID(move), mgStrings.cpuClick);
    setTimeout(() => {
        removeClass(getByID(move), mgStrings.cpuClick);
    }, 500);
}

/**Selects the choices the CPU makes during the game in a random order.*/
const cpuMove = () => {
    const move = getRandomIndexFromArray(mgCPUOptions);
    cpuMoves.push(move);
    let delay = 0;

    cpuMoves.forEach(box => {
        setTimeout(() => {
            highlightCPUMove(box);
        }, delay);

        delay += 1000;
    });

    setTimeout(() => {
        isCPUMove = false;
    }, delay - 1000);

}

/**Starts the game after removing the instructions.*/
const memoryGameStart = () => {

    setAttr(getByID(mgStrings.mgDirections), mg_nodisplay);
    removeAttr(getByID(mgStrings.mgBoard), mg_nodisplay);

    setTimeout(cpuMove(), 1000);
}

/**
 * Adds a highlight effect to the square based on mouse hover.
 * @param {any} id: ID of the targeted square
 */
const addHighlight = (id) => {
    addClass(getByID(id), mgStrings.memoryHighlight);
}

/**
 * Removes highlight effect on square based on mouse hover.
 * @param {any} id: ID of the targeted square
 */
const removeHighlight = (id) => {
    removeClass(getByID(id), mgStrings.memoryHighlight);
}

let clickIndex = 0;

/**Sets Game Over and resets everything if player loses.*/
const gameOver = () => {
    console.log("game over");
    setAttr(getByID(mgStrings.mgBoard), mg_nodisplay);
    removeAttr(getByID(mgStrings.mgHomeScreen), mg_nodisplay);
    clickIndex = 0;
    cpuMoves = [];
    isCPUMove = true;
    getByID("mgCount").innerText = 0;
}

/**Increments the score whenever the player clicks the correct pattern.*/
const incrementGuesses = () => {
    const mgCount = getByID("mgCount");
    const currNum = parseInt(mgCount.innerText);
    mgCount.innerText = currNum + 1;
    const highScore = localStorage.getItem(mgStrings.mgHighScore);

    if (highScore < (currNum + 1)) {
        setHighScore(currNum + 1);
    }
}

/**
 * Inputs ability for player to make guesses and the consequences of doing so.
 * 
 * @param {any} id
 * @returns
 */
const makeMemoryGuess = id => {

    if (isCPUMove) {
        return;
    }
    
    if (id === cpuMoves[clickIndex]) {
        console.log("correct move");
        clickIndex++;

        if (clickIndex === cpuMoves.length) {
            clickIndex = 0;

            setTimeout(cpuMove(), 1000);
            incrementGuesses();
        }
    } 
    
    else {
        gameOver();

    }
}