let random = null;

let initialCount = 0;

let goHome = false;

let canClick = true;

const wamKey = "whakAMoleScore";

let whakAMoleScore;

const whakAMoleText = {
    intro: "Whak the mole to score! Click to play.",
    endText: "You have scored X"
}

const whacPositions = [
    "topOne",
    "topTwo",
    "topThree",
    "middleOne",
    "middleTwo",
    "middleThree",
    "bottomOne",
    "bottomTwo",
    "bottomThree"
];

/**
 * Causes a red flash effect in a given square.
 * @param {any} className: Name of the position of the square.
 */
const flashRed = className => {
    const square = document.querySelector(`.whacAMole.${className}`);
    square.classList.add('hitMole');

    setTimeout(() => {
        square.classList.remove('hitMole');
    }, 300);
}

/**Changes the position of the mole through randomized integers.*/
const changeMolePosition = () => {
    const mole = document.querySelector(".whacAMole.mole");
    mole.classList.remove("mole");
    const randomIndex = Math.floor(Math.random() * whacPositions.length);
    const newMolePosition = whacPositions[randomIndex];
    document.querySelector(`.whacAMole.${newMolePosition}`).classList.add("mole");
}

/**Increments count of whacks.*/
const increamentWhacCount = () => {
    const currentCount = parseInt(getByID("whacAMoleCount").innerText);
    getByID("whacAMoleCount").innerText = currentCount + 1;   //Original val: +3
}

/**
 * Performs operations required if a mole is successfully hit.
 * 
 * Helper functions: increamentWhacCount(), flashRed()
 * 
 * @param {any} className: Name of the location of the square.
 */
const whacMole = className => {
    const hitMole = document.querySelector(
        `.whacAMole.${className}`
    ).classList.contains("mole");
    if (hitMole) {
        increamentWhacCount();
        flashRed(className);
    }
}

/**Sets the main pattern for the randomization of mole locations.
 * 
 * Helper functions: changeMolePosition().
 */
const randomizeMole = () => {
    changeMolePosition();
    random = setInterval( () => {
    changeMolePosition();
}, 1000);
}

const whacAMoleMenuStart = () => {
    toggleAttribute(getByID("whakAMoleHome"), "nodisplay");

    const whacAMoleDirections = getByID("whacAMoleDirections");
    toggleAttribute(whacAMoleDirections, "nodisplay");
    whacAMoleDirections.innerText = whakAMoleText.intro;
}

const resetwhacAMoleGame = () => {
    const whacAMoleDirections = getByID("whacAMoleDirections");

    toggleAttribute(whacAMoleDirections, "nodisplay");
    toggleAttribute(whacAMoleDirections, "opacity");

    whacAMoleDirections.innerText = whakAMoleText.endText.replace(
        "X",
        getByID("whacAMoleCount").innerText
    );

    clearInterval(random);
    canClick = false;
    setTimeout(() => {
        getByID("whacAMoleCount").innerText = 10;

        toggleAttribute(whacAMoleDirections, "opacity");
        toggleAttribute(whacAMoleDirections, "nodisplay");

        const whacAMoleBoard = getByID("whacAMoleBoard");
        toggleAttribute(whacAMoleBoard, "nodisplay");

        const whakAMoleHome = getByID("whakAMoleHome");
        toggleAttribute(whakAMoleHome, "nodisplay");

        canClick = true;
    }, 4000);
}

const startTimer = () => {
    getByID("whacAMoleCountDown").innerText = 20;
    let check = setInterval(() => {
        const seconds = parseInt(getByID("whacAMoleCountDown").innerText);
        const count = seconds - 1;
        if (count === 0) {
            clearInterval(check);
            resetwhacAMoleGame();
            setWhakAMoleHighScoreIfHigher();
        } else {
            getByID("whacAMoleCountDown").innerText = count;
        }
    }, 1000);
}

const whacAMoleStart = () => {
    if (canClick) {
        const whacAMoleDirections = getByID("whacAMoleDirections");
        toggleAttribute(whacAMoleDirections, "nodisplay");
    }

    const whacAMoleBoard = getByID("whacAMoleBoard");
    toggleAttribute(whacAMoleBoard, "nodisplay");

    randomizeMole();
    startTimer();
    getByID("whacAMoleCount").innerText = initialCount;

}

const setWhakAMoleHighScoreIfHigher = () => {
    const score = parseInt(getByID("whacAMoleCount").innerText);
    if (score > whakAMoleScore) {
        setWhakAMoleHighScore(score);
    }
}

const setWhakAMoleHighScore = score => {
    whakAMoleScore = localStorage.getItem(wamKey);
    if (!whakAMoleScore) {
        localStorage.setItem(wamKey, 0);
    }
    if (score) {
        localStorage.setItem(wamKey, score);
    }
    whakAMoleScore = parseInt(localStorage.getItem(wamKey));
    getByID("whakamoleScore").innerText = whakAMoleScore;
}

setWhakAMoleHighScore();
