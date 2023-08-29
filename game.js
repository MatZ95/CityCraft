const buildings = [
  {
    name: "Ratusz",
    status: "Dostępny",
    cost: { food: 50, wood: 30 },
    level: 1,
  },
  {
    name: "Pola uprawne",
    status: "Dostępny",
    cost: { food: 100, wood: 20, clay: 10 },
    level: 1,
  },
  { name: "Las", status: "Dostępny", cost: { wood: 50 }, level: 1 },
  {
    name: "Kamieniołom",
    status: "Dostępny",
    cost: { food: 10, stone: 20 },
    level: 1,
  },
];
const gameContainer = document.getElementById("game-container");
const buildingList = document.getElementById("building-list");

// Iterujesz przez dostępne budynki i tworzysz przyciski oraz ich funkcjonalności
buildings.forEach((building) => {
  const buildingItem = document.createElement("div");
  buildingItem.classList.add("building-item");

  const buildingName = document.createElement("span");
  buildingName.textContent = `${building.name} (Poziom ${building.level})`;
  buildingItem.appendChild(buildingName);

  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = building.level > 1 ? "Ulepsz" : "Zbuduj";

  if (building.level > 1) {
    upgradeButton.title = `Koszt rozbudowy: ${building.cost.food} jedzenia, ${
      building.cost.wood
    } drewna, ${building.cost.stone} kamienia, ${
      building.cost.clay ? building.cost.clay : 0
    } gliny`;
  } else {
    upgradeButton.title = `Koszt budowy: ${building.cost.food} jedzenia, ${
      building.cost.wood
    } drewna, ${building.cost.stone} kamienia, ${
      building.cost.clay ? building.cost.clay : 0
    } gliny`;
  }

  // Obsługa kliknięcia przycisku "Ulepsz" lub "Zbuduj"
  upgradeButton.addEventListener("click", () => {
    handleBuild(building); // Wywołanie funkcji obsługującej budowę budynku
  });

  buildingItem.appendChild(upgradeButton);
  buildingList.appendChild(buildingItem);
});

// Deklaracja zmiennych dotyczących zasobów
let food = 100; // Ilość jedzenia
let wood = 50; // Ilość drewna
let stone = 30; // Ilość kamienia
let clay = 20; // Ilość gliny

// Funkcja obsługująca wybór budynku przez gracza
function selectBuilding(building) {
  console.log(`Wybrano budynek: ${building.name}`);
  // Dodaj tutaj logikę obsługi wyboru budynku
}

// Obsługa kliknięcia przycisku "Buduj"
gameContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("available-building-button")) {
    const selectedBuildingName = event.target.dataset.buildingName;
    const selectedBuilding = buildings.find(
      (building) => building.name === selectedBuildingName
    );
    handleBuild(selectedBuilding); // Wywołanie funkcji obsługującej budowę budynku
  }
});

// Funkcja obsługująca budowę budynku
function handleBuild(selectedBuilding) {
  if (
    food >= selectedBuilding.cost.food &&
    wood >= selectedBuilding.cost.wood &&
    stone >= selectedBuilding.cost.stone &&
    (!selectedBuilding.cost.clay || clay >= selectedBuilding.cost.clay)
  ) {
    console.log(`Budujesz budynek: ${selectedBuilding.name}`);
    // Dodać tutaj logikę budowy budynku

    // Zmniejszasz ilość zasobów o koszt budowy
    food -= selectedBuilding.cost.food;
    wood -= selectedBuilding.cost.wood;
    stone -= selectedBuilding.cost.stone;
    if (selectedBuilding.cost.clay) {
      clay -= selectedBuilding.cost.clay;
    }

    // Tutaj możesz zaktualizować wyświetlanie ilości zasobów w interfejsie
  } else {
    console.log("Nie masz wystarczającej ilości zasobów!");
  }
}

// Tutaj dodajesz funkcję aktualizującą informacje o zasobach i produkcji
function updateResourceInfo() {
  const resourceInfo = document.createElement("div");
  resourceInfo.classList.add("resource-info");
  resourceInfo.innerHTML = `
    <p>Zasoby: Jedzenie - ${food}, Drewno - ${wood}, Kamień - ${stone}, Glina - ${clay}</p>
    <p>Produkcja: Jedzenie - 0, Drewno - 0, Kamień - 0, Glina - 0</p>
  `;
  gameContainer.insertBefore(resourceInfo, buildingList);
}

// Wywołanie funkcji aktualizującej informacje o zasobach
updateResourceInfo();
