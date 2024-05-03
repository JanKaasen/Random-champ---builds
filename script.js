"use strict";

const randomButton = document.getElementById("randomizeBtn");
const fetchData = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.error(`Error fetching data from ${url}`));
};
// Roles
let selectedRole = null;
fetchData("./JSONfiles/roles.json")
  .then((data) => {
    const rolesContainer = document.querySelector(".roles-container");
    const roles = data.roles;
    roles.forEach((role) => {
      const image = document.createElement("img");
      image.src = role.iconInactive;
      image.alt = role.name;
      image.className = "role-icon";
      image.dataset.active = role.iconActive;
      image.dataset.inactive = role.iconInactive;
      image.dataset.role = role.name;
      rolesContainer.appendChild(image);
    });

    rolesContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("role-icon")) {
        if (selectedRole && selectedRole !== target) {
          selectedRole.src = selectedRole.dataset.inactive;
        }
        target.src =
          target.src === target.dataset.inactive
            ? target.dataset.active
            : target.dataset.inactive;
        selectedRole = target.src === target.dataset.active ? target : null;
      }
    });
  })
  .catch((error) => console.error("Error loading icons:", error));

// RANDOMIZE RUNES
const randomizeRunes = () => {
  fetchData("./JSONfiles/Runes.json").then((data) => {
    const runeTrees = [
      "Precision",
      "Domination",
      "Sorcery",
      "Resolve",
      "Inspiration",
    ];
    const randomTreeIndex = Math.floor(Math.random() * runeTrees.length);
    const treeType = runeTrees[randomTreeIndex];
    const runeTree = data[runeTrees[randomTreeIndex]];
    const randomizeRune = (type, targetElement) => {
      const runeType = runeTree.filter((rune) => rune.type === type);
      const randomIndex = Math.floor(Math.random() * runeType.length);
      const randomRune = runeType[randomIndex];
      targetElement.style.backgroundImage = `url(${randomRune.icon})`;
    };

    const randomizePrimaryTree = () => {
      randomizeRune("Keystone", rune1);
      randomizeRune("Minor-1", rune2);
      randomizeRune("Minor-2", rune3);
      randomizeRune("Minor-3", rune4);
    };
    const randomizeSecondaryTree = () => {
      const secondaryTrees = runeTrees.filter((tree) => tree !== treeType);
      const secondaryIndex = Math.floor(Math.random() * secondaryTrees.length);
      const secondaryTree = data[secondaryTrees[secondaryIndex]];
      const secondaryTreeNoKeystones = secondaryTree.filter(
        (runes) => runes.type !== "Keystone"
      );
      const secondaryRune1 =
        secondaryTreeNoKeystones[
          Math.floor(Math.random() * secondaryTreeNoKeystones.length)
        ];
      const secondaryRuneTree2 = secondaryTreeNoKeystones.filter(
        (runes) => runes.type !== secondaryRune1.type
      );
      const secondaryRune2 =
        secondaryRuneTree2[
          Math.floor(Math.random() * secondaryRuneTree2.length)
        ];
      rune5.style.backgroundImage = `url(${secondaryRune1.icon})`;
      rune6.style.backgroundImage = `url(${secondaryRune2.icon})`;
    };
    const randomizeStatShards = () => {
      let randomIndexes = [];
      const statShard1 = data["statShard1"];
      const statShard2 = data["statShard2"];
      const statShard3 = data["statShard3"];
      for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * statShard1.length);
        randomIndexes.push(randomNumber);
      }
      const randomShard1 = statShard1[randomIndexes[0]];
      const randomShard2 = statShard2[randomIndexes[1]];
      const randomShard3 = statShard3[randomIndexes[2]];
      rune7.style.backgroundImage = `url(${randomShard1.icon})`;
      rune8.style.backgroundImage = `url(${randomShard2.icon})`;
      rune9.style.backgroundImage = `url(${randomShard3.icon})`;
    };
    randomizePrimaryTree();
    randomizeSecondaryTree();
    randomizeStatShards();
  });
};
const randomizeChampions = () => {
  const championImageBox = document.getElementById("championImage");
  fetchData("./JSONfiles/champion_summary.json")
    .then((data) => {
      const championList = data["champion_list"];
      const randomIndex = Math.floor(Math.random() * championList.length);
      const randomizedChampion = championList[randomIndex];
      championImageBox.innerHTML = `<img src="${randomizedChampion.image}" alt = "${randomizedChampion.name}">`;
    })
    .catch((error) =>
      console.error(`Error fetching from champions_summary`, error)
    );
};

