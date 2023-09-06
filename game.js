// Obiekt zasobów na początku gry
const resources = {
  food: 100,
  wood: 50,
  stone: 30,
  clay: 20,
};

const buildings = [
  {
    name: "Ratusz",
    status: "Dostępny",
    cost: { food: 50, wood: 30 },
    level: 1,
    maxLevel: 25,
  },
  {
    name: "Pola uprawne",
    status: "Dostępny",
    cost: { food: 100, wood: 20, clay: 10 },
    level: 1,
    maxLevel: 25,
  },
  {
    name: "Las",
    status: "Dostępny",
    cost: { wood: 50 },
    level: 1,
    maxLevel: 25,
  },
  {
    name: "Kamieniołom",
    status: "Dostępny",
    cost: { food: 10, stone: 20 },
    level: 1,
    maxLevel: 25,
  },
];

const gameContainer = document.getElementById("game-container");
const buildingList = document.getElementById("building-list");

// Inicjalizacja elementu resourceInfo tylko raz
const resourceInfo = document.createElement("div");
resourceInfo.classList.add("resource-info");
gameContainer.insertBefore(resourceInfo, buildingList);

// Funkcja do aktualizowania informacji o zasobach
function updateResourceInfo() {
  // Aktualizuj zawartość elementu resourceInfo na podstawie obiektu resources
  resourceInfo.innerHTML = `
    <p>Zasoby: Jedzenie - ${resources.food}, Drewno - ${resources.wood}, Kamień - ${resources.stone}, Glina - ${resources.clay}</p>
    <p>Produkcja: Jedzenie - 0, Drewno - 0, Kamień - 0, Glina - 0</p>
  `;
}

// Wywołanie funkcji aktualizującej informacje o zasobach na początku gry
updateResourceInfo();

// Funkcja do aktualizacji poziomu budynku w opisie na liście budynków
function updateBuildingDescription(building) {
  // Aktualizuj nazwę budynku na liście budynków
  const buildingNameElement = buildingList.querySelector(
    `[data-building-name="${building.name}"]`
  );
  if (buildingNameElement) {
    // Sprawdź poziom budynku i ustaw odpowiednią etykietę
    if (building.level > 0) {
      buildingNameElement.textContent = `${building.name} (Poziom ${building.level})`;
    } else {
      buildingNameElement.textContent = `${building.name}`;
    }
  }
}
// Iterujesz przez dostępne budynki i tworzysz ich opisy
buildings.forEach((building) => {
  const buildingItem = document.createElement("div");
  buildingItem.classList.add("building-item");

  const buildingName = document.createElement("span");
  // Ustaw początkowy tekst z nazwą budynku i poziomem
  buildingName.textContent = `${building.name} (Poziom ${building.level})`;
  buildingItem.appendChild(buildingName);

  const upgradeButton = document.createElement("button");
  upgradeButton.classList.add("available-building-button"); // Dodaj klasę "available-building-button"
  upgradeButton.dataset.buildingName = building.name; // Dodaj atrybut data-building-name z nazwą budynku

  // Tworzenie tytułu przycisku tylko z surowcami o koszcie większym niż 0
  const costElements = [];

  if (building.cost.food > 0) {
    costElements.push(`${building.cost.food} jedzenia`);
  }
  if (building.cost.wood > 0) {
    costElements.push(`${building.cost.wood} drewna`);
  }
  if (building.cost.stone > 0) {
    costElements.push(`${building.cost.stone} kamienia`);
  }
  if (building.cost.clay > 0) {
    costElements.push(`${building.cost.clay} gliny`);
  }

  if (building.level > 0) {
    upgradeButton.textContent = "Ulepsz";
    upgradeButton.title = `Koszt ulepszenia: ${costElements.join(", ")}`;
  } else {
    upgradeButton.textContent = "Zbuduj";
    upgradeButton.title = `Koszt budowy: ${costElements.join(", ")}`;
  }

  // Obsługa kliknięcia przycisku "Ulepsz" lub "Zbuduj"
  upgradeButton.addEventListener("click", () => {
    handleBuildOrUpgrade(building); // Wywołanie funkcji obsługującej budowę lub ulepszanie budynku
  });

  buildingItem.appendChild(upgradeButton);
  buildingList.appendChild(buildingItem);
});

// Funkcja obsługująca budowę budynku lub ulepszanie budynku
function handleBuildOrUpgrade(selectedBuilding) {
  const resourcesNeeded = selectedBuilding.cost;

  // Sprawdź, czy masz wystarczająco zasobów
  let hasEnoughResources = true;
  for (const resource in resourcesNeeded) {
    if (resourcesNeeded.hasOwnProperty(resource)) {
      if (
        resourcesNeeded[resource] > 0 &&
        resourcesNeeded[resource] > resources[resource]
      ) {
        hasEnoughResources = false;
        break; // Przerwij pętlę, gdy brakuje jednego zasobu
      }
    }
  }

  if (hasEnoughResources) {
    if (selectedBuilding.level < selectedBuilding.maxLevel) {
      // Sprawdź, czy poziom budynku nie osiągnął maksymalnego poziomu
      selectedBuilding.level++; // Zwiększ poziom budynku o 1
      console.log(
        `Ulepszasz budynek: ${selectedBuilding.name} (Nowy poziom: ${selectedBuilding.level})`
      );
      // Dodać tutaj logikę ulepszania budynku, jeśli jest potrzebna
    } else {
      console.log(`Budujesz budynek: ${selectedBuilding.name}`);
      // Dodać tutaj logikę budowy budynku
    }

    // Odejmij koszty budowy lub ulepszenia od zasobów
    for (const resource in resourcesNeeded) {
      if (resourcesNeeded.hasOwnProperty(resource)) {
        if (resourcesNeeded[resource] > 0) {
          resources[resource] -= resourcesNeeded[resource];
        }
      }
    }

    // Aktualizuj informacje o zasobach po budowie lub ulepszeniu
    updateResourceInfo();
    // Aktualizuj opis budynku na liście budynków
    updateBuildingDescription(selectedBuilding);
  } else {
    console.log("Nie masz wystarczającej ilości zasobów!");
  }
}
