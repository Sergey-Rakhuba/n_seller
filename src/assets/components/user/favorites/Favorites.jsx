import React, { useState, useEffect } from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';
import SellerCard from '../../seller/seller_card/seller_card.jsx';
import './Favorites.css';

export default function Favorites({ onNavigateToHome, onSelectAd, onNavigateToChat, onNavigateToProfile, onNavigateToFavorites }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    };

    const removeFromFavorites = (e, id) => {
        e.stopPropagation(); // prevent card click
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newFavorites = storedFavorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    return (
        <div className="favorites_page">
            <Header 
                onNavigateToHome={onNavigateToHome} 
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                onNavigateToFavorites={onNavigateToFavorites}
                isLoggedIn={true}
            />
            <div className="favorites_container">
                <h1 className="page_title">Избранное ({favorites.length})</h1>
                
                {favorites.length > 0 ? (
                    <div className="favorites_grid">
                        {favorites.map((product) => (
                            <div key={product.id} className="favorite_item_wrapper">
                                <SellerCard ad={product} onSelectAd={onSelectAd} />
                                <button 
                                    className="remove_fav_btn"
                                    onClick={(e) => removeFromFavorites(e, product.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty_state">
                        <p>У вас пока нет избранных товаров.</p>
                        <button className="go_home_btn" onClick={onNavigateToHome}>Перейти в каталог</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
