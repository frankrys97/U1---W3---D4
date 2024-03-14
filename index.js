const mainButton = document.getElementById("mainButton");
const downButton = document.getElementById("downButton");
const mainTable = document.getElementById("numbers");
const tablesDiv = document.getElementById("tables");
let mainTableNumbers;
let personalTablesNumbers;

// Per prima cosa ho creato una funzione che mi permettesse di creare tanti div quanti sono
// i numeri della tombola, attraverso un ciclo for

const createMainBoard = function () {
  for (let i = 0; i < 90; i++) {
    let number = document.createElement("div");
    number.textContent = i + 1;
    number.classList.add("numBoard");
    mainTable.appendChild(number);
  }
  mainTableNumbers = document.querySelectorAll("#numbers .numBoard");
};

createMainBoard(); // Qui ho chiamato la funzione in modo da far comparire il tabellone

// Successivamente ho creato una funzione con il ciclo while che mi permettesse di generare 24
// numeri casuali da 1 a 90 in modo da poterla utilizzare successivamente al click del bottone
// mainButton
const generateRandomNumbers = () => {
  const numbers = [];
  while (numbers.length < 24) {
    const randomNumber = Math.floor(Math.random() * 90) + 1;
    if (!numbers.includes(randomNumber)) {
      // Con questo condizione ho messo che se il numero
      // fosse già presente nell'array creato allora non si doveva aggiungere alla lista di
      // 24 numeri casuali
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

// Successivamente ho creato la funzione che accettasse come paramentro un numero
// che poi sarebbe il valore che andremo ad inserire nel nostro input
const createTable = (numRows) => {
  for (let i = 0; i < numRows; i++) {
    // Dicendo di crare un div con classe table pari al numero inserito come parametro
    const table = document.createElement("div");
    table.classList.add("table");
    // Ho posto la variabile numbers con un valore pari all'array che si creava quando chiamavo
    // la funzione generateRandomNumbers
    const numbers = generateRandomNumbers();
    // Su questo array vado a creare un div per ogni elemento al suo interno,
    // che ha una classe numBoard2 e che andiamo ad inserire all'interno del div che avevo
    // creato con la funzione soprastante
    numbers.forEach((number) => {
      const cell = document.createElement("div");
      cell.textContent = number;
      cell.classList.add("numBoard2");
      table.appendChild(cell);
    });

    // Questo div creato sono andato poi ad inserirlo all'interno del div in html dopo il downbutton
    tablesDiv.appendChild(table);
  }
  personalTablesNumbers = document.querySelectorAll(".numBoard2");
};

// Adesso andiamo ad implementare la funzione relativa all'evento del click del primo button
mainButton.addEventListener("click", () => {
  const numTables = parseInt(document.getElementById("creation").value);
  // Poniamo il valore dell'input, trasformato in numero, come valore di una variabile
  if (numTables > 0) {
    // Se questa è maggiore di 0 al click allora mi tira fuori il div con le
    // cartelle casuali
    document.getElementById("personalTables").style.display = "block"; // Qui invece
    // diciamo che il personalTables escono solo se il valore è maggiore di 0

    // Grazie alla funzione qui sotto sono riuscito a "resettare" il tabellone principale dicendo
    // che per ongi div con la classe .numBoard (mainTableNumbers), andiamo a rimuovere la classe
    // dei numeri estratti
    mainTableNumbers.forEach((number) => { // mainTableNumbers è una NodeList
      number.classList.remove("numBoard-extracted");
    });
    tablesDiv.innerHTML = "";

    createTable(numTables); // Qui richiamo la funzione per creare le nostre cartelle
    // dandogli come valore il numero inserito all'interno dell'input
  } else {
    alert("Inserisci un numero valido.");
  }
});

let extractedNumbers = [];

// Con questa funzione utilizzo un ciclo while per generare un numero casuale unico nel senso che
// il ciclo va avanti finchè il numero estratto è all'interno dell'array di riferimento
  const extractNumber = () => {
    let randomNumber = Math.floor(Math.random() * 90) + 1;
  
    while (extractedNumbers.includes(randomNumber)) { // Finchè è incluso nei numeri estratti
      // allora vai avanti
      randomNumber = Math.floor(Math.random() * 90) + 1;
    }
  
    extractedNumbers.push(randomNumber);
    updateNumbers(randomNumber);
  };

// updateNumbers è una funzione che mi permette di capire se prendendo come parametro
// extractedNumber ovvero un array di numeri, per ognuno di questi,
// se è uguale al numero estratto allora mi aggiunge una classe
const updateNumbers = (extractedNumber) => {
  mainTableNumbers.forEach((number) => {
    if (parseInt(number.textContent) === extractedNumber) {
      number.classList.add("numBoard-extracted");
    }
  });
  // Stesso discorso di prima solo che lo applica al secondo div
  personalTablesNumbers.forEach((number) => { // personalTablesNumbers è una NodeList
    if (parseInt(number.textContent) === extractedNumber) {
      number.classList.add("numBoard2-extracted");
    }
  });
};
// Infine chiamiamo la funzione di estrazione al click del bottone di estrazione
// con tutte le relative condizioni
downButton.addEventListener("click", () => {
  extractNumber();
});
