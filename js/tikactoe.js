let isCpuTurn = false;

let tttScore;

const tttKey = "ticTacToeScore";

const hasX = id => {
    return getByID(id).classList.contains("x");
}

const hasO = id => {
    return getByID(id).classList.contains("o");
}

const hasXorO = id => {
    return (hasO(id) || hasX(id));
}

const getScoringId = array => {
    for (let i = 0; i < array.length; i++) {

        const arr = array[i];

        if (arr[0] && arr[1] && arr[2]) {
            return arr[3];
        }
    }
}

const getXScoringChances = () => {
    const combinations = [

        //Straight lines horizontal
        [!hasXorO(1), hasX(2), hasX(3), 1],
        [hasX(1), !hasXorO(2), hasX(3), 2],
        [hasX(1), hasX(2), !hasXorO(3), 3],

        [!hasXorO(4), hasX(5), hasX(6), 4],
        [hasX(4), !hasXorO(5), hasX(6), 5],
        [hasX(4), hasX(5), !hasXorO(6), 6],

        [!hasXorO(7), hasX(8), hasX(9), 7],
        [hasX(7), !hasXorO(8), hasX(9), 8],
        [hasX(7), hasX(8), !hasXorO(9), 9],

        //Straight lines vertical
        [!hasXorO(1), hasX(4), hasX(7), 1],
        [hasX(1), !hasXorO(4), hasX(7), 4],
        [hasX(1), hasX(4), !hasXorO(7), 7],

        [!hasXorO(2), hasX(5), hasX(8), 2],
        [hasX(2), !hasXorO(5), hasX(8), 5],
        [hasX(2), hasX(5), !hasXorO(8), 8],

        [!hasXorO(3), hasX(6), hasX(9), 3],
        [hasX(3), !hasXorO(6), hasX(9), 6],
        [hasX(3), hasX(6), !hasXorO(9), 9],

        //Diagonal lines
        [!hasXorO(1), hasX(5), hasX(9), 1],
        [hasX(1), !hasXorO(5), hasX(9), 5],
        [hasX(1), hasX(5), !hasXorO(9), 9],

        [!hasXorO(3), hasX(5), hasX(7), 3],
        [hasX(3), !hasXorO(5), hasX(7), 5],
        [hasX(3), hasX(5), !hasXorO(7), 7]
    ];

    return combinations;
}

const hasXScored = () => {
    const combinations = [
        //Straight lines horizontal
        [hasX(1), hasX(2), hasX(3)],
        [hasX(4), hasX(5), hasX(6)],
        [hasX(7), hasX(8), hasX(9)],

        //Straight lines vertical
        [hasX(1), hasX(4), hasX(7)],
        [hasX(2), hasX(5), hasX(8)],
        [hasX(3), hasX(6), hasX(9)],

        //Diagonal lines
        [hasX(1), hasX(5), hasX(9)],
        [hasX(3), hasX(5), hasX(7)]
    ];

    for (let x = 0; x < combinations.length; x++) {
        const data = combinations[x];

        if (data[0] && data[1] && data[2]) {
            return true;
        }
    }

    return false;
}

const getOScoringChances = () => {
    const combinations = [

        //Straight lines horizontal
        [!hasXorO(1), hasO(2), hasO(3), 1],
        [hasO(1), !hasXorO(2), hasO(3), 2],
        [hasO(1), hasO(2), !hasXorO(3), 3],

        [!hasXorO(4), hasO(5), hasO(6), 4],
        [hasO(4), !hasXorO(5), hasO(6), 5],
        [hasO(4), hasO(5), !hasXorO(6), 6],

        [!hasXorO(7), hasO(8), hasO(9), 7],
        [hasO(7), !hasXorO(8), hasO(9), 8],
        [hasO(7), hasO(8), !hasXorO(9), 9],

        //Straight lines vertical
        [!hasXorO(1), hasO(4), hasO(7), 1],
        [hasO(1), !hasXorO(4), hasO(7), 4],
        [hasO(1), hasO(4), !hasXorO(7), 7],

        [!hasXorO(2), hasO(5), hasO(8), 2],
        [hasO(2), !hasXorO(5), hasO(8), 5],
        [hasO(2), hasO(5), !hasXorO(8), 8],

        [!hasXorO(3), hasO(6), hasO(9), 3],
        [hasO(3), !hasXorO(6), hasO(9), 6],
        [hasO(3), hasO(6), !hasXorO(9), 9],

        //Diagonal lines
        [!hasXorO(1), hasO(5), hasO(9), 1],
        [hasO(1), !hasXorO(5), hasO(9), 5],
        [hasO(1), hasO(5), !hasXorO(9), 9],

        [!hasXorO(3), hasO(5), hasO(7), 3],
        [hasO(3), !hasXorO(5), hasO(7), 5],
        [hasO(3), hasO(5), !hasXorO(7), 7]
    ];

    return combinations;
}

