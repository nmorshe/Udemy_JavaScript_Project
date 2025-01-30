// cost
// tip
// numberOfPeople
// pay

const allFieldsEntered = (cost, tip, numberOfPeople) => {
    const hasCostValue = cost.value.length > 0;
    const hasTipValue = tip.value.length > 0;
    const hasNumberOfPeopleValue = numberOfPeople.value.length > 0;

    return hasCostValue && hasTipValue && hasNumberOfPeopleValue;
}

const setSplitAmount = (cost, tip, numberOfPeople) => {
    const c = parseFloat(cost.value);
    const t = parseFloat(tip.value) / 100;
    const n = parseFloat(numberOfPeople.value);
    const total = (c + c * t) / n;

    const pay = getByID("pay");
    pay.innerText = "$" + total.toFixed(2);
}

const cost = getByID("cost");
const tip = getByID("tip");
const numberOfPeople = getByID("numberOfPeople");

const valueOfCost = cost.value;

const calculateTip = () => {
    const cost = getByID("cost");
    const tip = getByID("tip");
    const numberOfPeople = getByID("numberOfPeople");

    const hasAllFields = allFieldsEntered(cost, tip, numberOfPeople);

    if (hasAllFields) {
        setSplitAmount(cost, tip, numberOfPeople);
    }

}