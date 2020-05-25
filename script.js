async function getDataFromAPI() {
    let response = await fetch("https://api.hh.ru/metro/1");
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;

};

async function randomStation() {
    let data = await getDataFromAPI();
    console.log(data);
    // Temporarily only 3, change later
    let numberOfLine = Math.floor(Math.random() * (data.lines.length));
    // let numberOfLine = Math.floor(Math.random() * 3);
    let randomLine = data.lines[numberOfLine];
    let numberOfStation = Math.floor(Math.random() * (randomLine.stations.length));
    console.log("random station = ", randomLine.stations[numberOfStation]);
    trueHex = data.lines[numberOfLine].hex_color;
    // document.querySelector("#station-name").innerHTML = randomLine.stations[numberOfStation].name.replace("ё", "е");
    document.querySelector("#station-name").innerHTML = "Савеловская";
};

async function onClickAction() {
    let data = await getDataFromAPI();
    const result = data.lines[this.value].stations.filter(station => {
        return station.name.replace("ё", "е") == document.querySelector("#station-name").innerHTML;
    });
    if (result.length > 0) {
        document.documentElement.style.setProperty('--main-color', `#${trueHex}`);
        points++;
        document.querySelector("#points").innerHTML = points;
        document.querySelector("#try-again").innerHTML = "Молодец!";
        newGame();
    } else {
        document.querySelector("#try-again").innerHTML = "Попробуй еще";
    }
};

randomStation();
const answers = document.querySelectorAll(".answer");
answers.forEach((button) => {
    button.addEventListener("click", onClickAction);
});
let points = 0;


function newGame() {
    randomStation();
};
