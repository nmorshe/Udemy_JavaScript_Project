const displayNone = "displayNone";

const meditationStrings = {
    meditationStart: "meditationStart",
    meditationDirections: "meditationDirections",
    breatheIn: "breatheIn",
    breatheOut: "breatheOut"
};

const showBreatheIn = () => {
    getByID(meditationStrings.breatheIn).classList.remove(displayNone);
    getByID(meditationStrings.breatheOut).classList.add(displayNone);
}

const showBreatheOut = () => {
    getByID(meditationStrings.breatheIn).classList.add(displayNone);
    getByID(meditationStrings.breatheOut).classList.remove(displayNone);
}

const resetMeditation = () => {
    getByID(meditationStrings.breatheOut).classList.add(displayNone);
    getByID(meditationStrings.meditationStart).classList.remove(displayNone);

}

const showArrows = () => {
    showBreatheIn();
    setTimeout(() => {
        showBreatheOut();
    }, 3000);
}

const startMeditation = () => {
    let delay = 0;

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            showArrows();
        }, delay);

        delay += 6000;
    }

    setTimeout(() => {
        resetMeditation();
    }, delay);
}

const meditationStartBtn = () => {
    getByID(meditationStrings.meditationStart).classList.add(displayNone);
    getByID(meditationStrings.meditationDirections).classList.remove(displayNone);
}

const meditationStart = () => {
    getByID(meditationStrings.meditationDirections).classList.add(displayNone);
    startMeditation();
}

