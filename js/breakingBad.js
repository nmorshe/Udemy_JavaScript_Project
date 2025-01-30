const getQuote = () => {
    const { author, quote } = getRandomIndexFromArray(quotes);

    getByID("quoteText").innerText = quote;
    getByID("breakingBadAuthor").innerText = author;
}

getQuote();