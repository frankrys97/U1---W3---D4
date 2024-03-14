const mainButton = document.getElementById("mainButton");
const downButton = document.getElementById("downButton");
const mainTable = document.getElementById("numbers");
const tablesDiv = document.getElementById("tables");
let mainTableNumbers;
let personalTablesNumbers;

const createMainBoard = function () {
  for (let i = 0; i < 90; i++) {
    let number = document.createElement("div");
    number.textContent = i + 1;
    number.classList.add("numBoard");
    mainTable.appendChild(number);
  }
  mainTableNumbers = document.querySelectorAll("#numbers .numBoard");
};

createMainBoard();

const generateRandomNumbers = () => {
  const numbers = [];
  while (numbers.length < 24) {
    const randomNumber = Math.floor(Math.random() * 90) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const createTable = (numRows) => {
  for (let i = 0; i < numRows; i++) {
    const table = document.createElement("div");
    table.classList.add("table");
    const numbers = generateRandomNumbers();
    numbers.forEach((number) => {
      const cell = document.createElement("div");
      cell.textContent = number;
      cell.classList.add("numBoard2");
      table.appendChild(cell);
    });
    tablesDiv.appendChild(table);
  }
  personalTablesNumbers = document.querySelectorAll(".numBoard2");
};

mainButton.addEventListener("click", () => {
  const numTables = parseInt(document.getElementById("creation").value);
  if (numTables > 0) {
    document.getElementById("personalTables").style.display = "block";
    extractedNumbers = [];

    // Rimuove la classe numBoard-extracted da tutti gli elementi del tabellone principale
    mainTableNumbers.forEach((number) => {
      number.classList.remove("numBoard-extracted");
    });
    tablesDiv.innerHTML = "";

    createTable(numTables);
  } else {
    alert("Inserisci un numero valido.");
  }
});

let extractedNumbers = [];

const extractNumber = () => {
  let randomNumber = Math.floor(Math.random() * 90) + 1;

  while (extractedNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 90) + 1;
  }

  extractedNumbers.push(randomNumber);
  updateNumbers(randomNumber);
};

const updateNumbers = (extractedNumber) => {
  mainTableNumbers.forEach((number) => {
    if (parseInt(number.textContent) === extractedNumber) {
      number.classList.add("numBoard-extracted");
    }
  });

  personalTablesNumbers.forEach((number) => {
    if (parseInt(number.textContent) === extractedNumber) {
      number.classList.add("numBoard2-extracted");
    }
  });
};

downButton.addEventListener("click", () => {
  extractNumber();
});
