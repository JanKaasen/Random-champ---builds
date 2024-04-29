'use strict';

// TODO:
//JSON file containing runes, items, champions, and summoner spells
// Make sure support items are only given when world atlas and when support role
// Smite item only given when smite && jungle
//Randomizing script
//Buttons: randomize
//Import data from the json file
const randomButton = document.getElementById('randomizeBtn');
// TODO: Refactor code
//Make a single randomize index function
//

// Roles
let selectedRole = null;
fetch('roles.json')
  .then(response => response.json())
  .then(data => {
    const rolesContainer = document.querySelector('.roles-container');
    const roles = data.roles;
    roles.forEach(role => {
      const image = document.createElement('img');
      image.src = role.iconInactive;
      image.alt = role.name;
      image.className = 'role-icon';
      image.dataset.active = role.iconActive;
      image.dataset.inactive = role.iconInactive;
      image.dataset.role = role.name;
      rolesContainer.appendChild(image);
    });

    rolesContainer.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('role-icon')) {
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
  .catch(error => console.error('Error loading icons:', error));

// RANDOMIZE RUNES
const randomizeRunes = () => {
  fetch('Runes.json')
    .then(response => response.json())
    .then(data => {
      const runeTrees = [
        'Precision',
        'Domination',
        'Sorcery',
        'Resolve',
        'Inspiration',
      ];
      const randomTreeIndex = Math.floor(Math.random() * runeTrees.length);
      const treeType = runeTrees[randomTreeIndex];
      const runeTree = data[runeTrees[randomTreeIndex]];
      const randomizeKeystone = () => {
        const keystoneDiv = document.getElementById('rune1');
        const keystones = runeTree.filter(rune => rune.type === 'Keystone');
        const keystoneIndex = Math.floor(Math.random() * keystones.length);
        const randomKeystone = keystones[keystoneIndex];
        keystoneDiv.style.backgroundImage = `url(${randomKeystone.icon})`;
      };
      const randomizeMinorRunes = () => {
        const minor1runes = runeTree.filter(rune => rune.type === 'Minor-1');
        const minor1Index = Math.floor(Math.random() * minor1runes.length);
        const randomMinor1 = minor1runes[minor1Index];
        rune2.style.backgroundImage = `url(${randomMinor1.icon})`;
        const minor2runes = runeTree.filter(rune => rune.type === 'Minor-2');
        const minor2Index = Math.floor(Math.random() * minor2runes.length);
        const randomMinor2 = minor2runes[minor2Index];
        rune3.style.backgroundImage = `url(${randomMinor2.icon})`;
        const minor3runes = runeTree.filter(rune => rune.type === 'Minor-3');
        const minor3Index = Math.floor(Math.random() * minor3runes.length);
        const randomMinor3 = minor3runes[minor3Index];
        rune4.style.backgroundImage = `url(${randomMinor3.icon})`;
      };
      const randomizeSecondaryTree = () => {
        const secondaryTrees = runeTrees.filter(tree => tree !== treeType);
        const secondaryIndex = Math.floor(
          Math.random() * secondaryTrees.length
        );
        const secondaryTree = data[secondaryTrees[secondaryIndex]];
        const secondaryTreeNoKeystones = secondaryTree.filter(
          runes => runes.type !== 'Keystone'
        );
        const secondaryRune1 =
          secondaryTreeNoKeystones[
            Math.floor(Math.random() * secondaryTreeNoKeystones.length)
          ];
        const secondaryRuneTree2 = secondaryTreeNoKeystones.filter(
          runes => runes.type !== secondaryRune1.type
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
        const statShard1 = data['statShard1'];
        const statShard2 = data['statShard2'];
        const statShard3 = data['statShard3'];
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
      randomizeKeystone();
      randomizeMinorRunes();
      randomizeSecondaryTree();
      randomizeStatShards();
    });
};
const randomizeChampions = () => {
  const championImageBox = document.getElementById('championImage');
  fetch('champion_summary.json')
    .then(response => response.json())
    .then(data => {
      const championList = data['champion_list'];
      const randomIndex = Math.floor(Math.random() * championList.length);
      const randomizedChampion = championList[randomIndex];
      championImageBox.innerHTML = `<img src="${randomizedChampion.image}" alt = "${randomizedChampion.name}">`;
    })
    .catch(error =>
      console.error(`Error fetching from champions_summary`, error)
    );
};

const randomizeSpells = () => {
  fetch('summoner_spells.json')
    .then(response => response.json())
    .then(data => {
      const spellList = data['summoner_spells'];
      let usedSpells = [];

      const randomizeSpell = () => {
        for (let i = 0; i < 2; i++) {
          const availableSpells = spellList.filter(
            spell => !usedSpells.includes(spell)
          );
          const randomIndex = Math.floor(
            Math.random() * availableSpells.length
          );
          const randomSpell = availableSpells[randomIndex];
          usedSpells.push(randomSpell);
          document.getElementById(
            `summonerSpell${i + 1}`
          ).innerHTML = `<img src="${randomSpell.icon}" alt="${randomSpell.name}">`;
        }
        if (selectedRole.alt === 'Jungle') {
          document.getElementById(
            'summonerSpell2'
          ).innerHTML = `<img src="${spellList[7].icon}" alt="${spellList[7]}.name">`;
        }
      };
      randomizeSpell();
    })
    .catch(error => console.error('Error fetching summoner spells', error));
};

//TODO: CLEAN UP
const randomizeItems = () => {
  const item1 = document.getElementById('item1');
  const item2 = document.getElementById('item2');
  fetch('items.json')
    .then(response => response.json())
    .then(data => {
      // Randomize items
      const randomizeLegendaryItems = () => {
        let tearItemSelected = false;
        let itemsList = data['legendaryItems'];
        const selectedItems = [];
        for (let i = 0; i < 5; i++) {
          let availableItems = itemsList.filter(
            item => !selectedItems.includes(item)
          );
          if (tearItemSelected === true) {
            availableItems = availableItems.filter(
              item => item.requires !== 'Tear'
            );
          }
          const randomItemIndex = Math.floor(
            Math.random() * availableItems.length
          );
          const randomItem = availableItems[randomItemIndex];
          if (randomItem.requires === 'Tear') {
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
        const bootsList = data['boots'];
        const randomBootIndex = Math.floor(Math.random() * bootsList.length);
        const randomBoots = bootsList[randomBootIndex];
        item1.innerHTML = `<img src = "${randomBoots.image}" alt="${randomBoots.name}">`;
      };

      // Checks if role is support, gives support item in slot 1
      const randomizeSupportItem = () => {
        if (selectedRole.alt === 'Support') {
          const supportItemList = data['supportItems'];
          const randomSupportIndex = Math.floor(
            Math.random() * supportItemList.length
          );
          const randomSupportItem = supportItemList[randomSupportIndex];
          item2.innerHTML = `<img src ="${randomSupportItem.image}" alt="${randomSupportItem.name}">`;
        }
      };

      // CALL ON THE RANDOMIZE FUNCTIONS
      randomizeLegendaryItems();
      randomizeBoots();
      randomizeSupportItem();
    })
    .catch(error => console.error('Error fetching items:', error));
};

const randomizeAll = () => {
  randomizeSpells();
  randomizeChampions();
  randomizeItems();
  randomizeRunes();
};

randomButton.addEventListener('click', () => {
  if (selectedRole === null) {
    alert('Please select a role');
  } else {
    randomizeAll();
  }
});
