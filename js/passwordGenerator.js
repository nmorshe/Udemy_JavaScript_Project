// upperCaseLetters
// lowerCaseLetters
// passwordNumbers
// specialCharacters

/**Strings used to generate passwords.*/
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "123456789";
const special = "!@#$%^&*()";

/**Strings containing IDs of the text elements of the options.*/
const upperLetters = "upperCaseLetters";
const lowerLetters = "lowerCaseLetters";
const passNums = "passwordNumbers";
const specialChars = "specialCharacters";

/**Strings containing IDs of the checkbox elements of the options.*/
const upperCheckId = "upperCaseLettersCheckbox";
const lowerCheckId = "lowerCaseLettersCheckbox";
const numCheckId = "passwordNumbersCheckbox";
const specialCheckId = "specialCharactersCheckbox";

/**
 * Gets all the text elements of the options of the generator from 
 * the HTML file through their IDs.
 * 
 * @returns: An object containing the IDs of the check
 */
const getAllFields = () => {
    return {
        upperCaseLetters: getByID(upperLetters),
        lowerCaseLetters: getByID(lowerLetters),
        passwordNumbers: getByID(passNums),
        specialCharacters: getByID(specialChars)
    }
}

/**
 * Sets up the text elements of the generator options (Upper case, lower case, etc.).
 * 
 * @param {any} fields: IDs of the options elements of the genrator.
 */
const setTextOfGenerator = (fields) => {

    for (let key in fields) {

        const element = fields[key];

        if (key === upperLetters) {
            element.innerText = upper;
        }

        else if (key === lowerLetters) {
            element.innerText = upper.toLowerCase();
        }

        else if (key === passNums) {
            element.innerText = nums;
        }

        else {
            element.innerText = special;
        }
    }
}

/**
 * Recursive method that continually calls on itself to generate
 * a randomized password >= 8 characters based on the parameters
 * given.
 * 
 * @param {any} array: Array of options indicating the type of each character.
 * @param {any} rc: Attribute meant to house the resulting password (recursively built upon).
 * @returns: A randomized password string.
 */
const getRandChars = (array, rc="") => {

    let randomChars = rc;

    array.forEach((data) => {

        let char = "";

        if (data === upperLetters) {
            char = getRandomCharFromString(upper);
        }

        else if (data === lowerLetters) {
            char = getRandomCharFromString(upper.toLowerCase());
        }

        else if (data === passNums) {
            char = getRandomCharFromString(nums);
        }

        else if (data === specialChars) {
            char = getRandomCharFromString(special);
        }

        randomChars += char;
        
    });

    if (randomChars.length < 8) {
        return getRandChars(array, randomChars);
    }

    else {
        return randomChars;
    }

}

/**Generates the password to display on-screen.
 * 
 * Helper methods:
 * 
 * getRandChars()
 * 
 */
const generatePassword = () => {

    const checkedBoxes = (getCheckedBoxes());
    const passwordBtn = getByID("passwordBtn");
    passwordBtn.innerText = getRandChars(checkedBoxes);

}

/**Copies the password created on-screen to the clipboard.*/
const copyPassword = () => {
    const passwordBtn = getByID("passwordBtn").innerText;

    navigator.clipboard.writeText(passwordBtn).then(() => {
        getByID("passwordBtn").innerText = "Copied!";
        setTimeout(() => {
            getByID("passwordBtn").innerText = passwordBtn;
        }, 2000);
    }).catch(err => {
        console.log(err);
    });
}

/**Returns an array of element IDs indicating the password options and order
 * of the characters.
 */
const getCheckedBoxes = () => {

    const upperCaseLettersCheckbox = getByID(upperCheckId);
    const lowerCaseLettersCheckbox = getByID(lowerCheckId);
    const passwordNumbersCheckbox = getByID(numCheckId);
    const specialCharactersCheckbox = getByID(specialCheckId);

    const upperCheck = upperCaseLettersCheckbox.checked;
    const lowerCheck = lowerCaseLettersCheckbox.checked;
    const passCheck = passwordNumbersCheckbox.checked;
    const specialCheck = specialCharactersCheckbox.checked;

    const allCheckedVals = [];

    if (upperCheck) {
        allCheckedVals.push(upperLetters);
    }

    if (lowerCheck) {
        allCheckedVals.push(lowerLetters);
    }

    if (passCheck) {
        allCheckedVals.push(passNums);
    }

    if (specialCheck) {
        allCheckedVals.push(specialChars);
    }

    return allCheckedVals;
}

/**Sets the options of the password generator.
 * 
 * Helper methods:
 * 
 * getAllFields(),
 * setTextOfGenerator()
 */
const setPWOptions = () => {
    const fields = getAllFields();
    setTextOfGenerator(fields);
}

setPWOptions();