const allBoxesTaken = () => {
    const combinations = [
        hasXorO(1),
        hasXorO(2),
        hasXorO(3),
        hasXorO(4),
        hasXorO(5),
        hasXorO(6),
        hasXorO(7),
        hasXorO(8),
        hasXorO(9)
    ];

    return !combinations.includes(false);
}

const getRandomBox = () => {
    const openSquares = [];
    for (let i = 1; i < 10; i++) {
        if (!hasXorO(i)) {
            openSquares.push(i);
        }
    }
    const index = Math.floor(Math.random() * openSquares.length);
    return openSquares[index];
}

const resetGame = () => {
    isCpuTurn = false;
    toggleAttribute(getByID("tikTacToeHome"), "nodisplay");
    toggleAttribute(getByID("tikTacToeBoard"), "nodisplay");
    const allSquares = document.getElementsByClassName("tictactoe");
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].classList.remove("x");
        allSquares[i].classList.remove("o");
    }
}

const makeCpuSelection = square => {
    isCpuTurn = false;
    getByID(square).classList.add("o");
}

tttScore = {
    wins: 0, losses: 0
}

const playerScore = ply => {
    isCpuTurn = false;

    if (ply === "ply") {
        tttScore.wins = tttScore.wins + 1;
    }

    else if (ply === "cpu") {
        tttScore.losses = tttScore.losses + 1;
    }

    setTicTacToeScore(tttScore);
    setTimeout(() => {
        resetGame();
    }, 2000);
}

const makeComputerMove = () => {
    const cpuScoreId = getScoringId(getOScoringChances());
    const plyScoreId = getScoringId(getXScoringChances());
    if (cpuScoreId) {
        makeCpuSelection(`${cpuScoreId}`);
        playerScore("cpu");
    } else if (plyScoreId) {
        makeCpuSelection(`${plyScoreId}`);
    } else {
        makeCpuSelection(getRandomBox());
    }
}

const selectSquare = id => {
    if (!isCpuTurn && !hasXorO(id)) {
        getByID(id).classList.add("x");
        if (hasXScored()) {
            playerScore("ply");
        } else if (allBoxesTaken()) {
            setTimeout(() => {
                resetGame();
            }, 2000);
        } else {
            isCpuTurn = true;
            setTimeout(() => {
                makeComputerMove();
            }, 1000);
        }
    }
}

const showDirections = () => {
    const gameDirections = getByID("gameDirections");
    toggleAttribute(gameDirections, "nodisplay");
    const tikTacToeHome = getByID("tikTacToeHome");
    toggleAttribute(tikTacToeHome, "nodisplay");
}

const startGame = () => {
    const gameDirections = getByID("gameDirections");
    toggleAttribute(gameDirections, "nodisplay");
    const tikTacToeBoard = getByID("tikTacToeBoard");
    toggleAttribute(tikTacToeBoard, "nodisplay");
}

const setTicTacToeScore = score => {
    const ticTacToeScore = localStorage.getItem(tttKey);
    if (!ticTacToeScore) {
        localStorage.setItem(tttKey, JSON.stringify({ wins: 0, losses: 0 }));
    }
    if (score) {
        localStorage.setItem(tttKey, JSON.stringify(score));
    }
    tttScore = JSON.parse(localStorage.getItem(tttKey));
    getByID("tictactoeScore").innerText = `${tttScore.wins}/${tttScore.losses}`;
}

setTicTacToeScore();