// dailyMemoDay
// dailyMemoDateNumber

// dailyInspirationalQuote
// https://type.fit/api/quotes

const url ="https://dummyjson.com/quotes";

const getInspirationalQuote = () => {
    fetch(url).then(data => {

        data.json().then(data => {

            const randQuote = getRandomIndexFromArray(data.quotes);
            getByID("dailyInspirationalQuote").innerText = randQuote.quote;

        }).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
}

const setQuoteDate = () => {
    dailyMemoDay = getByID("dailyMemoDay");
    dailyMemoDateNumber = getByID("dailyMemoDateNumber");

    const date = new Date();
    const dateString = date.toDateString();
    const dateArray = dateString.split(" ");

    dailyMemoDay.innerText = `${dateArray[0]} ${dateArray[1]}`;
    dailyMemoDateNumber.innerText = dateArray[2];
}

setQuoteDate();
getInspirationalQuote();