document.addEventListener('DOMContentLoaded', () => {
    console.log('Full Screen Web App Loaded');

    fetch('data/enemies.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // You can now use the enemy data in your app
        })
        .catch(error => console.error('Error loading enemy data:', error));

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