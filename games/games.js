// Load games from JSON
async function loadGames() {
    try {
        const response = await fetch('games/games.json');
        const data = await response.json();
        return data.games;
    } catch (error) {
        console.error('Error loading games:', error);
        return [];
    }
}

// Display games in the grid
async function displayGames() {
    const games = await loadGames();
    const gameList = document.getElementById('game-list');
    const popularList = document.getElementById('popular-list');
    
    if (!gameList || !popularList) return;
    
    gameList.innerHTML = '';
    popularList.innerHTML = '';
    
    const popularGames = games.filter(g => g.popular);
    
    // Populate popular section
    popularGames.forEach(game => {
        popularList.appendChild(createGameCard(game));
    });
    
    // Populate all games
    games.forEach(game => {
        gameList.appendChild(createGameCard(game));
    });
    
    document.getElementById('game-count').textContent = `${games.length} games`;
    document.getElementById('popular-count').textContent = `${popularGames.length} popular`;
}

// Create card HTML
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-thumb">
            <div class="card-initials">${game.name.charAt(0)}</div>
        </div>
        <div class="card-info">
            <div class="card-name">${game.name}</div>
            <div class="card-plays">${game.category}</div>
        </div>
    `;
    card.onclick = () => window.location.href = game.file;
    return card;
}

// Load games when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayGames);
} else {
    displayGames();
}
