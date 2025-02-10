document.addEventListener('DOMContentLoaded', () => {

    fetch('data/enemies.json')
        .then(response => response.json())
        .then(data => {
            console.log('Enemies:', data);
            // You can now use the enemy data in your app
        })
        .catch(error => console.error('Error loading enemy data:', error));

    fetch('data/heroes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Heroes:', data);
            // You can now use the hero data in your app
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