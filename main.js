document.addEventListener('DOMContentLoaded', () => {
    // Initialize plants data from LocalStorage or use default
    const storedPlants = localStorage.getItem('plants');
    const plants = storedPlants ? JSON.parse(storedPlants) : [
        {
            id: 1,
            name: 'Tulsi',
            scientificName: 'Ocimum sanctum',
            description: 'A sacred plant in Hinduism, known for its medicinal properties.',
            uses: ['Immunity booster', 'Stress relief', 'Respiratory health'],
            images: ['images/tulsi.jpg'],
            videos: ['https://www.youtube.com/watch?v=example1'],
            system: 'Ayurveda',
            tags: ['herb', 'sacred', 'medicinal']
        },
        {
            id: 2,
            name: 'Neem',
            scientificName: 'Azadirachta indica',
            description: 'Known for its antibacterial, antifungal, and antiviral properties.',
            uses: ['Skin care', 'Dental hygiene', 'Pest control'],
            images: ['images/neem.jpg'],
            videos: ['https://www.youtube.com/watch?v=example2'],
            system: 'Ayurveda',
            tags: ['tree', 'medicinal', 'versatile']
        },
        {
            id: 3,
            name: 'Aloe Vera',
            scientificName: 'Aloe barbadensis miller',
            description: 'Aloe Vera is known for its soothing and healing properties, particularly for the skin.',
            uses: ['Skin treatment', 'Wound healing', 'Digestive aid'],
            images: ['images/aloe-vera.jpg'],
            videos: ['https://www.youtube.com/watch?v=example3'],
            system: 'Ayurveda',
            tags: ['succulent', 'medicinal', 'healing']
        },
        {
            id: 4,
            name: 'Ashwagandha',
            scientificName: 'Withania somnifera',
            description: 'Ashwagandha is a powerful adaptogen, known for helping the body manage stress.',
            uses: ['Stress relief', 'Energy boost', 'Immune support'],
            images: ['images/ashwagandha.jpg'],
            videos: ['https://www.youtube.com/watch?v=example4'],
            system: 'Ayurveda',
            tags: ['herb', 'adaptogen', 'stress-relief']
        },
        {
            id: 4,
            name: 'Ginger',
            scientificName: 'Zingiber officinale',
            description: 'A versatile spice with anti-inflammatory and digestive properties.',
            uses: ['Nausea relief', 'Pain management', 'Flavoring agent'],
            images: ['images/ginger.jpg'],
            videos: ['https://www.youtube.com/watch?v=example4'],
            system: 'Traditional Chinese Medicine (TCM)',
            tags: ['spice', 'anti-inflammatory', 'digestive']
        },
        {
            id: 5,
            name: 'Lavender',
            scientificName: 'Lavandula angustifolia',
            description: 'A flowering herb known for its calming and relaxing aroma.',
            uses: ['Aromatherapy', 'Anxiety relief', 'Sleep promotion'],
            images: ['images/lavender.jpg'],
            videos: ['https://www.youtube.com/watch?v=example5'],
            system: 'Western Herbal Medicine',
            tags: ['herb', 'aromatherapy', 'calming']
        }

     
    ];

    const plantList = document.getElementById('plant-list');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    // Function to display plants
    function displayPlants(plantsToDisplay) {
        plantList.innerHTML = '';
        if (plantsToDisplay.length === 0) {
            plantList.innerHTML = '<p class="no-results">No plants found.</p>';
            return;
        }
        plantsToDisplay.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.className = 'plant-card';
            plantCard.innerHTML = `
                <img src="${plant.images[0]}" alt="${plant.name}" class="plant-image">
                <div class="plant-info">
                    <h3 class="plant-name">${plant.name}</h3>
                    <p class="plant-scientific-name">${plant.scientificName}</p>
                    <p class="plant-description">${plant.description.substring(0, 100)}...</p>
                    <div class="plant-tags">
                        ${plant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            plantCard.addEventListener('click', () => {
                window.location.href = `plant-detail.html?id=${plant.id}`;
            });
            plantList.appendChild(plantCard);
        });
    }

    // Function to search plants
    function searchPlants(query) {
        const filteredPlants = plants.filter(plant => 
            plant.name.toLowerCase().includes(query.toLowerCase()) ||
            plant.scientificName.toLowerCase().includes(query.toLowerCase()) ||
            plant.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
            plant.system.toLowerCase().includes(query.toLowerCase())
        );
        displayPlants(filteredPlants);
    }

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        searchPlants(query);
    });

    // Allow pressing "Enter" to trigger search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchBtn.click();
        }
    });

    // Initialize plant display
    displayPlants(plants);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
