<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo "Matcha-niel | Premium Matcha Delights"; ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Caveat:wght@400..700&family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1><?php echo "🍵 Matcha-niel"; ?></h1>
            <p class="tagline"><?php echo "At matcha-niel, we celebrate the timeless beauty of matcha through food. Our menu blends traditional Japanese flavors with modern culinary creativity, offering vibrant bowls, pastries, drinks, and desserts made with 100% ceremonial-grade matcha."; ?></p>
            <div class="filter-tabs">
                <button class="filter-btn active" onclick="filterMenu('all')">All Items</button>
                <button class="filter-btn" onclick="filterMenu('favorites')">Favorites</button>
            </div>
        </header>

        <div class="menu-grid" id="menuGrid">
        </div>
    </div>

    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-btn" onclick="closeModal()">×</button>
                <div class="modal-image-container" id="modalImageContainer">
                    <div class="modal-icon" id="modalIcon"></div>
                </div>
                <h2 class="modal-title" id="modalTitle"></h2>
                <div class="modal-price" id="modalPrice"></div>
            </div>
            <div class="modal-body">
                <p class="modal-description" id="modalDescription"></p>
                <div class="stock-info" id="modalStock"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>