const randomizeSpells = () => {
  fetchData("./JSONfiles/summoner_spells.json")
    .then((data) => {
      const spellList = data["summoner_spells"];
      let usedSpells = [];

      const randomizeSpell = () => {
        for (let i = 0; i < 2; i++) {
          let availableSpells = spellList.filter(
            (spell) => !usedSpells.includes(spell)
          );
          if (selectedRole.alt === "Jungle") {
            availableSpells = spellList.filter(
              (spell) => spell.name !== "Smite"
            );
          }
          const randomIndex = Math.floor(
            Math.random() * availableSpells.length
          );
          const randomSpell = availableSpells[randomIndex];
          usedSpells.push(randomSpell);
          document.getElementById(
            `summonerSpell${i + 1}`
          ).innerHTML = `<img src="${randomSpell.icon}" alt="${randomSpell.name}">`;
        }
        if (selectedRole.alt === "Jungle") {
          document.getElementById(
            "summonerSpell2"
          ).innerHTML = `<img src="${spellList[7].icon}" alt="${spellList[7]}.name">`;
        }
      };
      randomizeSpell();
    })
    .catch((error) => console.error("Error fetching summoner spells", error));
};

const randomizeItems = () => {
  const item1 = document.getElementById("item1");
  const item2 = document.getElementById("item2");
  fetchData("./JSONfiles/items.json")
    .then((data) => {
      // Randomize items
      const randomizeLegendaryItems = () => {
        let tearItemSelected = false;
        let itemsList = data["legendaryItems"];
        const selectedItems = [];
        for (let i = 0; i < 5; i++) {
          let availableItems = itemsList.filter(
            (item) => !selectedItems.includes(item)
          );
          if (tearItemSelected === true) {
            availableItems = availableItems.filter(
              (item) => item.requires !== "Tear"
            );
          }
          const randomItemIndex = Math.floor(
            Math.random() * availableItems.length
          );
          const randomItem = availableItems[randomItemIndex];
          if (randomItem.requires === "Tear") {
            tearItemSelected = true;
          }
          selectedItems.push(randomItem);
          document.getElementById(
            `item${i + 2}`
          ).innerHTML = `<img src="${randomItem.image}" alt="${randomItem.name}">`;
        }
      };

      // Randomize Boots
      const randomizeBoots = () => {
        const bootsList = data["boots"];
        const randomBootIndex = Math.floor(Math.random() * bootsList.length);
        const randomBoots = bootsList[randomBootIndex];
        item1.innerHTML = `<img src = "${randomBoots.image}" alt="${randomBoots.name}">`;
      };

      // Checks if role is support, gives support item in slot 1
      const randomizeSupportItem = () => {
        if (selectedRole.alt === "Support") {
          const supportItemList = data["supportItems"];
          const randomSupportIndex = Math.floor(
            Math.random() * supportItemList.length
          );
          const randomSupportItem = supportItemList[randomSupportIndex];
          item2.innerHTML = `<img src ="${randomSupportItem.image}" alt="${randomSupportItem.name}">`;
        }
      };

      const randomizeStarterItem = () => {
        const startingItems = data["startingItems"];
        const laneStarters = startingItems.filter(
          (items) => items.requires !== "smite" && items.requires !== "support"
        );
        const worldAtlas = startingItems[8];
        const randomStarterIndex = Math.floor(
          Math.random() * laneStarters.length
        );
        const randomStarterItem = laneStarters[randomStarterIndex];
        itemStarter.innerHTML = `<img src="${randomStarterItem.image}" alt="${randomStarterItem.name}">`;

        if (selectedRole.alt === "Jungle") {
          const jungleItems = startingItems.filter(
            (items) => items.requires === "smite"
          );
          const randomJungleItem =
            jungleItems[Math.floor(Math.random() * jungleItems.length)];

          itemStarter.innerHTML = `<img src="${randomJungleItem.image}" alt="${randomJungleItem}">`;
        }

        if (selectedRole.alt === "Support") {
          itemStarter.innerHTML = `<img src="${worldAtlas.image}" alt="${worldAtlas.name}">`;
        }
      };
      // CALL ON THE RANDOMIZE FUNCTIONS
      randomizeLegendaryItems();
      randomizeBoots();
      randomizeSupportItem();
      randomizeStarterItem();
    })
    .catch((error) => console.error("Error fetching items:", error));
};

const randomizeAll = () => {
  randomizeSpells();
  randomizeChampions();
  randomizeItems();
  randomizeRunes();
};

randomButton.addEventListener("click", () => {
  if (selectedRole === null) {
    alert("Please select a role");
  } else {
    randomizeAll();
  }
});
