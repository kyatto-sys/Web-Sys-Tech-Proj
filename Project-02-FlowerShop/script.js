const productData = [
            { 
                id: 1, 
                name: "Red Rose Bouquet", 
                price: 2499.50, 
                category: "Roses", 
                rating: 4.8, 
                isFavorite: true, 
                stock: 25,
                image: "images/red_rose_bouquet.jpg",
                description: "A classic bouquet of premium red roses, symbolizing love and passion. Each rose is carefully selected for its vibrant color and perfect bloom. Perfect for anniversaries, romantic occasions, or expressing deep affection."
            },
            { 
                id: 2, 
                name: "Sunflower Delight", 
                price: 1799.50, 
                category: "Sunflowers", 
                rating: 4.6, 
                isFavorite: false, 
                stock: 18,
                image: "images/sunfower_delight.jpg",
                description: "Bright and cheerful sunflowers that bring sunshine into any room. These golden blooms represent happiness, loyalty, and longevity. Ideal for brightening someone's day or adding warmth to your home decor."
            },
            { 
                id: 3, 
                name: "Tulip Garden Mix", 
                price: 2125.00, 
                category: "Tulips", 
                rating: 4.7, 
                isFavorite: true, 
                stock: 12,
                image: "images/tulip_flowerparadise.jpg",
                description: "A vibrant mix of colorful tulips in vibrant pink shade. Tulips symbolize perfect love and are perfect for spring celebrations. This arrangement features red, yellow, pink, and purple varieties for a stunning rainbow effect."
            },
            { 
                id: 4, 
                name: "Lily Elegance", 
                price: 2750.00, 
                category: "Lilies", 
                rating: 4.9, 
                isFavorite: false, 
                stock: 8,
                image: "images/lily_elegance.jpg",
                description: "Elegant white lilies that exude sophistication and purity. Known for their graceful appearance and delicate fragrance, these lilies are perfect for weddings, sympathy arrangements, or adding a touch of elegance to any space."
            },
            { 
                id: 5, 
                name: "Orchid Paradise", 
                price: 3449.50, 
                category: "Orchids", 
                rating: 4.5, 
                isFavorite: false, 
                stock: 15,
                image: "images/orchid_paradise.jpg",
                description: "Exotic and luxurious orchids that represent rare beauty and strength. These stunning blooms can last for weeks with proper care. Available in purple, white, and pink varieties, they make an impressive gift or centerpiece."
            },
            { 
                id: 6, 
                name: "Peony Dreams", 
                price: 2637.50, 
                category: "Peonies", 
                rating: 4.8, 
                isFavorite: true, 
                stock: 10,
                image: "images/peony.jpg",
                description: "Lush and romantic peonies with soft, ruffled petals. These beloved blooms symbolize prosperity, good fortune, and a happy marriage. Their sweet fragrance and full, rounded shape make them a favorite for weddings and special occasions."
            },
            { 
                id: 7, 
                name: "Daisy Sunshine", 
                price: 1499.50, 
                category: "Daisies", 
                rating: 4.4, 
                isFavorite: false, 
                stock: 30,
                image: "images/Daisy_sunshine.jpg",
                description: "Fresh and innocent white daisies with bright yellow centers. These cheerful flowers represent purity, new beginnings, and true love. Their simple beauty and affordable price make them perfect for everyday enjoyment."
            },
            { 
                id: 8, 
                name: "Carnation Classic", 
                price: 1925.00, 
                category: "Carnations", 
                rating: 4.6, 
                isFavorite: false, 
                stock: 22,
                image: "images/carnations.jpg",
                description: "Versatile and long-lasting carnations in a beautiful mix of colors. These ruffled blooms symbolize fascination and distinction. Known for their longevity and sweet scent, they're perfect for any occasion and make wonderful filler flowers."
            }
        ];

        let products = [];
        let filteredProducts = [];
        let sortConfig = { key: null, direction: null, clicks: 0 };
        let currentProductId = null;

        function saveFavorites() {
            const favoriteIds = products.filter(p => p.isFavorite).map(p => p.id);
            localStorage.setItem('favoriteFlowerIds', JSON.stringify(favoriteIds));
        }

        function loadFavorites() {
            const favoriteIds = JSON.parse(localStorage.getItem('favoriteFlowerIds') || '[]');
            products.forEach(p => {
                p.isFavorite = favoriteIds.includes(p.id);
            });
        }

        async function fetchProducts() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([...productData]);
                }, 1000);
            });
        }

        function populateCategoryFilter() {
            const categoryFilter = document.getElementById('category-filter');
            const categories = [...new Set(products.map(p => p.category))];
            
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        }

        function applyFilters() {
            const selectedCategory = document.getElementById('category-filter').value;
            const showOnlyFavorites = document.getElementById('show-favorites').checked;

            filteredProducts = [...products];

            if (selectedCategory !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
            }

            if (showOnlyFavorites) {
                filteredProducts = filteredProducts.filter(p => p.isFavorite);
            }

            if (sortConfig.key && sortConfig.direction) {
                filteredProducts.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            renderProducts();
        }

        function renderProducts() {
            const container = document.getElementById('product-comparison-table');
            container.innerHTML = '';

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img class="product-image" src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <div class="product-header">
                            <h3 class="product-name">${product.name}</h3>
                            <button class="favorite-btn" data-id="${product.id}" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                                ${product.isFavorite ? '⭐' : '☆'}
                            </button>
                        </div>
                        <div class="product-price">₱${product.price.toFixed(2)}</div>
                        <span class="category-badge">${product.category}</span>
                        <div class="rating">${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                        <div class="stock ${product.stock < 10 ? 'low' : 'high'}">Stock: ${product.stock} units</div>
                    </div>
                `;
                
                card.addEventListener('click', () => openModal(product.id));
                container.appendChild(card);
            });
        }

        function toggleFavorite(id) {
            const product = products.find(p => p.id === id);
            if (product) {
                product.isFavorite = !product.isFavorite;
                saveFavorites();
                applyFilters();
                
                if (currentProductId === id) {
                    document.getElementById('modal-favorite').textContent = product.isFavorite ? '⭐' : '☆';
                }
            }
        }

        function openModal(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;

            currentProductId = id;
            
            document.getElementById('modal-image').src = product.image;
            document.getElementById('modal-title').textContent = product.name;
            document.getElementById('modal-price').textContent = '₱' + product.price.toFixed(2);
            document.getElementById('modal-category').innerHTML = `<span class="category-badge">${product.category}</span>`;
            document.getElementById('modal-rating').textContent = '⭐'.repeat(Math.floor(product.rating)) + ' ' + product.rating;
            document.getElementById('modal-stock').innerHTML = `<span class="stock ${product.stock < 10 ? 'low' : 'high'}">${product.stock} units</span>`;
            document.getElementById('modal-favorite').textContent = product.isFavorite ? '⭐' : '☆';
            document.getElementById('modal-description').textContent = product.description;

            document.getElementById('modal-favorite').onclick = () => toggleFavorite(id);
            document.getElementById('product-modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('product-modal').classList.remove('active');
            currentProductId = null;
        }

        function handleSort(key) {
            if (sortConfig.key === key) {
                sortConfig.clicks++;
                if (sortConfig.clicks === 1) {
                    sortConfig.direction = 'asc';
                } else if (sortConfig.clicks === 2) {
                    sortConfig.direction = 'desc';
                } else {
                    sortConfig.key = null;
                    sortConfig.direction = null;
                    sortConfig.clicks = 0;
                }
            } else {
                sortConfig.key = key;
                sortConfig.direction = 'asc';
                sortConfig.clicks = 1;
            }

            updateSortButtons();
            applyFilters();
        }

        function updateSortButtons() {
            document.querySelectorAll('.sort-btn').forEach(btn => {
                const sortKey = btn.dataset.sort;
                
                if (sortConfig.key === sortKey) {
                    btn.classList.add('active');
                    if (sortConfig.direction === 'asc') {
                        btn.textContent = btn.dataset.sort.charAt(0).toUpperCase() + btn.dataset.sort.slice(1) + ' ↑';
                    } else {
                        btn.textContent = btn.dataset.sort.charAt(0).toUpperCase() + btn.dataset.sort.slice(1) + ' ↓';
                    }
                } else {
                    btn.classList.remove('active');
                    btn.textContent = btn.dataset.sort.charAt(0).toUpperCase() + btn.dataset.sort.slice(1);
                }
            });
        }

        async function init() {
            products = await fetchProducts();
            loadFavorites(); 
            
            document.getElementById('loading-indicator').classList.add('hidden');
            document.querySelector('.control-panel').classList.remove('hidden');
            document.getElementById('product-comparison-table').classList.remove('hidden');

            populateCategoryFilter();
            applyFilters();

            document.getElementById('category-filter').addEventListener('change', applyFilters);
            document.getElementById('show-favorites').addEventListener('change', function() {
                document.getElementById('favorite-toggle').classList.toggle('active', this.checked);
                applyFilters();
            });

            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    handleSort(this.dataset.sort);
                });
            });

            document.getElementById('close-modal').addEventListener('click', closeModal);
            document.getElementById('product-modal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }
    

        window.addEventListener('DOMContentLoaded', init);