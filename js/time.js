

const addZeroIfLessThan10 = (num) => {
    if (num < 10) {
        return "0" + num;
    }

    else {
        return num;
    }
}

const getHr = () => {
    const time = new Date();
    let hr = time.getHours();

    if (hr > 12) {
        hr = hr - 12;
    }

    return hr;
}

const getMin = () => {
    const time = new Date();
    const min = time.getMinutes();
    return min;
}

const getSec = () => {
    const time = new Date();
    const sec = time.getSeconds();
    return sec;
}

const getTimeOfDay = () => {
    const time = new Date();
    const hr = time.getHours();
    let timeOfDay = "AM";

    if (hr > 11) {
        timeOfDay = "PM";
    }

    return timeOfDay;
}

const setHTML = (hour, minute, second, timeOfDay) => {
    const hr = getByID("hr");
    const min = getByID("min");
    const sec = getByID("sec");
    const dayTime = getByID("dayTime");

    hr.innerText = addZeroIfLessThan10(hour);
    min.innerText = addZeroIfLessThan10(minute);
    sec.innerText = addZeroIfLessThan10(second);
    dayTime.innerText = getTimeOfDay();
}

const setDate = () => {
    const hr = getHr();
    const min = getMin();
    const sec = getSec();

    setHTML(hr, min, sec);
}

setInterval(setDate, 1000);