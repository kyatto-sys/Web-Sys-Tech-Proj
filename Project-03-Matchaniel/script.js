const menuItems = [
    {
        id: 1,
        name: "Matcha Latte",
        price: "₱180",
        stock: 25,
        image: "pictures/matchalatte.jpg", 
        description: "Creamy and smooth matcha latte made with premium ceremonial grade matcha powder and steamed milk. The perfect balance of earthy matcha flavor and velvety texture. Served hot or iced, sweetened to your preference."
    },
    {
        id: 2,
        name: "Matcha Cheesecake",
        price: "₱250",
        stock: 12,
        image: "pictures/Matchacheesecake.jpg",
        description: "Decadent baked cheesecake infused with premium matcha powder. Features a buttery graham cracker crust and a silky smooth filling with delicate green tea notes. Topped with whipped cream and a dusting of matcha powder."
    },
    {
        id: 3,
        name: "Matcha Ice Cream",
        price: "₱150",
        stock: 30,
        image: "pictures/matchaicecream.jpg",
        description: "Artisanal matcha ice cream made fresh daily with authentic Japanese matcha. Rich, creamy texture with a vibrant green color and a perfect balance of sweet and slightly bitter matcha flavor. A refreshing treat for matcha lovers."
    },
    {
        id: 4,
        name: "Matcha Croissant",
        price: "₱140",
        stock: 18,
        image: "pictures/matchacroi.jpg",
        description: "Buttery, flaky croissant infused with matcha powder and filled with sweet white chocolate matcha cream. Each layer is perfectly laminated for that signature crispy exterior and soft, airy interior. Best enjoyed warm."
    },
    {
        id: 5,
        name: "Matcha Smoothie Bowl",
        price: "₱280",
        stock: 15,
        image: "pictures/matsmoothbowl.jpg",
        description: "Healthy and Instagram-worthy smoothie bowl blended with matcha, banana, spinach, and almond milk. Topped with fresh berries, granola, chia seeds, coconut flakes, and a drizzle of honey. Packed with antioxidants and energy."
    },
    {
        id: 6,
        name: "Matcha Mochi",
        price: "₱120",
        stock: 40,
        image: "pictures/matmochi.jpg",
        description: "Traditional Japanese mochi with a modern twist. Soft, chewy rice cake exterior dusted with matcha powder, filled with sweet red bean paste and a hint of matcha cream. An authentic taste of Japan in every bite."
    },
    {
        id: 7,
        name: "Matcha Tiramisu",
        price: "₱260",
        stock: 10,
        image: "pictures/mattira.jpg",
        description: "Italian classic reimagined with Japanese matcha. Layers of matcha-soaked ladyfinger biscuits and mascarpone cream cheese, finished with a generous dusting of matcha powder. The perfect fusion of East meets West."
    },
    {
        id: 8,
        name: "Matcha Bubble Tea",
        price: "₱200",
        stock: 35,
        image: "pictures/matchabubbletea.jpg",
        description: "Refreshing matcha bubble tea with chewy tapioca pearls. Made with premium matcha, milk, and sweetener, shaken to creamy perfection. Customize with different sweetness levels and add toppings like boba, jelly, or pudding."
    }
];

const STORAGE_KEY = 'matcha_favorites';
let currentFilter = 'all';

function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function toggleFavorite(id) {
    let favorites = getFavorites();
    const index = favorites.indexOf(id);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    
    saveFavorites(favorites);
    renderMenu(currentFilter);
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function filterMenu(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMenu(filter);
}

function renderMenu(filter = 'all') {
    const grid = document.getElementById('menuGrid');
    const favorites = getFavorites();
    
    let itemsToShow = menuItems;
    
    if (filter === 'favorites') {
        itemsToShow = menuItems.filter(item => favorites.includes(item.id));
    }
    
    if (itemsToShow.length === 0 && filter === 'favorites') {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #558b2f;">
                <div style="font-size: 4em; margin-bottom: 20px;">💚</div>
                <h3 style="font-size: 1.8em; margin-bottom: 10px;">No favorites yet!</h3>
                <p style="font-size: 1.2em;">Click the heart icon on items you love to save them here.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = itemsToShow.map(item => {
        const favorited = isFavorite(item.id);
        const imageStyle = item.image ? `style="background-image: url('${item.image}')"` : '';
        const hasImageClass = item.image ? 'has-custom-image' : '';
        
        return `
            <div class="menu-card">
                <button class="favorite-btn ${favorited ? 'favorited' : ''}" 
                        onclick="event.stopPropagation(); toggleFavorite(${item.id})">
                    ${favorited ? '❤️' : '🤍'}
                </button>
                <div class="menu-card-image ${hasImageClass}" ${imageStyle} onclick="openModal(${item.id})">
                    <span>${item.icon}</span>
                </div>
                <div class="menu-card-content" onclick="openModal(${item.id})">
                    <h3 class="menu-card-title">${item.name}</h3>
                    <p class="menu-card-price">${item.price}</p>
                </div>
            </div>
        `;
    }).join('');
}

function openModal(id) {
    const item = menuItems.find(i => i.id === id);
    const modalImageContainer = document.getElementById('modalImageContainer');
    
    if (item.image) {
        modalImageContainer.className = 'modal-image-container has-custom-image';
        modalImageContainer.style.backgroundImage = `url('${item.image}')`;
    } else {
        modalImageContainer.className = 'modal-image-container';
        modalImageContainer.style.backgroundImage = '';
    }
    
    document.getElementById('modalIcon').textContent = item.icon;
    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalPrice').textContent = item.price;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalStock').textContent = `${item.stock} items available in stock`;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

renderMenu();