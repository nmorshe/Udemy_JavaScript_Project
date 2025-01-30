const settingsStrings = {
    mgReset: "mgReset",
    tttReset: "tttReset",
    wamReset: "wamReset"
}


const resetScores = () => {
    if (getByID(settingsStrings.mgReset).checked) {
        localStorage.removeItem("mgHighScore");
    }

    if (getByID(settingsStrings.tttReset).checked) {
        localStorage.removeItem("ticTacToeScore");
    }

    if (getByID(settingsStrings.wamReset).checked) {
        localStorage.removeItem("whakAMoleScore");
    }

    window.location.reload();
}