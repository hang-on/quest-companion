class Unit {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.quality = data.quality;
        this.defense = data.defense;
        this.toughness = data.toughness;
        this.unit_size = data.unit_size || 1;
        this.abilities = data.abilities || [];
        this.melee_attack = data.melee_attack;
        this.ranged_attack = data.ranged_attack || null;
        this.wounds = 0; // Additional property not found in the JSON data
    }

    // Example method to display unit information
    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Quality: ${this.quality}`);
        console.log(`Defense: ${this.defense}`);
        console.log(`Toughness: ${this.toughness}`);
        console.log(`Unit Size: ${this.unit_size}`);
        console.log(`Abilities: ${this.abilities.join(', ')}`);
        console.log(`Melee Attack: ${JSON.stringify(this.melee_attack)}`);
        if (this.ranged_attack) {
            console.log(`Ranged Attack: ${JSON.stringify(this.ranged_attack)}`);
        }
        console.log(`Wounds: ${this.wounds}`);
    }

    // Method to get formatted information
    getFormattedInfo() {
        let info = `
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Quality:</strong> ${this.quality}</p>
            <p><strong>Defense:</strong> ${this.defense}</p>
            <p><strong>Toughness:</strong> ${this.toughness}</p>
            <p><strong>Unit Size:</strong> ${this.unit_size}</p>
            <p><strong>Abilities:</strong> ${this.abilities.join(', ')}</p>
            <p><strong>Melee Attack:</strong> ${JSON.stringify(this.melee_attack)}</p>
        `;
        if (this.ranged_attack) {
            info += `<p><strong>Ranged Attack:</strong> ${JSON.stringify(this.ranged_attack)}</p>`;
        }
        info += `<p><strong>Wounds:</strong> ${this.wounds}</p>`;
        return info;
    }
}

class Hero extends Unit {
    constructor(data) {
        super(data);
        this.unit_size = 1; // Always set unit size to 1 for heroes
        this.endurance = data.endurance;
        this.strength = data.strength;
        this.dexterity = data.dexterity;
        this.willpower = data.willpower;
        this.impaired = false; // Additional properties for heroes
        this.diseased = false;
        this.afflicted = false;
        this.crippled = false;
        this.stress = 0;
        this.bleeding = 0;
    }

    // Example method to display hero information
    displayInfo() {
        super.displayInfo();
        console.log(`Endurance: ${this.endurance}`);
        console.log(`Strength: ${this.strength}`);
        console.log(`Dexterity: ${this.dexterity}`);
        console.log(`Willpower: ${this.willpower}`);
        console.log(`Impaired: ${this.impaired}`);
        console.log(`Diseased: ${this.diseased}`);
        console.log(`Afflicted: ${this.afflicted}`);
        console.log(`Crippled: ${this.crippled}`);
        console.log(`Stress: ${this.stress}`);
        console.log(`Bleeding: ${this.bleeding}`);
    }

    // Method to get formatted information
    getFormattedInfo() {
        let info = super.getFormattedInfo();
        info += `
            <p><strong>Endurance:</strong> ${this.endurance}</p>
            <p><strong>Strength:</strong> ${this.strength}</p>
            <p><strong>Dexterity:</strong> ${this.dexterity}</p>
            <p><strong>Willpower:</strong> ${this.willpower}</p>
            <p><strong>Impaired:</strong> ${this.impaired}</p>
            <p><strong>Diseased:</strong> ${this.diseased}</p>
            <p><strong>Afflicted:</strong> ${this.afflicted}</p>
            <p><strong>Crippled:</strong> ${this.crippled}</p>
            <p><strong>Stress:</strong> ${this.stress}</p>
            <p><strong>Bleeding:</strong> ${this.bleeding}</p>
        `;
        return info;
    }
}

class Enemy extends Unit {
    constructor(data) {
        super(data);
        this.behavior = data.behavior || 'default';
    }

    // Example method to display enemy information
    displayInfo() {
        super.displayInfo();
        console.log(`Behavior: ${this.behavior}`);
    }

    // Method to get formatted information
    getFormattedInfo() {
        let info = super.getFormattedInfo();
        info += `<p><strong>Behavior:</strong> ${this.behavior}</p>`;
        return info;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Full Screen Web App Loaded');

    const activeHeroes = [];

    fetch('data/enemies.json')
        .then(response => response.json())
        .then(data => {
            console.log('Enemies:', data);
            const enemies = data.enemies.map(enemyData => new Enemy(enemyData));
            enemies.forEach(enemy => enemy.displayInfo());
        })
        .catch(error => console.error('Error loading enemy data:', error));

    fetch('data/heroes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Heroes:', data);
            const heroes = data.heroes.map(heroData => new Hero(heroData));
            heroes.forEach(hero => {
                if (hero.name === "Helen von Drachmarr") {
                    activeHeroes.push(hero);
                    document.getElementById('element-hero').dataset.heroId = hero.id;
                }
                hero.displayInfo();
            });
        })
        .catch(error => console.error('Error loading hero data:', error));

    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        draggable.addEventListener('click', (e) => {
            const heroId = e.target.dataset.heroId;
            const hero = activeHeroes.find(h => h.id == heroId);
            if (hero) {
                document.querySelector('.information').innerHTML = hero.getFormattedInfo();
            }
        });
    });

    const elementsSection = document.querySelector('.elements');

    elementsSection.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    elementsSection.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        const dropTarget = e.target;

        if (dropTarget.classList.contains('draggable') && dropTarget.id !== draggable.id) {
            handleElementDrop(draggable, dropTarget);
        } else {
            elementsSection.appendChild(draggable);
        }
    });

    function handleElementDrop(draggable, dropTarget) {
        console.log(`Dropped ${draggable.id} onto ${dropTarget.id}`);
        // Placeholder function to handle specific drop logic
    }
});