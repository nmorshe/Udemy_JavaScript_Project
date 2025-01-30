
const jokeUrl = "https://icanhazdadjoke.com/";

const data = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
    }
    
}

const getNewJoke = () => {
    fetch(jokeUrl, data).then(d => {

        d.json().then(data => {
            getByID("jokeText").innerText = data.joke;
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));
}

getNewJoke();