const offscreen = "offscreen";

const toggleAttribute = (elem, attr, val = "") => {
    const hasAttr = elem.hasAttribute(attr);

    if (hasAttr) {
        elem.removeAttribute(attr);
    }

    else {
        elem.setAttribute(attr, val);
    }
}

const getByID = (id) => {
    const elem = document.getElementById(id);
    return elem;
}

/**
 * Returns a random char from a given string.
 * 
 * @param {any} string: String variable
 * @returns Random char from string.
 */
const getRandomCharFromString = (string) => {
    const index = Math.floor(Math.random() * string.length);
    return string[index];
}

/**
 * Gets random element from array.
 * 
 * @param {any} array: Array of elements to choose from.
 * @returns: Random element from array.
 */
const getRandomIndexFromArray = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const removeAttr = (elem, attr) => {
    elem.removeAttribute(attr);
}

const setAttr = (elem, attr, val = "") => {
    elem.setAttribute(attr, val);
}

const addClass = (elem, className) => {
    elem.classList.add(className);
}

const removeClass = (elem, className) => {
    elem.classList.remove(className);
}

const hideElemByID = (id) => {
    addClass(getByID(id), "displayNone");
}

const showElemByID = (id) => {
    removeClass(getByID(id), "displayNone");
}