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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Full Screen Web App Loaded');

    fetch('data/enemies.json')
        .then(response => response.json())
        .then(data => {
            console.log('Enemies:', data);
            const enemies = data.enemies.map(enemyData => new Unit(enemyData));
            enemies.forEach(enemy => enemy.displayInfo());
        })
        .catch(error => console.error('Error loading enemy data:', error));

    fetch('data/heroes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Heroes:', data);
            const heroes = data.heroes.map(heroData => new Unit(heroData));
            heroes.forEach(hero => hero.displayInfo());
        })
        .catch(error => console.error('Error loading hero data:', error));

    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
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