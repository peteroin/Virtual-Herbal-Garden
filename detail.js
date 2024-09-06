document.addEventListener('DOMContentLoaded', () => {
    const plantId = new URLSearchParams(window.location.search).get('id');
    const plantDetailContent = document.getElementById('plant-detail-content');

    if (plantId) {
        const plant = fetchPlantDataById(plantId);

        if (plant) {
            displayPlantDetails(plant);
        } else {
            plantDetailContent.innerHTML = '<p class="error">Plant not found.</p>';
        }
    } else {
        plantDetailContent.innerHTML = '<p class="error">No plant ID provided.</p>';
    }
});

function fetchPlantDataById(id) {
    const storedPlants = localStorage.getItem('plants');
    const plants = storedPlants ? JSON.parse(storedPlants) : [];
    return plants.find(plant => plant.id === parseInt(id));
}

function displayPlantDetails(plant) {
    const plantDetailContent = document.getElementById('plant-detail-content');
    
    plantDetailContent.innerHTML = `
        <h2 class="plant-name">${plant.name}</h2>
        <p class="plant-scientific-name">${plant.scientificName}</p>
        
        <div class="plant-gallery">
            ${plant.images.map(image => `<img src="${image}" alt="${plant.name}" class="plant-image">`).join('')}
        </div>
        
        <div class="plant-info">
            <h3>Description</h3>
            <p class="plant-description">${plant.description}</p>
            
            <h3>Uses</h3>
            <ul class="plant-uses">
                ${plant.uses.map(use => `<li>${use}</li>`).join('')}
            </ul>
            
            <h3>AYUSH System</h3>
            <p class="plant-system">${plant.system}</p>
            
            <div class="plant-tags">
                ${plant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        ${plant.videos.length > 0 ? `
            <div class="plant-videos">
                <h3>Videos</h3>
                ${plant.videos.map(video => `
                    <div class="video-container">
                        <iframe width="560" height="315" src="${video}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <a href="index.html#garden" class="back-link">Back to Garden</a>
    `;

    // Add image gallery functionality
    const images = plantDetailContent.querySelectorAll('.plant-image');
    if (images.length > 1) {
        let currentIndex = 0;
        
        const nextImage = () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
        };

        const prevImage = () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            images[currentIndex].style.display = 'block';
        };

        const galleryControls = document.createElement('div');
        galleryControls.className = 'gallery-controls';
        galleryControls.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        plantDetailContent.querySelector('.plant-gallery').appendChild(galleryControls);

        galleryControls.querySelector('.prev-btn').addEventListener('click', prevImage);
        galleryControls.querySelector('.next-btn').addEventListener('click', nextImage);

        // Show only the first image initially
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });
    }
}

