const colorPsychology = getByID("colorPsychology");

const setColorToWord = () => {
    for (let txt in colorMap) {
        const colorClass = colorMap[txt];

        const div = document.createElement("div");
        div.classList.add("btn");
        div.classList.add(colorClass);
        div.innerText = txt;

        colorPsychology.appendChild(div);
    }
}

setColorToWord();